import * as React from "react";
import { Menu, Transition, Portal } from "@headlessui/react";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  direction?: "up" | "down";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = "left",
  direction = "down",
  className,
}) => {
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const updatePosition = React.useCallback((open: boolean) => {
    if (!buttonRef.current || !open) return;
    const rect = buttonRef.current.getBoundingClientRect();
    
    document.documentElement.style.setProperty('--x', `${rect.left}px`);
    document.documentElement.style.setProperty('--rx', `${window.innerWidth - rect.right}px`);
    document.documentElement.style.setProperty('--y', `${rect.bottom + 8}px`);
    document.documentElement.style.setProperty('--by', `${window.innerHeight - rect.top + 8}px`);
  }, []);

  return (
    <Menu>
      {({ open }) => (
        <div className="relative inline-block text-left">
          <div ref={buttonRef}>
            <Menu.Button 
              className="inline-flex cursor-pointer"
              onClick={() => updatePosition(true)}
            >
              {trigger}
            </Menu.Button>
          </div>

          <Portal>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              beforeEnter={() => updatePosition(true)}
              afterLeave={() => updatePosition(false)}
            >
              <Menu.Items
                className={cn(
                  "fixed rounded-lg shadow-lg",
                  "bg-white dark:bg-gray-800",
                  "border border-gray-200 dark:border-gray-700",
                  "focus:outline-none",
                  "min-w-[8rem] py-1",
                  "z-[100]",
                  className
                )}
                style={{
                  left: align === "left" ? "var(--x)" : "unset",
                  right: align === "right" ? "var(--rx)" : "unset",
                  top: direction === "down" ? "var(--y)" : "unset",
                  bottom: direction === "up" ? "var(--by)" : "unset",
                }}
              >
                {children}
              </Menu.Items>
            </Transition>
          </Portal>
        </div>
      )}
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