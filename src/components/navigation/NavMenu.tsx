import * as React from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "lucide-react";

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            "absolute top-full left-0 mt-2 w-48 rounded-lg border border-gray-700 bg-gray-800 p-1 shadow-lg",
            className
          )}
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