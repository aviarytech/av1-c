import * as React from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "lucide-react";
import { Dropdown, DropdownProps } from "../dropdown/Dropdown";

export interface NavMenuProps extends Omit<DropdownProps, 'variant' | 'trigger'> {
  trigger: React.ReactNode;
}

export const NavMenu: React.FC<NavMenuProps> = ({
  trigger,
  children,
  direction = "down",
  ...props
}) => {
  return (
    <Dropdown
      trigger={
        <>
          {trigger}
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              direction === "up" && "rotate-180"
            )} 
          />
        </>
      }
      variant="nav"
      direction={direction}
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