export default function SettingsMenu({
  slippageTolerance,
  setSlippageTolerance,
  transactionDeadline,
  setTransactionDeadline,
}) {
  return (
    <div className="p-4 bg-background border-b border-border">
      <h3 className="text-foreground font-medium mb-2">Settings</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="slippage" className="block text-sm font-medium text-muted-foreground">
            Slippage tolerance
          </label>
          <input
            type="text"
            id="slippage"
            value={slippageTolerance}
            onChange={(e) => setSlippageTolerance(e.target.value)}
            className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6A00F4] focus:border-[#6A00F4] sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-muted-foreground">
            Transaction deadline (minutes)
          </label>
          <input
            type="text"
            id="deadline"
            value={transactionDeadline}
            onChange={(e) => setTransactionDeadline(e.target.value)}
            className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6A00F4] focus:border-[#6A00F4] sm:text-sm"
          />
        </div>
      </div>
    </div>
  )
}

