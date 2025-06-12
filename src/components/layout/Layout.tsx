import { useEffect, useState, createContext, useContext } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

type JarColor = "#e2b86a" | "#3b5ba9" | "#c94f7c" | "#a67c52" | "#7c3fa6";

const jars: Array<{
  name: string;
  color: JarColor;
  balance: number;
  icon: string;
}> = [
  { name: "Apricot", color: "#e2b86a", balance: 42717980, icon: "🍑" },
  { name: "Blueberry", color: "#3b5ba9", balance: 23298449, icon: "🫐" },
  { name: "Cherry", color: "#c94f7c", balance: 3811238, icon: "🍒" },
  { name: "Date", color: "#a67c52", balance: 7051475, icon: "🌴" },
  { name: "Elderberry", color: "#7c3fa6", balance: 0, icon: "🫐" },
];

interface DisplayModeContextType {
  displayMode: "sats" | "btc";
  toggleDisplayMode: () => void;
  formatAmount: (amount: number) => string;
  getLogo: (size?: "sm" | "lg") => React.ReactNode;
  jars: typeof jars;
}

const DisplayModeContext = createContext<DisplayModeContextType | undefined>(
  undefined
);

export const useDisplayMode = () => {
  const context = useContext(DisplayModeContext);
  if (context === undefined) {
    throw new Error("useDisplayMode must be used within a Layout");
  }
  return context;
};

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [displayMode, setDisplayMode] = useState<"sats" | "btc">("sats");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleDisplayMode = () =>
    setDisplayMode((m) => (m === "sats" ? "btc" : "sats"));

  function formatAmount(amount: number) {
    if (displayMode === "btc") {
      return (amount / 100_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 8,
      });
    }
    return amount.toLocaleString();
  }

  function getLogo(size: "sm" | "lg" = "lg") {
    if (displayMode === "btc") {
      return (
        <span className={size === "sm" ? "text-lg ml-1" : "text-4xl ml-1"}>
          ₿
        </span>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size === "sm" ? "18px" : "40px"}
        height={size === "sm" ? "18px" : "40px"}
        viewBox="0 0 24 24"
        fill="none"
        style={{
          display: "inline",
          verticalAlign: "middle",
          marginLeft: 4,
        }}>
        <path d="M7 7.90906H17" stroke="currentColor" />
        <path d="M12 5.45454V3" stroke="currentColor" />
        <path d="M12 20.9999V18.5454" stroke="currentColor" />
        <path d="M7 12H17" stroke="currentColor" />
        <path d="M7 16.0909H17" stroke="currentColor" />
      </svg>
    );
  }

  const displayModeValue = {
    displayMode,
    toggleDisplayMode,
    formatAmount,
    getLogo,
    jars,
  };

  return (
    <DisplayModeContext.Provider value={displayModeValue}>
      <div className="min-h-screen flex flex-col bg-white text-black dark:bg-[#181b20] dark:text-white transition-colors duration-300">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          toggleDisplayMode={toggleDisplayMode}
          formatAmount={formatAmount}
          getLogo={getLogo}
          jars={jars}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </DisplayModeContext.Provider>
  );
}
