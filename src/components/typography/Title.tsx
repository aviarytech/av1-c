import * as React from "react";
import { cn } from "../../utils/cn";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const HeadingComponents = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6'
} as const;

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, level = 1, children, ...props }, ref) => {
    const Component = HeadingComponents[level as keyof typeof HeadingComponents];

    const styles = {
      1: "text-3xl font-bold tracking-tight",
      2: "text-2xl font-semibold tracking-tight",
      3: "text-xl font-semibold tracking-tight",
      4: "text-lg font-semibold tracking-tight",
      5: "text-base font-semibold tracking-tight",
      6: "text-sm font-semibold tracking-tight",
    } as const;

    return React.createElement(
      Component,
      {
        ref,
        className: cn(styles[level], className),
        ...props
      },
      children
    );
  }
);
Title.displayName = "Title"; 