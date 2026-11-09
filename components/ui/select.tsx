import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "cn"

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      data-slot="select-wrapper"
      className="relative w-full"
    >
      <select
        data-slot="select"
        className={cn(
          "h-8 w-full appearance-none rounded-lg border border-input bg-transparent px-2.5 py-1 pr-8 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 [&>option]:bg-popover [&>option]:text-popover-foreground md:text-sm",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export { Select }
