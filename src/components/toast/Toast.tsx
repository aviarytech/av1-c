import * as React from "react";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error" | "warning";
  title?: string;
  description?: string;
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", title, description, onClose, ...props }, ref) => {
    const variantStyles = {
      default: "bg-gray-800 border-gray-700",
      success: "bg-green-500/10 border-green-500/20 text-green-300",
      error: "bg-red-500/10 border-red-500/20 text-red-300",
      warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-300",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto relative rounded-lg border p-4 shadow-lg",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            {title && <div className="font-semibold">{title}</div>}
            {description && (
              <div className="mt-1 text-sm opacity-90">{description}</div>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-md p-1 opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
Toast.displayName = "Toast"; 