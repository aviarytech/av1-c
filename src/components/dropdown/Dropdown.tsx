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
  const [position, setPosition] = React.useState<{ top?: number; bottom?: number; left: number; right: number }>({ left: 0, right: 0 });
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

  // Update position when scrolling or resizing
  React.useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      
      setPosition({
        left: rect.left,
        right: window.innerWidth - rect.right,
        ...(direction === 'down' 
          ? { top: rect.bottom + 8 }
          : { bottom: window.innerHeight - rect.top + 8 }
        ),
      });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, direction]);

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
            position: 'fixed',
            ...position,
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

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, children, icon, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center px-3 py-2 text-sm gap-2",
        "text-gray-700 dark:text-gray-200",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
);
DropdownItem.displayName = "DropdownItem"; 