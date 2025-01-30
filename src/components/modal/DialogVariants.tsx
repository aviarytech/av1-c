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
      info: <Info className="h-5 w-5 text-blue-400" />,
      success: <CheckCircle className="h-5 w-5 text-green-400" />,
      warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      error: <XCircle className="h-5 w-5 text-red-400" />,
    };

    return (
      <Dialog open={open} onClose={onClose} className={cn("max-w-md", className)} {...props}>
        <DialogHeader className="flex items-start gap-3">
          {icons[variant]}
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
          </div>
        </DialogHeader>
        {actions && (
          <DialogContent className="flex justify-end gap-3">{actions}</DialogContent>
        )}
      </Dialog>
    );
  }
);
AlertDialog.displayName = "AlertDialog"; 