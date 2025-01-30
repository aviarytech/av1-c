import * as React from "react";
import { Dialog, DialogHeader, DialogContent } from "./Dialog";
import { cn } from "../../utils/cn";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "error";
  actions?: React.ReactNode;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ className, open, onClose, title, description, variant = "info", actions, ...props }, ref) => {
    const icons = {
      info: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      success: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />,
      warning: <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />,
      error: <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />,
    };

    return (
      <Dialog 
        open={open} 
        onClose={onClose} 
        className={cn(
          "max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
          className
        )} 
        {...props}
      >
        <DialogHeader className="flex items-start gap-3 bg-white dark:bg-gray-900">
          {icons[variant]}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        </DialogHeader>
        {actions && (
          <DialogContent className="flex justify-end gap-3 bg-gray-50 dark:bg-gray-900">
            {actions}
          </DialogContent>
        )}
      </Dialog>
    );
  }
);
AlertDialog.displayName = "AlertDialog"; 