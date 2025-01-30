import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Button } from "../../../components/button/Button";
import { Title } from "../../../components/typography/Title";

export const ButtonPage = () => {
  const buttonProps = [
    {
      name: "variant",
      type: "'default' | 'destructive' | 'outline' | 'ghost' | 'link' | 'amber'",
      defaultValue: "default",
      description: "Controls the visual style of the button",
    },
    {
      name: "size",
      type: "'default' | 'sm' | 'lg' | 'icon'",
      defaultValue: "default",
      description: "Controls the size of the button",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to render as a child component",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Button"
        description="A flexible button component with multiple variants and sizes."
        code={`import { Button } from "av1-c";

const MyComponent = () => (
  <Button variant="default" size="default">
    Click Me
  </Button>
);`}
      >
        <div className="flex gap-4">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={buttonProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Variants</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Sizes"
            description="Different button sizes"
            code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}
          >
            <div className="flex items-center gap-4">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </ComponentDemo>

          <ComponentDemo
            title="States"
            description="Button states"
            code={`<Button disabled>Disabled</Button>
<Button loading>Loading</Button>`}
          >
            <div className="flex items-center gap-4">
              <Button disabled>Disabled</Button>
              <Button className="opacity-50 cursor-not-allowed">Loading</Button>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 