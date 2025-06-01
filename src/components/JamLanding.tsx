import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Jar } from "./layout/Jar";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const jars = [
  { name: "Apricot", color: "#e2b86a", balance: 42717980, icon: "🍑" },
  { name: "Blueberry", color: "#3b5ba9", balance: 23298449, icon: "🫐" },
  { name: "Cherry", color: "#c94f7c", balance: 3811238, icon: "🍒" },
  { name: "Date", color: "#a67c52", balance: 7051475, icon: "🌴" },
  { name: "Elderberry", color: "#7c3fa6", balance: 0, icon: "🫐" },
];

export default function JamLanding() {
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-[#181b20] dark:text-white transition-colors duration-300">
      {/* Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        toggleDisplayMode={toggleDisplayMode}
        formatAmount={formatAmount}
        getLogo={getLogo}
        jars={jars}
      />
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="text-center mb-8">
          <div className="text-lg opacity-80 text-gray-400">
            {displayMode === "btc" ? "Bitcoin" : "Satoshi"}
          </div>
          <div className="text-4xl font-light tracking-wider mb-2 flex justify-center items-center cursor-pointer select-none min-h-[56px]">
            <span
              onClick={toggleDisplayMode}
              title="Click to toggle sats/bitcoin"
              className="tabular-nums min-w-[250px] text-center">
              {formatAmount(jars.reduce((acc, jar) => acc + jar.balance, 0))}{" "}
            </span>
            <span className="flex items-center min-h-[48px]">
              {getLogo("lg")}
            </span>
          </div>
          <div className="flex gap-4 justify-center mt-10">
            <Button className="px-12 cursor-pointer">↓ Receive</Button>
            <Button className="px-16 cursor-pointer" variant="outline">
              ↑ Send
            </Button>
          </div>
        </div>
        <Card className="w-full max-w-2xl border-0 shadow-none text-black dark:text-white dark:bg-[#181b20] p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className=" flex items-center w-full justify-center ">
              <span className="opacity-80 font-light">Wallet distribution</span>
              <div className="text-black opacity-80 mx-3 dark:text-white">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} />
                  </TooltipTrigger>
                  <TooltipContent>Select a jar to get started</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            {jars.map((jar) => (
              <Tooltip key={jar.name}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col cursor-pointer hover:scale-105 transition-all duration-300 items-center">
                    <Jar
                      name={jar.name}
                      amount={jar.balance}
                      color={jar.color}
                      displayMode={displayMode}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Open {jar.name} Jar</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Card>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
