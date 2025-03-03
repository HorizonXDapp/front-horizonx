interface Dex {
   id: string;
   name: string;
   logo: string;
   color: string;
   fee: string;
}

interface DexSelectorProps {
   dexes: Dex[];
   handleDexSelect: (dex: Dex) => void;
   setShowDexSelector: (show: boolean) => void;
   isArbitrageMode: boolean;
   selectingDexFor: string;
}

export default function DexSelector({
   dexes,
   handleDexSelect,
   setShowDexSelector,
   isArbitrageMode,
   selectingDexFor,
}: DexSelectorProps) {
   return (
      <div className="fixed inset-0 bg-background/70 flex items-center justify-center z-30">
         <div className="bg-background rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
               <h3 className="font-medium text-foreground">
                  {isArbitrageMode
                     ? `Select DEX for ${
                          selectingDexFor === "sell" ? "Sell" : "Buy"
                       }`
                     : "Select DEX"}
               </h3>
               <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowDexSelector(false)}
               >
                  ✕
               </button>
            </div>

            <div className="p-4">
               <div className="max-h-[50vh] overflow-y-auto">
                  {dexes.map((dex) => (
                     <button
                        key={dex.id}
                        className="flex items-center justify-between w-full px-3 py-3 hover:bg-[#6A00F4] hover:text-white rounded-lg mb-1 transition-colors"
                        onClick={() => handleDexSelect(dex)}
                     >
                        <div className="flex items-center">
                           <div
                              className={`w-8 h-8 ${dex.color} rounded-full flex items-center justify-center mr-3`}
                           >
                              <span className="text-primary-foreground">
                                 {dex.logo}
                              </span>
                           </div>
                           <div className="text-left">
                              <div className="font-medium">{dex.name}</div>
                              <div className="text-xs">Fee: {dex.fee}</div>
                           </div>
                        </div>
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
