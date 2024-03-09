import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-64 border border-zinc-500 rounded-full bg-background px-3 py-2 text-sm font-sans ",
          className
        )}
        ref={ref}
        {...props}

      />
    )
  }
)
Input.displayName = "Input"

export { Input }
