import * as React from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "lucide-react";

export interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
  }[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [openIndexes, setOpenIndexes] = React.useState<number[]>(
    items.reduce<number[]>((acc, item, index) => {
      if (item.defaultOpen) acc.push(index);
      return acc;
    }, [])
  );

  const toggleItem = (index: number) => {
    setOpenIndexes((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "rounded-lg transition-colors",
            openIndexes.includes(index) 
              ? "bg-gray-100 dark:bg-gray-800/50" 
              : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
          )}
        >
          <button
            onClick={() => toggleItem(index)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <span className="uppercase tracking-wider">{item.title}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-200",
                openIndexes.includes(index) ? "rotate-180 text-gray-600 dark:text-gray-300" : ""
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-out",
              openIndexes.includes(index) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-4 pb-3">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}; 