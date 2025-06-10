interface JarProps {
  name: string;
  amount: number;
  color: "#e2b86a" | "#3b5ba9" | "#c94f7c" | "#a67c52" | "#7c3fa6";
  displayMode: "sats" | "btc";
}

function formatAmount(amount: number, displayMode: "sats" | "btc") {
  if (displayMode === "btc") {
    return (amount / 100_000_000).toLocaleString(undefined, {
      maximumFractionDigits: 8,
    });
  }
  return amount.toLocaleString();
}

function getLogo(displayMode: "sats" | "btc") {
  return displayMode === "btc" ? (
    "₿"
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "inline", verticalAlign: "middle", marginLeft: 2 }}>
      <path d="M7 7.90906H17" stroke="currentColor" />
      <path d="M12 5.45454V3" stroke="currentColor" />
      <path d="M12 20.9999V18.5454" stroke="currentColor" />
      <path d="M7 12H17" stroke="currentColor" />
      <path d="M7 16.0909H17" stroke="currentColor" />
    </svg>
  );
}

export function Jar({ name, amount, color, displayMode }: JarProps) {
  const fillPercent = amount / 500000;
  return (
    <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300">
      <div className="mb-2">
        <div className="relative w-12 h-20 flex flex-col items-center">
          {/* Jar body */}
          <div className="absolute top-3 left-0 w-full h-4/5 flex items-end">
            <div className="w-full h-full rounded-b-[10px] rounded-t-[16px] border-2 border-gray-400 bg-white dark:bg-gray-300 bg-opacity-60 overflow-hidden flex items-end">
              {/* Fill */}
              <div
                className="w-full rounded-b-[8px] transition-all duration-500"
                style={{
                  height: `${fillPercent}%`,
                  backgroundColor: color,
                  opacity: 0.85,
                }}
              />
            </div>
          </div>
          {/* Jar neck */}
          <div className="absolute top-0 left-2 w-8 h-3.5 border-b-0 bg-white dark:bg-gray-300 border-2  border-gray-400 rounded-t-[8px] z-10" />
          {/* Jar lid */}
          <div className="absolute top-0 left-1 w-10 h-2 bg-gray-500 rounded-t-[8px] rounded-b-[8px] z-20" />
        </div>
      </div>
      <p className="text-sm text-center">{name}</p>
      <p className="text-xs text-center min-w-[110px] tabular-nums">
        {formatAmount(amount, displayMode)} {getLogo(displayMode)}
      </p>
    </div>
  );
}
