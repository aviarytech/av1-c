import * as React from "react";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, children, open, onClose, ...props }, ref) => {
    if (!open) return null;

    return (
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: ZINDEX.dialog }}
        onClick={onClose}
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div
            ref={ref}
            className={cn(
              "relative rounded-lg shadow-lg",
              "bg-white dark:bg-gray-900",
              "border border-gray-200 dark:border-gray-800",
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Dialog.displayName = "Dialog";

export const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6 border-b border-gray-200 dark:border-gray-800",
        className
      )}
      {...props}
    />
  )
);
DialogHeader.displayName = "DialogHeader";

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6",
        className
      )}
      {...props}
    />
  )
);
DialogContent.displayName = "DialogContent"; 