import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-brand-blue text-white shadow-clay-light dark:shadow-clay-dark hover:brightness-110",
        destructive:
          "bg-danger-bg text-danger-accent hover:brightness-105 shadow-clay-light-sm dark:shadow-clay-dark-sm",
        outline:
          "border border-border-strong bg-transparent shadow-sm hover:bg-surface-secondary",
        secondary:
          "bg-surface-secondary text-text-primary shadow-clay-light-sm dark:shadow-clay-dark-sm hover:brightness-105",
        ghost: "hover:bg-surface-secondary text-text-primary",
        link: "text-brand-blue underline-offset-4 hover:underline",
        clay: "bg-surface text-text-primary shadow-clay-light dark:shadow-clay-dark hover:shadow-clay-light-hover dark:hover:shadow-clay-dark-hover"
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-xl px-3 text-xs",
        lg: "h-12 rounded-2xl px-8",
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
