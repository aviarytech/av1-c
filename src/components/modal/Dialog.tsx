import * as React from "react";
import { cn } from "../../utils/cn";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, children, open, onClose, ...props }, ref) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="fixed inset-0" 
          onClick={onClose}
        />
        <div
          ref={ref}
          className={cn(
            "relative bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-4",
            className
          )}
          {...props}
        >
          {children}
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
      className={cn("p-6 border-b border-gray-700", className)}
      {...props}
    />
  )
);
DialogHeader.displayName = "DialogHeader";

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6", className)}
      {...props}
    />
  )
);
DialogContent.displayName = "DialogContent"; 