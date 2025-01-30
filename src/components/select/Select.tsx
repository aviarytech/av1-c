import * as React from "react";
import { cn } from "../../utils/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md px-3 py-1 text-sm shadow-sm transition-colors",
          // Light mode styles
          "bg-white border-gray-200 text-gray-900",
          // Dark mode styles
          "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500",
          // Disabled styles
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select"; 