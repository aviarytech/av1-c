import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Breadcrumb } from "../../../components/navigation/Breadcrumb";
import { Title } from "../../../components/typography/Title";

export const BreadcrumbPage = () => {
  const breadcrumbProps = [
    {
      name: "items",
      type: "Array<{ label: string; href?: string; }>",
      required: true,
      description: "Array of breadcrumb items",
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
        title="Breadcrumb"
        description="A navigation component showing the current page location within a hierarchy."
        code={`import { Breadcrumb } from "av1-c";

const MyComponent = () => (
  <Breadcrumb
    items={[
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Categories" },
    ]}
  />
);`}
      >
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Categories" },
          ]}
        />
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={breadcrumbProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-1 gap-4">
          <ComponentDemo
            title="With Icons"
            description="Breadcrumb with custom content"
            code={`<Breadcrumb
  items={[
    { label: "Dashboard", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: "Profile" },
  ]}
/>`}
          >
            <Breadcrumb
              items={[
                { label: "Dashboard", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Profile" },
              ]}
            />
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 