import * as React from "react";
import { cn } from "../../utils/cn";
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { useTheme } from "../../ThemeProvider";

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: "json" | "javascript" | "typescript" | "jsonata" | "bash" | "text";
  height?: string;
  className?: string;
  readOnly?: boolean;
  extensions?: any[];
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = "json",
  height = "auto",
  className,
  readOnly = false,
  extensions = []
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

  // Get the current theme to determine if we should use the dark theme
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  return (
    <div className={cn("rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700", className)}>
      <CodeMirror
        value={value}
        height={height}
        theme={isDark ? oneDark : undefined}
        extensions={[...getLanguageExtension(), ...extensions]}
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