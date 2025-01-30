import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { Title } from "../../../components/typography/Title";
import { PropsTable } from "../../components/PropsTable";
import { CodeEditor } from "../../../components/editor/CodeEditor";

export const CodeEditorPage = () => {
  const codeEditorProps = [
    {
      name: "value",
      type: "string",
      required: true,
      description: "The code content to display",
    },
    {
      name: "language",
      type: "string",
      defaultValue: "typescript",
      description: "Programming language for syntax highlighting",
    },
    {
      name: "readOnly",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the editor is read-only",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Code Editor"
        description="A code editor component with syntax highlighting and optional editing capabilities."
        code={`import { CodeEditor } from "av1-c";

const MyComponent = () => (
  <CodeEditor
    value="const greeting = 'Hello, World!';"
    language="typescript"
    readOnly
  />
);`}
      >
        <div className="w-full">
          <CodeEditor
            value="const greeting = 'Hello, World!';\nconsole.log(greeting);"
            language="typescript"
            readOnly
          />
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={codeEditorProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Editable"
            description="Code editor with editing enabled"
            code={`<CodeEditor
  value={code}
  onChange={setCode}
  language="javascript"
/>`}
          >
            <CodeEditor
              value="// Try editing this code
function add(a, b) {
  return a + b;
}"
              language="javascript"
            />
          </ComponentDemo>

          <ComponentDemo
            title="Different Languages"
            description="Code editor with different language support"
            code={`<CodeEditor
  value={htmlCode}
  language="typescript"
  readOnly
/>`}
          >
            <CodeEditor
              value={`// This could be any supported language
const html = \`
  <div class="container">
    <h1>Hello World</h1>
    <p>Welcome to my website</p>
  </div>
\`;`}
              language="typescript"
              readOnly
            />
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 