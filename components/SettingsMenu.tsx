import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

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
   function changeSP(value: string) {
      setSlippageTolerance(Number.parseFloat(value));
   }
   return (
      <div className="p-4 bg-background border-b border-border">
         <h3 className="text-foreground font-medium mb-2">Settings</h3>
         <div className="space-y-4">
            <label
               htmlFor="slippage"
               className="block text-sm font-medium text-muted-foreground"
            >
               Slippage tolerance
            </label>
            <Tabs defaultValue={slippageTolerance.toString()} className="mt-1">
               <TabsList>
                  <TabsTrigger onClick={() => changeSP("0.1")} value="0.1">
                     0.1%
                  </TabsTrigger>
                  <TabsTrigger onClick={() => changeSP("0.5")} value="0.5">
                     0.5%
                  </TabsTrigger>
                  <TabsTrigger onClick={() => changeSP("1")} value="1">
                     1%
                  </TabsTrigger>
                  <TabsTrigger onClick={() => changeSP("0")} value="0">
                     Auto
                  </TabsTrigger>
               </TabsList>
            </Tabs>
         </div>
      </div>
   );
}
