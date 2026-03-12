import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-blue text-white",
        secondary:
          "border-transparent bg-surface-secondary text-text-secondary shadow-clay-light-sm dark:shadow-clay-dark-sm",
        destructive:
          "border-transparent bg-danger-bg text-danger-text",
        success:
          "border-transparent bg-success-bg text-success-text",
        warning:
          "border-transparent bg-warning-bg text-warning-text",
        info:
          "border-transparent bg-info-bg text-info-text",
        outline: "text-text-primary border-border-strong",
        clay: "border-white/20 bg-surface shadow-clay-light-sm dark:shadow-clay-dark-sm text-text-primary"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
