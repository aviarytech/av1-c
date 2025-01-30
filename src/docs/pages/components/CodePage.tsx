import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Code } from "../../../components/typography/Code";
import { Title } from "../../../components/typography/Title";

export const CodePage = () => {
  const codeProps = [
    {
      name: "inline",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to render as inline code or a code block",
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
        title="Code"
        description="A component for displaying code snippets and inline code."
        code={`import { Code } from "av1-c";

const MyComponent = () => (
  <p>
    Install using <Code>npm install @aviarytech/av1-c</Code>
  </p>
);`}
      >
        <p className="text-gray-400">
          Install using <Code>npm install @aviarytech/av1-c</Code>
        </p>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={codeProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Inline Code"
            description="Code used inline within text"
            code={`<p>
  Use the <Code>className</Code> prop to add custom styles.
  The <Code>inline</Code> prop defaults to true.
</p>`}
          >
            <p className="text-gray-400">
              Use the <Code>className</Code> prop to add custom styles.
              The <Code>inline</Code> prop defaults to true.
            </p>
          </ComponentDemo>

          <ComponentDemo
            title="Code Block"
            description="Code displayed as a block"
            code={`<Code inline={false}>
{\`const greeting = "Hello World";
console.log(greeting);\`}
</Code>`}
          >
            <Code inline={false}>
{`const greeting = "Hello World";
console.log(greeting);`}
            </Code>
          </ComponentDemo>

          <ComponentDemo
            title="Custom Styling"
            description="Code with custom styles"
            code={`<Code className="bg-blue-900/50 text-blue-200">
  npm run build
</Code>`}
          >
            <Code className="bg-blue-900/50 text-blue-200">
              npm run build
            </Code>
          </ComponentDemo>

          <ComponentDemo
            title="With Variables"
            description="Code highlighting variables or important parts"
            code={`<p>
  Set <Code className="text-blue-400">NODE_ENV</Code> to
  <Code className="text-green-400">production</Code>
</p>`}
          >
            <p className="text-gray-400">
              Set <Code className="text-blue-400">NODE_ENV</Code> to{" "}
              <Code className="text-green-400">production</Code>
            </p>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 