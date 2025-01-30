import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { ZINDEX } from "../../utils/z-index";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "right":
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollX + 8;
        break;
      case "bottom":
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
    }

    setTooltipPosition({ top, left });
  }, [position]);

  React.useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              "absolute whitespace-normal rounded-md px-3 py-2 text-sm shadow-lg max-w-xs",
              "bg-white dark:bg-gray-800",
              "text-gray-900 dark:text-gray-100",
              "border border-gray-200 dark:border-gray-700",
              className
            )}
            style={{
              zIndex: ZINDEX.tooltip,
              top: tooltipPosition.top,
              left: tooltipPosition.left,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}; 