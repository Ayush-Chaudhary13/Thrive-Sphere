import * as React from "react"
import { cn } from "app/libs/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-graydark bg-graydarker px-3 py-2 text-sm text-graylight placeholder:text-gray-400 ring-offset-graydarker focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tealmain focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition",
        className
      )}
      ref={ref}
      {...props}
    />
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
