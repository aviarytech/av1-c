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
    const checkboxId = id || React.useId();

    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={cn(
              "peer h-4 w-4 appearance-none rounded border",
              "border-gray-300 dark:border-gray-600",
              "bg-white dark:bg-gray-800",
              "checked:bg-blue-500 dark:checked:bg-blue-600",
              "checked:border-blue-500 dark:checked:border-blue-600",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-600/30",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
          <Check 
            className={cn(
              "absolute left-0 top-0 h-4 w-4 stroke-[3] text-white opacity-0 transition-opacity",
              "peer-checked:opacity-100",
              "pointer-events-none"
            )} 
          />
        </div>
        {label && (
          <label 
            htmlFor={checkboxId}
            className="ml-2 text-sm text-gray-900 dark:text-gray-100"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox"; 