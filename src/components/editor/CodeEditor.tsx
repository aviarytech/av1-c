import * as React from "react";
import { cn } from "../../utils/cn";
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';

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
  height = "auto",
  className,
  readOnly = false,
}) => {
  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return [javascript()];
      case "typescript":
        return [javascript({ typescript: true })];
      case "json":
        return [json()];
      case "jsonata":
      case "bash":
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
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          bracketMatching: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBrackets: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
}; 