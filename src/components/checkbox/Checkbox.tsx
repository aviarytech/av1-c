import * as React from "react";
import { cn } from "../../utils/cn";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text to display next to the checkbox */
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            ref={ref}
            id={id}
            className={cn(
              "peer h-4 w-4 appearance-none rounded border border-gray-700 bg-gray-800 transition-colors",
              "checked:border-blue-500 checked:bg-blue-500",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
          <Check className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
        </div>
        {label && (
          <label 
            htmlFor={id} 
            className="text-sm text-gray-300 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox"; 