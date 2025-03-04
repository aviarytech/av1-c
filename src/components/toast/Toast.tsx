import * as React from "react";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";
import { ZINDEX } from "../../utils/z-index";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error" | "warning";
  title?: string;
  description?: string;
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", title, description, onClose, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100",
      success: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-300",
      error: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-300",
      warning: "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-300",
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

export const ToastContainer = () => {
  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4" style={{ zIndex: ZINDEX.toast }}>
      {/* Toast components will be rendered here */}
    </div>
  );
}; 