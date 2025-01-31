import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Badge } from "../../../components/badge/Badge";
import { Title } from "../../../components/typography/Title";

export const BadgePage = () => {
  const badgeProps = [
    {
      name: "variant",
      type: "'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'",
      defaultValue: "default",
      description: "Controls the visual style of the badge",
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
        title="Badge"
        description="A small visual indicator component for status, labels, and counts."
        code={`import { Badge } from "av1-c";

const MyComponent = () => (
  <Badge variant="success">
    Completed
  </Badge>
);`}
      >
        <div className="flex gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={badgeProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="All Variants"
            description="Available badge variants"
            code={`<div className="space-x-2">
  <Badge variant="default">Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`}
          >
            <div className="space-x-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </ComponentDemo>

          <ComponentDemo
            title="With Custom Styles"
            description="Badge with custom styling"
            code={`<Badge className="bg-purple-200 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300">
  Custom
</Badge>`}
          >
            <Badge className="bg-purple-200 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300">
              Custom
            </Badge>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 