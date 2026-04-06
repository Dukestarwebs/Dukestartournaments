import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-accent-bright)] text-white hover:bg-[var(--color-accent-deep)]",
        destructive: "bg-[var(--color-comp-red)] text-white hover:bg-[var(--color-comp-red)]/90",
        outline: "border border-[var(--color-border-default)] bg-transparent hover:bg-[var(--color-base-secondary)] text-white",
        secondary: "bg-[var(--color-base-secondary)] text-white hover:bg-[var(--color-base-secondary)]/80",
        ghost: "hover:bg-[var(--color-base-secondary)] text-white",
        link: "text-[var(--color-accent-bright)] underline-offset-4 hover:underline",
        orange: "bg-[var(--color-comp-orange)] text-white hover:bg-[var(--color-comp-highlight)]",
      },
      size: {
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
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
