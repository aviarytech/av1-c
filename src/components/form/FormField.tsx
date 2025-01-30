import * as React from "react";
import { cn } from "../../utils/cn";
import { Label } from "../label/Label";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, error, required, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <Label>
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </Label>
        )}
        {children}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);
FormField.displayName = "FormField"; 