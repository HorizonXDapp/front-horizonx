interface SettingsMenuProps {
   slippageTolerance: number;
   setSlippageTolerance: (value: number) => void;
   transactionDeadline: number;
   setTransactionDeadline: (value: number) => void;
}

export default function SettingsMenu({
   slippageTolerance,
   setSlippageTolerance,
   transactionDeadline,
   setTransactionDeadline,
}: SettingsMenuProps) {
   return (
      <div className="p-4 bg-background border-b border-border">
         <h3 className="text-foreground font-medium mb-2">Settings</h3>
         <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label
                     htmlFor="slippage"
                     className="block text-sm font-medium text-muted-foreground"
                  >
                     Slippage tolerance (%)
                  </label>
                  <input
                     type="number"
                     id="slippage"
                     value={slippageTolerance}
                     onChange={(e) =>
                        setSlippageTolerance(parseFloat(e.target.value || "0"))
                     }
                     className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6A00F4] focus:border-[#6A00F4] sm:text-sm"
                  />
               </div>
               <div>
                  <label
                     htmlFor="deadline"
                     className="block text-sm font-medium text-muted-foreground"
                  >
                     Transaction deadline (minutes)
                  </label>
                  <input
                     type="text"
                     id="deadline"
                     value={transactionDeadline}
                     onChange={(e) =>
                        setTransactionDeadline(
                           parseFloat(e.target.value || "0")
                        )
                     }
                     className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6A00F4] focus:border-[#6A00F4] sm:text-sm"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
