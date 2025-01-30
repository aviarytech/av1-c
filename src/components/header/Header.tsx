import * as React from "react";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  position?: "fixed" | "sticky" | "static";
  bordered?: boolean;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, position = "static", bordered = true, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
          position === "fixed" && "fixed top-0 z-50",
          position === "sticky" && "sticky top-0 z-50",
          bordered && "border-b border-gray-200 dark:border-gray-800",
          className
        )}
        style={{ 
          zIndex: ZINDEX.header,
          position: position 
        }}
        {...props}
      />
    );
  }
);
Header.displayName = "Header";

export const HeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container mx-auto px-4 h-16 flex items-center", className)}
    {...props}
  />
));
HeaderContent.displayName = "HeaderContent";

export const HeaderNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("flex items-center gap-6 mx-6", className)}
    {...props}
  />
));
HeaderNav.displayName = "HeaderNav";

export const HeaderNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors",
      className
    )}
    {...props}
  />
));
HeaderNavItem.displayName = "HeaderNavItem"; 