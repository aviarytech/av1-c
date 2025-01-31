import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-100",
        secondary: "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-100",
        success: "bg-green-200 text-green-700 dark:bg-green-500/20 dark:text-green-300",
        warning: "bg-yellow-200 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
        destructive: "bg-red-200 text-red-700 dark:bg-red-500/20 dark:text-red-300",
        outline: "border-2 border-gray-400 text-gray-700 dark:border-gray-600 dark:text-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge"; 