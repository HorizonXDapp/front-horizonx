import {
   Settings,
   ChevronDown,
   FlipHorizontalIcon as SwitchHorizontal,
   DownloadIcon,
   MoveDownIcon,
   MoveDown,
   ArrowDown,
} from "lucide-react";
import SettingsMenu from "./SettingsMenu";

interface SwapCardProps {
   isArbitrageMode: boolean;
   setIsArbitrageMode: (value: boolean) => void;
   showSettingsMenu: boolean;
   setShowSettingsMenu: (value: boolean) => void;
   slippageTolerance: number;
   setSlippageTolerance: (value: number) => void;
   transactionDeadline: number;
   setTransactionDeadline: (value: number) => void;
   selectedDex: {
      id: string;
      color: string;
      logo: string;
      name: string;
      fee: string;
   };
   setSelectingDexFor: (mode: string) => void;
   setShowDexSelector: (value: boolean) => void;
   sellAmount: string;
   handleSellAmountChange: (value: string) => void;
   sellToken: { color: string; logo: string; symbol: string; price: number };
   setSelectingFor: (value: "sell" | "buy") => void;
   setShowTokenSelector: (value: boolean) => void;
   buyAmount: string;
   setBuyAmount: (value: string) => void;
   buyToken?: { color: string; logo: string; symbol: string; price: number };
   sellDex: { color: string; logo: string; name: string };
   buyDex: { color: string; logo: string; name: string };
   calculateProfit: () => string | number;
   useFlashLoan: boolean;
   setUseFlashLoan: (value: boolean) => void;
}

