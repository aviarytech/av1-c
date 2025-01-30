import * as React from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "lucide-react";
import { Dropdown, DropdownProps } from "../dropdown/Dropdown";

export interface NavMenuProps extends Omit<DropdownProps, 'trigger'> {
  trigger: React.ReactNode;
}

export const NavMenu: React.FC<NavMenuProps> = ({
  trigger,
  children,
  ...props
}) => {
  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
          {trigger}
          <ChevronDown className="h-4 w-4" />
        </div>
      }
      {...props}
    >
      {children}
    </Dropdown>
  );
};

export const NavMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full items-center rounded-md px-2 py-1.5 text-sm",
      "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
      "focus:outline-none",
      className
    )}
    {...props}
  >
    {children}
  </button>
));

NavMenuItem.displayName = "NavMenuItem"; 