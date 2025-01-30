import * as React from "react";
import { cn } from "../../utils/cn";
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: "json" | "javascript" | "typescript" | "jsonata" | "bash";
  height?: string;
  className?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = "json",
  height = "300px",
  className,
  readOnly = false,
}) => {
  const getLanguageExtension = () => {
    // You'll need to import the appropriate language extensions
    // based on what languages you want to support
    switch (language) {
      case "jsonata":
        return [];
      default:
        return [];
    }
  };

  return (
    <div className={cn("rounded-lg overflow-hidden border border-gray-700", className)}>
      <CodeMirror
        value={value}
        height={height}
        theme={oneDark}
        extensions={getLanguageExtension()}
        onChange={onChange}
        editable={!readOnly}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
        }}
      />
    </div>
  );
}; 