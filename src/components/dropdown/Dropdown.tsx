import * as React from "react";
import { Menu, Transition, Portal } from "@headlessui/react";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right" | "end";
  direction?: "up" | "down";
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = "left",
  direction = "down",
  className,
  open: controlledOpen,
  onOpenChange,
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

  const isControlled = controlledOpen !== undefined;

  return (
    <Menu as="div" 
      open={isControlled ? controlledOpen : undefined}
      onChange={(open) => isControlled && onOpenChange?.(open)}
    >
      {({ open: menuOpen }) => {
        // Handle controlled state changes
        const isOpen = isControlled ? controlledOpen : menuOpen;
        React.useEffect(() => {
          if (isControlled && isOpen !== controlledOpen) {
            onOpenChange?.(isOpen);
          }
        }, [isOpen, controlledOpen, isControlled]);

        return (
          <div className="relative inline-block text-left">
            <div ref={buttonRef}>
              <Menu.Button 
                className="inline-flex cursor-pointer"
                onClick={() => {
                  updatePosition(true);
                  if (isControlled) {
                    onOpenChange?.(!controlledOpen);
                  }
                }}
              >
                {trigger}
              </Menu.Button>
            </div>

            <Portal>
              <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                beforeEnter={() => updatePosition(true)}
                afterLeave={() => {
                  updatePosition(false);
                  if (isControlled) {
                    onOpenChange?.(false);
                  }
                }}
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
                    left: align === "left" ? "var(--x)" : align === "end" ? "unset" : "unset",
                    right: align === "right" ? "var(--rx)" : align === "end" ? "16px" : "unset",
                    top: direction === "down" ? "var(--y)" : "unset",
                    bottom: direction === "up" ? "var(--by)" : "unset",
                  }}
                  static
                >
                  {children}
                </Menu.Items>
              </Transition>
            </Portal>
          </div>
        );
      }}
    </Menu>
  );
};

export interface DropdownItemProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  onClick?: () => void;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, asChild = false, className, onClick }, ref) => {
    return (
      <Menu.Item>
        {({ active }) => {
          if (asChild) {
            const child = React.Children.only(children) as React.ReactElement;
            return React.cloneElement(child, {
              className: cn(
                "block w-full px-4 py-2 text-sm",
                "text-gray-700 dark:text-gray-200",
                active && "bg-gray-100 dark:bg-gray-700",
                child.props.className,
                className
              ),
              onClick: (e: React.MouseEvent) => {
                child.props.onClick?.(e);
                onClick?.();
              },
              ref
            });
          }

          return (
            <button 
              type="button" 
              ref={ref as any}
              onClick={onClick}
              className={cn(
                "block w-full px-4 py-2 text-sm text-left",
                "text-gray-700 dark:text-gray-200",
                active && "bg-gray-100 dark:bg-gray-700",
                className
              )}
            >
              {children}
            </button>
          );
        }}
      </Menu.Item>
    );
  }
);

DropdownItem.displayName = "DropdownItem"; 