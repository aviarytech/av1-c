import * as React from "react";
import { cn } from "../../utils/cn";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue);

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleTabClick = (tabValue: string) => {
      if (value === undefined) {
        setSelectedValue(tabValue);
      }
      onValueChange?.(tabValue);
    };

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div className="border-b border-gray-700">
          <div className="flex -mb-px gap-4">
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return null;
              const tabValue = child.props.value;
              const isSelected = tabValue === selectedValue;

              return React.cloneElement(child as React.ReactElement<TabProps>, {
                onClick: () => handleTabClick(tabValue),
                "aria-selected": isSelected,
                className: cn(
                  "px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  isSelected
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-400 hover:text-gray-300",
                  child.props.className
                ),
              });
            })}
          </div>
        </div>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;
          return child.props.value === selectedValue ? child.props.children : null;
        })}
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      role="tab"
      className={cn(className)}
      {...props}
    />
  )
);
Tab.displayName = "Tab"; 