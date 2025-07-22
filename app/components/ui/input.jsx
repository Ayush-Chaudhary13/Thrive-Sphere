import * as React from "react"
import { cn } from "app/libs/utils"

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-graydark bg-graydarker px-3 py-2 text-sm text-graylight placeholder:text-gray-400 ring-offset-graydarker focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tealmain focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
