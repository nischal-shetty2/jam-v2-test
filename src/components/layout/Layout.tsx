import { useEffect, useState, createContext, useContext } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { useQuery } from "@tanstack/react-query";
import { getWalletDisplay, getJmSession } from "@/lib/JmWalletApi";
import { getSession } from "@/lib/session";

export type JarColor =
  | "#e2b86a"
  | "#3b5ba9"
  | "#c94f7c"
  | "#a67c52"
  | "#7c3fa6";

// Define jar templates - without balances
const jarTemplates: Array<{
  name: string;
  color: JarColor;
}> = [
  { name: "Apricot", color: "#e2b86a" },
  { name: "Blueberry", color: "#3b5ba9" },
  { name: "Cherry", color: "#c94f7c" },
  { name: "Date", color: "#a67c52" },
  { name: "Elderberry", color: "#7c3fa6" },
];

export interface Jar {
  name: string;
  color: JarColor;
  balance: number;
  account?: string;
}

interface DisplayModeContextType {
  displayMode: "sats" | "btc";
  toggleDisplayMode: () => void;
  formatAmount: (amount: number) => string;
  getLogo: (size?: "sm" | "lg") => React.ReactNode;
  jars: Jar[];
  totalBalance: number;
  walletName: string | null;
  isLoading: boolean;
  error: Error | null;
  refetchWalletData: () => void;
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

  // Get wallet name from session
  const session = getSession();
  const walletFileName = session?.walletFileName;

  const {
    data: walletData,
    isLoading,
    error,
    refetch: refetchWalletData,
  } = useQuery({
    queryKey: ["walletDisplay", walletFileName],
    queryFn: async () => {
      if (!walletFileName) {
        throw new Error("No wallet file name in session");
      }

      // First ensure we have a session
      const sessionInfo = await getJmSession();
      if (!sessionInfo.session) {
        throw new Error("No active session");
      }

      // Then get wallet display data
      return getWalletDisplay(walletFileName);
    },
    enabled: !!walletFileName,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // Consider data fresh for 15 seconds
  });

  // Create the jars array by combining jar templates with actual account data
  const jars: Jar[] = walletData
    ? walletData.walletinfo.accounts.map((account, index) => {
        // Parse balance as a float from BTC value, then convert to sats (multiply by 100,000,000)
        const btcBalance = parseFloat(account.available_balance as any);
        const satsBalance = Math.round(btcBalance * 100_000_000);

        // Only use up to 5 accounts, matching with jar templates
        if (index >= jarTemplates.length) {
          return {
            name: `Account ${account.account}`,
            color: "#808080" as JarColor, // Default color
            balance: satsBalance,
            icon: "📁",
            account: account.account,
          };
        }

        return {
          ...jarTemplates[index],
          balance: satsBalance,
          account: account.account,
        };
      })
    : jarTemplates.map((jar) => ({ ...jar, balance: 0 }));

  const totalBalance = jars.reduce((acc, jar) => acc + jar.balance, 0);

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
    totalBalance,
    walletName: walletData?.walletinfo.wallet_name || null,
    isLoading,
    error: error as Error | null,
    refetchWalletData,
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
          isLoading={isLoading}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </DisplayModeContext.Provider>
  );
}
