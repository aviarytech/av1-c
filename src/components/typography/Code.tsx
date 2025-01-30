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
        "rounded bg-gray-800 font-mono text-sm",
        inline ? "px-1.5 py-0.5" : "p-4",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}; 