import * as React from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "lucide-react";
import { ZINDEX } from "../../utils/z-index";

export interface NavMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const NavMenu: React.FC<NavMenuProps> = ({
  trigger,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Close menu when pressing escape
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      setIsOpen(false); // Ensure menu is closed on unmount
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors"
      >
        {trigger}
        <ChevronDown className="h-4 w-4" />
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5",
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

export const NavMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full items-center rounded-md px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 focus:outline-none",
      className
    )}
    {...props}
  >
    {children}
  </button>
));
NavMenuItem.displayName = "NavMenuItem"; 