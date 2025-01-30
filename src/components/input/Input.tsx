import * as React from "react";
import { cn } from "../../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md px-3 py-1 text-sm shadow-sm transition-colors",
          "bg-white dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "border border-gray-300 dark:border-gray-700",
          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input"; 