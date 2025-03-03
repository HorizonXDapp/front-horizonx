import { Search } from "lucide-react";
import { TokenInfo } from "./UniswapInterface";

interface TokenSelectorProps {
   tokens: TokenInfo[];
   handleTokenSelect: (token: TokenInfo) => void;
   setShowTokenSelector: (show: boolean) => void;
}

export default function TokenSelector({
   tokens,
   handleTokenSelect,
   setShowTokenSelector,
}: TokenSelectorProps) {
   return (
      <div className="fixed inset-0 bg-background/70 flex items-center justify-center z-30">
         <div className="bg-background rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
               <h3 className="font-medium text-foreground">Select Token</h3>
               <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowTokenSelector(false)}
               >
                  ✕
               </button>
            </div>

            <div className="p-4">
               <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                     <Search className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <input
                     type="text"
                     placeholder="Search token name or address"
                     className="bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#6A00F4] text-foreground"
                  />
               </div>

               <div className="max-h-[50vh] overflow-y-auto">
                  {tokens.map((token) => (
                     <button
                        key={token.id}
                        className="flex items-center justify-between w-full px-3 py-3 hover:bg-[#6A00F4] hover:text-white rounded-lg mb-1 transition-colors"
                        onClick={() => handleTokenSelect(token)}
                     >
                        <div className="flex items-center">
                           <div
                              className={`w-8 h-8 ${token.color} rounded-full flex items-center justify-center mr-3`}
                           >
                              <span className="text-primary-foreground">
                                 {token.logo}
                              </span>
                           </div>
                           <div className="text-left">
                              <div className="font-medium">{token.symbol}</div>
                              <div className="text-xs">{token.name}</div>
                           </div>
                        </div>
                        <div className="text-right text-sm">
                           ${token.price.toFixed(2)}
                        </div>
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
