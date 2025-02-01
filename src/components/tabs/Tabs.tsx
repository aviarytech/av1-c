import * as React from "react";
import { cn } from "../../utils/cn";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The default selected tab value */
  defaultValue?: string;
  /** Controlled value for selected tab */
  value?: string;
  /** Callback when tab selection changes */
  onValueChange?: (value: string) => void;
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value that identifies the tab */
  value: string;
  /** Type of button */
  type?: "button" | "submit" | "reset";
}

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value that matches the associated tab */
  value: string;
}

/**
 * Tabs component for switching between different views
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <Tab value="tab1">Tab 1</Tab>
 *   <Tab value="tab2">Tab 2</Tab>
 *   <TabPanel value="tab1">Content 1</TabPanel>
 *   <TabPanel value="tab2">Content 2</TabPanel>
 * </Tabs>
 * ```
 */
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
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex -mb-px gap-4">
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child) || child.type !== Tab) return null;
              const tabValue = child.props.value;
              const isSelected = tabValue === selectedValue;

              return React.cloneElement(child as React.ReactElement<TabProps>, {
                onClick: () => handleTabClick(tabValue),
                "aria-selected": isSelected,
                className: cn(
                  "px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  isSelected
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300",
                  child.props.className
                ),
              });
            })}
          </div>
        </div>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child) || child.type !== TabPanel) return null;
          return child.props.value === selectedValue ? child : null;
        })}
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

/**
 * Individual tab button
 */
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

/**
 * Content panel associated with a tab
 */
export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tabpanel"
      className={cn("p-6", className)}
      {...props}
    />
  )
);
TabPanel.displayName = "TabPanel"; 