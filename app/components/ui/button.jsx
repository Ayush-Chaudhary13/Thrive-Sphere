import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "app/libs/utils";

// Updated: use teal/dark theme!
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ring-offset-2 ring-offset-graydarker focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tealaccent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-tealmain text-graydarker hover:bg-tealaccent shadow-md",
        destructive:
          "bg-rose-600 text-graylight hover:bg-rose-700",
        outline:
          "border border-tealmain text-tealmain bg-transparent hover:bg-tealmain/10 hover:text-tealaccent",
        secondary:
          "bg-graydark text-graylight hover:bg-graydarker hover:text-tealaccent",
        ghost:
          "bg-transparent text-tealmain hover:bg-tealmain/10",
        link:
          "text-tealmain underline-offset-4 hover:underline",
      },
      size: {
        full: "w-full h-10 px-4 py-2",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
