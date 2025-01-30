import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { Title } from "../../../components/typography/Title";
import { PropsTable } from "../../components/PropsTable";
import { Accordion } from "../../../components/accordion/Accordion";

export const AccordionPage = () => {
  const accordionProps = [
    {
      name: "items",
      type: "Array<{ title: string; content: ReactNode; defaultOpen?: boolean; }>",
      required: true,
      description: "Array of accordion items with title, content and optional default open state",
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
        title="Accordion"
        description="A vertically stacked set of interactive headings that reveal or hide associated content."
        code={`import { Accordion } from "av1-c";

const MyComponent = () => (
  <Accordion
    items={[
      {
        title: "Section 1",
        content: "Content for section 1",
        defaultOpen: true
      },
      {
        title: "Section 2",
        content: "Content for section 2"
      }
    ]}
  />
);`}
      >
        <div className="w-full max-w-md">
          <Accordion
            items={[
              {
                title: "What is AV1-C?",
                content: "AV1-C is a React component library built with TypeScript and Tailwind CSS.",
                defaultOpen: true
              },
              {
                title: "Installation",
                content: "Install using npm: npm install av1-c"
              },
              {
                title: "Usage",
                content: "Import components from the library and use them in your React application."
              }
            ]}
          />
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={accordionProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Custom Styling"
            description="Accordion with custom styles"
            code={`<Accordion
  className="border rounded-xl"
  items={[
    {
      title: "Custom Section",
      content: "Custom content"
    }
  ]}
/>`}
          >
            <Accordion
              className="border rounded-xl"
              items={[
                {
                  title: "Custom Section",
                  content: "This accordion has custom border styling."
                }
              ]}
            />
          </ComponentDemo>

          <ComponentDemo
            title="Multiple Sections"
            description="Accordion with multiple sections"
            code={`<Accordion
  items={[
    { title: "First", content: "First section" },
    { title: "Second", content: "Second section" },
    { title: "Third", content: "Third section" }
  ]}
/>`}
          >
            <Accordion
              items={[
                { title: "First", content: "First section content" },
                { title: "Second", content: "Second section content" },
                { title: "Third", content: "Third section content" }
              ]}
            />
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 