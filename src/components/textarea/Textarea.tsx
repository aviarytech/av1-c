import * as React from "react"
import { cn } from "../../utils/cn"

/**
 * Props for the Textarea component
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * A styled textarea component with dark mode support
 * 
 * @example
 * ```tsx
 * <Textarea
 *   value={value}
 *   onChange={handleChange}
 *   placeholder="Enter description..."
 *   rows={4}
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full p-2 rounded border border-gray-600 ",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "resize-none",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea } 