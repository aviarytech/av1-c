import * as React from "react";
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
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "absolute mt-2 rounded-lg shadow-lg",
            "bg-white dark:bg-gray-900",
            "border border-gray-200 dark:border-gray-800",
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
        </div>
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