import * as React from "react";
import { cn } from "../../utils/cn";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, level = 1, children, ...props }, ref) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;

    const styles = {
      1: "text-3xl font-bold tracking-tight",
      2: "text-2xl font-semibold tracking-tight",
      3: "text-xl font-semibold tracking-tight",
      4: "text-lg font-semibold tracking-tight",
      5: "text-base font-semibold tracking-tight",
      6: "text-sm font-semibold tracking-tight",
    };

    return (
      <Component
        ref={ref}
        className={cn(styles[level], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Title.displayName = "Title"; 