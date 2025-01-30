import * as React from "react";
import { cn } from "../../utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = "xl", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900",
          {
            "max-w-screen-sm": maxWidth === "sm",
            "max-w-screen-md": maxWidth === "md",
            "max-w-screen-lg": maxWidth === "lg",
            "max-w-screen-xl": maxWidth === "xl",
            "max-w-screen-2xl": maxWidth === "2xl",
            "max-w-full": maxWidth === "full",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container"; 