import * as React from "react";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";
import { cva, type VariantProps } from "class-variance-authority";

const dialogVariants = cva(
  "relative rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 w-full",
  {
    variants: {
      size: {
        sm: "sm:max-w-sm",             // 384px
        default: "sm:max-w-lg",        // 512px
        lg: "sm:max-w-xl",             // 576px
        xl: "sm:max-w-2xl",            // 672px
        "2xl": "sm:max-w-3xl",         // 768px
        "3xl": "sm:max-w-4xl",         // 896px
        "4xl": "sm:max-w-5xl",         // 1024px
        "5xl": "sm:max-w-6xl",         // 1152px
        full: "sm:max-w-[calc(100%-2rem)]", // Full width with margin
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface DialogProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof dialogVariants> {
  open?: boolean;
  onClose?: () => void;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, children, open, onClose, size, ...props }, ref) => {
    if (!open) return null;

    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{ zIndex: ZINDEX.dialog }}
        onClick={onClose}
      >
        <div 
          className={cn(
            "fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4",
            "animate-in fade-in duration-300"
          )}
        >
          <div
            ref={ref}
            className={cn(
              dialogVariants({ size }),
              "animate-in zoom-in-95 duration-300",
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