import * as React from "react";
import { cn } from "../../utils/cn";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
}

export const Code: React.FC<CodeProps> = ({ 
  children, 
  className,
  inline = true,
  ...props 
}) => {
  const Component = inline ? 'code' : 'pre';
  
  return (
    <Component
      className={cn(
        "rounded font-mono text-sm",
        // Light mode: lighter background, darker text
        "bg-gray-100 text-gray-900",
        // Dark mode: darker background, lighter text
        "dark:bg-gray-800 dark:text-gray-100",
        inline ? "px-1.5 py-0.5" : "p-4",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}; 