import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Container } from "../../../components/layout/Container";
import { Title } from "../../../components/typography/Title";

export const ContainerPage = () => {
  const containerProps = [
    {
      name: "maxWidth",
      type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'",
      defaultValue: "xl",
      description: "Maximum width of the container",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ];

  const sizes = [
    { size: "sm", width: "640px" },
    { size: "md", width: "768px" },
    { size: "lg", width: "1024px" },
    { size: "xl", width: "1280px" },
    { size: "2xl", width: "1536px" },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Container"
        description="A responsive container component that centers content and sets max-width."
        code={`import { Container } from "av1-c";

const MyComponent = () => (
  <Container maxWidth="lg">
    Content goes here
  </Container>
);`}
      >
        <div className="w-full space-y-6">
          {sizes.map(({ size, width }) => (
            <div key={size} className="relative">
              <Container maxWidth={size as "xl" | "sm" | "md" | "lg" | "2xl" | "full"} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{size}</span>
                  <span className="text-sm text-gray-400">max-width: {width}</span>
                </div>
                <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
              </Container>
              {/* Visual width indicator */}
              <div className="absolute -left-4 right-0 top-1/2 -z-10 border-t border-dashed border-gray-700" />
            </div>
          ))}
          <div className="relative">
            <Container maxWidth="full" className="bg-gray-800 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">full</span>
                <span className="text-sm text-gray-400">width: 100%</span>
              </div>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
            </Container>
          </div>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={containerProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-1 gap-4">
          <ComponentDemo
            title="Nested Containers"
            description="Containers can be nested for complex layouts"
            code={`<Container maxWidth="xl" className="space-y-4">
  <Title level={2}>Main Content</Title>
  <Container maxWidth="md" className="bg-gray-800 p-4">
    <p>Narrower content section</p>
  </Container>
</Container>`}
          >
            <Container maxWidth="xl" className="space-y-4">
              <Title level={2}>Main Content</Title>
              <Container maxWidth="md" className="bg-gray-800 p-4">
                <p className="text-gray-400">
                  This content is constrained to a medium width container,
                  while its parent uses the extra-large width.
                </p>
              </Container>
            </Container>
          </ComponentDemo>

          <ComponentDemo
            title="Responsive Behavior"
            description="Containers are responsive by default"
            code={`<Container maxWidth="lg" className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-gray-800 p-4">Column 1</div>
    <div className="bg-gray-800 p-4">Column 2</div>
  </div>
</Container>`}
          >
            <Container maxWidth="lg" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 text-center">Column 1</div>
                <div className="bg-gray-800 p-4 text-center">Column 2</div>
              </div>
            </Container>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 