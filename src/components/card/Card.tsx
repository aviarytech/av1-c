import * as React from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-gray-700 bg-gray-800 shadow-xl overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-5 hover:bg-gray-750/50 transition-colors", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border-t border-gray-700 p-4 bg-gray-850 flex justify-between items-center",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter"; 