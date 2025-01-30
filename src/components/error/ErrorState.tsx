import * as React from "react";
import { cn } from "../../utils/cn";
import { AlertTriangle, XCircle, AlertCircle } from "lucide-react";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "error" | "warning" | "unauthorized";
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ 
    className, 
    variant = "error",
    title,
    description,
    action,
    ...props 
  }, ref) => {
    const icons = {
      error: <XCircle className="h-12 w-12 text-red-400" />,
      warning: <AlertTriangle className="h-12 w-12 text-yellow-400" />,
      unauthorized: <AlertCircle className="h-12 w-12 text-blue-400" />
    };

    const defaultContent = {
      error: {
        title: "An error occurred",
        description: "Something went wrong. Please try again later."
      },
      warning: {
        title: "Warning",
        description: "Please review the following information."
      },
      unauthorized: {
        title: "Unauthorized Access",
        description: "You don't have permission to access this resource."
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center",
          className
        )}
        {...props}
      >
        <div className="mb-4">
          {icons[variant]}
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {title || defaultContent[variant].title}
        </h2>
        <p className="text-gray-400 mb-6">
          {description || defaultContent[variant].description}
        </p>
        {action && (
          <div className="mt-2">
            {action}
          </div>
        )}
      </div>
    );
  }
);
ErrorState.displayName = "ErrorState"; 