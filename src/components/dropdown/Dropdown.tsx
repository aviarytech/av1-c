import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  direction?: "down" | "up";
  variant?: "default" | "nav";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = "left",
  direction = "down",
  variant = "default",
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    if (variant === "nav") {
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (variant === "nav") {
        document.removeEventListener("keydown", handleEscape);
      }
    };
  }, [variant]);

  const triggerClasses = cn({
    "cursor-pointer": true,
    "flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors": 
      variant === "nav",
  });

  const menuClasses = cn(
    "absolute rounded-lg shadow-lg min-w-[8rem] py-1",
    variant === "default" && [
      "bg-white dark:bg-gray-900",
      "border border-gray-200 dark:border-gray-800",
    ],
    variant === "nav" && [
      "bg-white dark:bg-gray-800",
      "border border-gray-200 dark:border-gray-700",
      "w-48 rounded-md",
    ],
    {
      "left-0": align === "left",
      "right-0": align === "right",
      "top-full mt-2": direction === "down",
      "bottom-full mb-2": direction === "up",
    },
    className
  );

  // Get position for the dropdown menu
  const getDropdownPosition = () => {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();
    
    return {
      position: 'fixed' as const,
      left: rect.left,
      right: window.innerWidth - rect.right,
      ...(direction === 'down' 
        ? { top: rect.bottom + 8 }
        : { bottom: window.innerHeight - rect.top + 8 }
      ),
    };
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)} 
        className={triggerClasses}
      >
        {trigger}
      </div>
      {isOpen && createPortal(
        <div
          className={menuClasses}
          style={{
            ...getDropdownPosition(),
            zIndex: ZINDEX.dropdown,
          }}
        >
          {children}
        </div>,
        document.body
      )}
    </div>
  );
};

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full items-center px-3 py-2 text-sm",
      "text-gray-700 dark:text-gray-200",
      "hover:bg-gray-100 dark:hover:bg-gray-800",
      "focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800",
      className
    )}
    {...props}
  >
    {children}
  </button>
));
DropdownItem.displayName = "DropdownItem"; 