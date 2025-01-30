import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Title } from "../../../components/typography/Title";

export const TitlePage = () => {
  const titleProps = [
    {
      name: "level",
      type: "1 | 2 | 3 | 4 | 5 | 6",
      defaultValue: "1",
      description: "Heading level (h1-h6)",
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
        title="Title"
        description="A component for consistent heading styles across the application."
        code={`import { Title } from "av1-c";

const MyComponent = () => (
  <Title level={1}>Page Title</Title>
);`}
      >
        <div className="space-y-4">
          <Title level={1}>Heading Level 1</Title>
          <Title level={2}>Heading Level 2</Title>
          <Title level={3}>Heading Level 3</Title>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={titleProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="With Custom Styles"
            description="Title with custom styling"
            code={`<Title 
  level={2} 
  className="text-blue-400 font-light"
>
  Custom Title
</Title>`}
          >
            <Title 
              level={2} 
              className="text-blue-400 font-light"
            >
              Custom Title
            </Title>
          </ComponentDemo>

          <ComponentDemo
            title="As Section Header"
            description="Title used as a section header"
            code={`<div className="space-y-2">
  <Title level={3}>Section Title</Title>
  <p className="text-gray-400">
    Section content goes here
  </p>
</div>`}
          >
            <div className="space-y-2">
              <Title level={3}>Section Title</Title>
              <p className="text-gray-400">
                Section content goes here with a longer description
                to show how text wraps under the title.
              </p>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 