export default function SwapCard({
   isArbitrageMode,
   setIsArbitrageMode,
   showSettingsMenu,
   setShowSettingsMenu,
   slippageTolerance,
   setSlippageTolerance,
   transactionDeadline,
   setTransactionDeadline,
   selectedDex,
   setSelectingDexFor,
   setShowDexSelector,
   sellAmount,
   handleSellAmountChange,
   sellToken,
   setSelectingFor,
   setShowTokenSelector,
   buyAmount,
   setBuyAmount,
   buyToken,
   sellDex,
   buyDex,
   calculateProfit,
   useFlashLoan,
   setUseFlashLoan,
}: SwapCardProps) {
   return (
      <div className="w-full max-w-md">
         <div className="bg-background rounded-2xl border border-border overflow-hidden">
            {/* Swap Mode Toggle and Settings */}
            <div className="flex items-center justify-between p-4 border-b border-border">
               <div className="flex items-center space-x-2">
                  <button
                     className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        !isArbitrageMode
                           ? "bg-[#6A00F4] text-white"
                           : "text-muted-foreground hover:text-foreground"
                     }`}
                     onClick={() => setIsArbitrageMode(false)}
                  >
                     Regular Swap
                  </button>
                  <button
                     className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        isArbitrageMode
                           ? "bg-[#6A00F4] text-white"
                           : "text-muted-foreground hover:text-foreground"
                     }`}
                     onClick={() => setIsArbitrageMode(true)}
                  >
                     Arbitrage Swap
                  </button>
               </div>
               <button
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-background"
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
               >
                  <Settings className="w-5 h-5" />
               </button>
            </div>

            {showSettingsMenu && (
               <SettingsMenu
                  slippageTolerance={slippageTolerance}
                  setSlippageTolerance={setSlippageTolerance}
                  transactionDeadline={transactionDeadline}
                  setTransactionDeadline={setTransactionDeadline}
               />
            )}

            {/* DEX Selector for normal swap mode */}
            {!isArbitrageMode && (
               <div className="p-4 border-b border-border">
                  <div className="flex justify-between items-center">
                     <div className="text-sm text-muted-foreground">
                        Selected DEX
                     </div>
                     <button
                        className="flex items-center space-x-2 bg-background border border-border hover:bg-[#6A00F4] hover:text-white transition-colors rounded-lg px-3 py-1.5 text-sm"
                        onClick={() => {
                           setSelectingDexFor("normal");
                           setShowDexSelector(true);
                        }}
                     >
                        <div
                           className={`w-5 h-5 ${selectedDex.color} rounded-full flex items-center justify-center`}
                        >
                           <span className="text-[10px]">
                              {selectedDex.logo}
                           </span>
                        </div>
                        <span>{selectedDex.name}</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                     </button>
                  </div>
               </div>
            )}

            {/* Sell Section */}
            <div className="p-4">
               <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">Sell</div>
                  {isArbitrageMode && (
                     <button
                        className="flex items-center space-x-2 bg-background border border-border hover:bg-[#6A00F4] hover:text-white transition-colors rounded-lg px-2 py-1 text-xs"
                        onClick={() => {
                           setSelectingDexFor("sell");
                           setShowDexSelector(true);
                        }}
                     >
                        <div
                           className={`w-4 h-4 ${sellDex.color} rounded-full flex items-center justify-center`}
                        >
                           <span className="text-[8px]">{sellDex.logo}</span>
                        </div>
                        <span>{sellDex.name}</span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                     </button>
                  )}
               </div>
               <div className="flex items-center">
                  <input
                     type="text"
                     value={sellAmount}
                     onChange={(e) => handleSellAmountChange(e.target.value)}
                     className="bg-transparent text-2xl font-medium focus:outline-none w-full text-foreground"
                     placeholder="0"
                  />
                  <button
                     className="flex items-center space-x-2 bg-background border border-border hover:bg-[#6A00F4] hover:text-white transition-colors rounded-full px-2 py-1.5"
                     onClick={() => {
                        setSelectingFor("sell");
                        setShowTokenSelector(true);
                     }}
                  >
                     <div className="flex items-center">
                        <div
                           className={`w-6 h-6 ${sellToken.color} rounded-full flex items-center justify-center`}
                        >
                           <span className="text-primary-foreground text-xs">
                              {sellToken.logo}
                           </span>
                        </div>
                        <span className="ml-2 mr-1">{sellToken.symbol}</span>
                     </div>
                     <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </button>
               </div>
               <div className="text-sm text-muted-foreground mt-1">
                  $
                  {(
                     Number.parseFloat(sellAmount || "0") * sellToken.price
                  ).toFixed(2)}
               </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center -mt-3 -mb-3 relative z-10">
               <div className="bg-background p-1.5 rounded-md border border-border">
                  <ArrowDown className="w-5 h-5 text-muted-foreground" />
               </div>
            </div>

            {/* Buy Section */}
            <div className="p-4">
               <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">Buy</div>
                  {isArbitrageMode && (
                     <button
                        className="flex items-center space-x-2 bg-background border border-border hover:bg-[#6A00F4] hover:text-white transition-colors rounded-lg px-2 py-1 text-xs"
                        onClick={() => {
                           setSelectingDexFor("buy");
                           setShowDexSelector(true);
                        }}
                     >
                        <div
                           className={`w-4 h-4 ${buyDex.color} rounded-full flex items-center justify-center`}
                        >
                           <span className="text-[8px]">{buyDex.logo}</span>
                        </div>
                        <span>{buyDex.name}</span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                     </button>
                  )}
               </div>
               <div className="flex items-center">
                  <input
                     type="text"
                     value={buyAmount}
                     onChange={(e) => setBuyAmount(e.target.value)}
                     className="bg-transparent text-2xl font-medium focus:outline-none w-full text-foreground"
                     placeholder="0"
                     readOnly
                  />
                  {buyToken ? (
                     <button
                        className="flex items-center space-x-2 bg-background border border-border hover:bg-[#6A00F4] hover:text-white transition-colors rounded-full px-2 py-1.5"
                        onClick={() => {
                           setSelectingFor("buy");
                           setShowTokenSelector(true);
                        }}
                     >
                        <div className="flex items-center">
                           <div
                              className={`w-6 h-6 ${buyToken.color} rounded-full flex items-center justify-center`}
                           >
                              <span className="text-primary-foreground text-xs">
                                 {buyToken.logo}
                              </span>
                           </div>
                           <span className="ml-2 mr-1">{buyToken.symbol}</span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                     </button>
                  ) : (
                     <button
                        className="flex items-center space-x-2 bg-background border border-border hover:bg-[#6A00F4] hover:text-white transition-colors rounded-full pl-4 py-1.5 text-sm w-1/2"
                        onClick={() => {
                           setSelectingFor("buy");
                           setShowTokenSelector(true);
                        }}
                     >
                        <span>Select Token</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                     </button>
                  )}
               </div>
               {buyToken && (
                  <div className="text-sm text-muted-foreground mt-1">
                     $
                     {(
                        Number.parseFloat(buyAmount || "0") * buyToken.price
                     ).toFixed(2)}
                  </div>
               )}
            </div>

            {/* Arbitrage Info Section (only visible in arbitrage mode) */}
            {isArbitrageMode && buyToken && (
               <div className="p-4 bg-background border-t border-b border-border">
                  <div className="bg-background rounded-lg p-3 border border-border">
                     <div className="flex items-center justify-between text-sm mb-2">
                        <div className="text-muted-foreground">Sell on:</div>
                        <div className="flex items-center">
                           <div
                              className={`w-4 h-4 ${sellDex.color} rounded-full flex items-center justify-center mr-1`}
                           >
                              <span className="text-[10px]">
                                 {sellDex.logo}
                              </span>
                           </div>
                           <span>{sellDex.name}</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between text-sm mb-2">
                        <div className="text-muted-foreground">Buy on:</div>
                        <div className="flex items-center">
                           <div
                              className={`w-4 h-4 ${buyDex.color} rounded-full flex items-center justify-center mr-1`}
                           >
                              <span className="text-[10px]">{buyDex.logo}</span>
                           </div>
                           <span>{buyDex.name}</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between text-sm mb-2">
                        <div className="text-muted-foreground">
                           Use Flash Loan:
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                           <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              checked={useFlashLoan}
                              onChange={() => setUseFlashLoan(!useFlashLoan)}
                           />
                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6A00F4] dark:peer-focus:ring-[#6A00F4] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#6A00F4]"></div>
                        </label>
                     </div>

                     <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                           Potential Profit:
                        </div>
                        <div className="text-[#00E5FF] font-medium">
                           +{calculateProfit()} {buyToken.symbol}
                        </div>
                     </div>

                     {useFlashLoan && (
                        <div className="mt-3 pt-3 border-t border-border">
                           <div className="text-sm text-muted-foreground mb-2">
                              Flash Loan Details:
                           </div>
                           <div className="flex justify-between text-sm mb-2">
                              <span>Amount:</span>
                              <span>
                                 {sellAmount} {sellToken.symbol}
                              </span>
                           </div>
                           <div className="flex justify-between text-sm mb-2">
                              <span>Fee:</span>
                              <span>0.09%</span>
                           </div>
                           <div className="flex justify-between text-sm mb-2">
                              <span>Provider:</span>
                              <span>Aave</span>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            )}

            {/* Start Button */}
            <div className="p-4 pt-3">
               <button
                  className={`w-full ${
                     buyToken
                        ? "bg-[#0047FF] hover:bg-[#0047FF]/90"
                        : "bg-muted cursor-not-allowed"
                  } text-white py-3 rounded-xl font-medium transition-colors`}
                  disabled={!buyToken}
               >
                  {isArbitrageMode
                     ? useFlashLoan
                        ? "Start Flash Loan Arbitrage"
                        : "Start Arbitrage"
                     : "Start Swap"}
               </button>
            </div>
         </div>

         {/* Info Text */}
         <div className="text-center text-muted-foreground text-sm mt-6 max-w-sm mx-auto">
            {isArbitrageMode
               ? "Arbitrage swap allows you to profit from price differences between DEXes in a single transaction."
               : `Swap using ${selectedDex.name} with ${selectedDex.fee} fee. The largest on-chain marketplace to buy and sell crypto across multiple chains.`}
         </div>
      </div>
   );
}
