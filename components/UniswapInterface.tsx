"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import SwapCard from "./SwapCard";
import TokenSelector from "./TokenSelector";
import DexSelector from "./DexSelector";
import { dexes, tokens } from "../data/sampleData";
import { ChevronDown } from "lucide-react";

export interface TokenInfo {
   id: string;
   symbol: string;
   name: string;
   logo: string;
   color: string;
   price: number;
}

export default function UniswapInterface() {
   const [sellAmount, setSellAmount] = useState("");
   const [buyAmount, setBuyAmount] = useState("0");
   const [sellToken, setSellToken] = useState(tokens[0]);
   const [buyToken, setBuyToken] = useState<TokenInfo>({
      id: "usdt",
      symbol: "USDT",
      name: "Tether",
      logo: "₮",
      color: "bg-[#00E5FF]",
      price: 1,
   });
   const [isArbitrageMode, setIsArbitrageMode] = useState(false);
   const [sellDex, setSellDex] = useState(dexes[0]);
   const [buyDex, setBuyDex] = useState(dexes[1]);
   const [showDexSelector, setShowDexSelector] = useState(false);
   const [showTokenSelector, setShowTokenSelector] = useState(false);
   const [selectingFor, setSelectingFor] = useState("buy"); // "buy" or "sell"
   const [selectingDexFor, setSelectingDexFor] = useState("sell"); // "buy" or "sell"
   const [selectedDex, setSelectedDex] = useState(dexes[0]);
   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const [showSettingsMenu, setShowSettingsMenu] = useState(false);
   const [slippageTolerance, setSlippageTolerance] = useState(0.5);
   const [transactionDeadline, setTransactionDeadline] = useState(30);
   const [isDarkMode, setIsDarkMode] = useState(true);
   const [useFlashLoan, setUseFlashLoan] = useState(false);
   const [bubbles, setBubbles] = useState([...Array(15)]);

   useEffect(() => {
      document.body.classList.toggle("dark", isDarkMode);
   }, [isDarkMode]);

   const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      document.body.classList.toggle("dark");
   };

   const calculateProfit = () => {
      if (!buyToken || sellAmount === "0") return 0;

      const amount = Number.parseFloat(sellAmount);
      const sellValue = amount * sellToken.price;

      const buyValueOnSelectedDex = (sellValue / buyToken.price) * 0.997;
      const buyValueOnArbitrageDex = (sellValue / buyToken.price) * 1.005;

      return (buyValueOnArbitrageDex - buyValueOnSelectedDex).toFixed(4);
   };

   const handleSellAmountChange = (value: string) => {
      setSellAmount(value);
      if (buyToken) {
         const sellValue = Number.parseFloat(value || "0") * sellToken.price;
         const buyValue = sellValue / buyToken.price;
         setBuyAmount(buyValue.toFixed(6));
      }
   };

   const handleTokenSelect = (token: TokenInfo): void => {
      if (selectingFor === "buy") {
         setBuyToken(token);
      } else {
         setSellToken(token);
      }
      setShowTokenSelector(false);
   };

   const handleDexSelect = (dex: (typeof dexes)[0]) => {
      if (isArbitrageMode) {
         if (selectingDexFor === "sell") {
            setSellDex(dex);
         } else {
            setBuyDex(dex);
         }
      } else {
         setSelectedDex(dex);
      }
      setShowDexSelector(false);
   };
   const floatingBg = useMemo(
      () =>
         bubbles.map((_, i) => (
            <div
               key={i}
               className="absolute rounded-full opacity-70 blur-sm"
               style={{
                  width: `${Math.random() * 50 + 30}px`,
                  height: `${Math.random() * 50 + 30}px`,
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translate(-50%, -50%)`,
                  animation: `float ${
                     Math.random() * 10 + 10
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
               }}
            />
         )),
      [bubbles]
   );

   return (
      <div
         className={`min-h-screen bg-background text-foreground relative overflow-hidden ${
            isDarkMode ? "dark" : ""
         }`}
      >
         {/* Floating background tokens */}
         <div className="absolute inset-0 overflow-hidden">{floatingBg}</div>

         <Header
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
         />

         <main className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20">
            <div className="text-center mb-10">
               <h1 className="text-2xl md:text-5xl font-bold mb-2 text-[#0047FF] dark:text-slate-100">
                  One Swap,
                  <br /> Endless Opportunities
               </h1>
            </div>

            <SwapCard
               isArbitrageMode={isArbitrageMode}
               setIsArbitrageMode={setIsArbitrageMode}
               showSettingsMenu={showSettingsMenu}
               setShowSettingsMenu={setShowSettingsMenu}
               slippageTolerance={slippageTolerance}
               setSlippageTolerance={setSlippageTolerance}
               transactionDeadline={transactionDeadline}
               setTransactionDeadline={setTransactionDeadline}
               selectedDex={selectedDex}
               setSelectingDexFor={setSelectingDexFor}
               setShowDexSelector={setShowDexSelector}
               sellAmount={sellAmount}
               handleSellAmountChange={handleSellAmountChange}
               sellToken={sellToken}
               setSelectingFor={setSelectingFor}
               setShowTokenSelector={setShowTokenSelector}
               buyAmount={buyAmount}
               setBuyAmount={setBuyAmount}
               buyToken={buyToken}
               sellDex={sellDex}
               buyDex={buyDex}
               calculateProfit={calculateProfit}
               useFlashLoan={useFlashLoan}
               setUseFlashLoan={setUseFlashLoan}
            />

            {showTokenSelector && (
               <TokenSelector
                  tokens={tokens}
                  handleTokenSelect={handleTokenSelect}
                  setShowTokenSelector={setShowTokenSelector}
               />
            )}

            {showDexSelector && (
               <DexSelector
                  dexes={dexes}
                  handleDexSelect={handleDexSelect}
                  setShowDexSelector={setShowDexSelector}
                  isArbitrageMode={isArbitrageMode}
                  selectingDexFor={selectingDexFor}
               />
            )}
         </main>

         <style jsx global>{`
            @keyframes float {
               0%,
               100% {
                  transform: translate(-50%, -50%) translateY(0px);
               }
               50% {
                  transform: translate(-50%, -50%) translateY(30px);
               }
            }
         `}</style>
      </div>
   );
}
