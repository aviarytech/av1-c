import * as React from "react";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className="absolute w-full rounded-md bg-gray-800 mt-1 shadow-lg"
        style={{ zIndex: ZINDEX.select }}
      >
        <select
          ref={ref}
          className={cn(
            "flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);
Select.displayName = "Select"; 