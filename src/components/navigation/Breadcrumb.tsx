import * as React from "react";
import { cn } from "../../utils/cn";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    label: string;
    href?: string;
  }[];
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav ref={ref} className={cn("flex items-center space-x-2", className)} {...props}>
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500" />}
            {item.href ? (
              <a
                href={item.href}
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-sm text-gray-300">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb"; 