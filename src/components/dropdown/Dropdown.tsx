import * as React from "react";
import { Menu } from "@headlessui/react";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = "left",
  className,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex cursor-pointer">
        {trigger}
      </Menu.Button>

      <Menu.Items
        className={cn(
          "absolute mt-2 rounded-lg shadow-lg",
          "bg-white dark:bg-gray-800",
          "border border-gray-200 dark:border-gray-700",
          "focus:outline-none",
          "min-w-[8rem] py-1",
          {
            "left-0": align === "left",
            "right-0": align === "right",
          },
          className
        )}
        style={{ zIndex: ZINDEX.dropdown }}
      >
        {children}
      </Menu.Items>
    </Menu>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, href, onClick, className }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "w-full px-4 py-2 text-sm",
          "text-gray-700 dark:text-gray-200",
          className
        )}
      >
        {children}
      </div>
    );

    return (
      <Menu.Item>
        {({ active }) => 
          href ? (
            <a 
              href={href} 
              onClick={onClick}
              className={cn(
                "block w-full",
                active && "bg-gray-100 dark:bg-gray-700"
              )}
            >
              {content}
            </a>
          ) : (
            <button 
              type="button" 
              onClick={onClick}
              className={cn(
                "block w-full text-left",
                active && "bg-gray-100 dark:bg-gray-700"
              )}
            >
              {content}
            </button>
          )
        }
      </Menu.Item>
    );
  }
);

DropdownItem.displayName = "DropdownItem"; 