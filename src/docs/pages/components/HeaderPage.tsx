import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Header, HeaderContent, HeaderNav, HeaderNavItem } from "../../../components/header/Header";
import { Title } from "../../../components/typography/Title";
import { Button } from "../../../components/button/Button";
import { Input } from "../../../components/input/Input";

export const HeaderPage = () => {
  const headerProps = [
    {
      name: "position",
      type: "'fixed' | 'sticky' | 'static'",
      defaultValue: "static",
      description: "Position of the header",
    },
    {
      name: "bordered",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show bottom border",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Header"
        description="A responsive header component for navigation and branding."
        code={`import { Header, HeaderContent, HeaderNav } from "av1-c";

const MyComponent = () => (
  <Header>
    <HeaderContent>
      <div>Logo</div>
      <HeaderNav>
        <HeaderNavItem>Home</HeaderNavItem>
        <HeaderNavItem>About</HeaderNavItem>
      </HeaderNav>
    </HeaderContent>
  </Header>
);`}
      >
        <div className="w-full">
          <Header className="relative">
            <HeaderContent>
              <div className="text-xl font-bold">Logo</div>
              <HeaderNav>
                <HeaderNavItem>Home</HeaderNavItem>
                <HeaderNavItem>About</HeaderNavItem>
                <HeaderNavItem>Contact</HeaderNavItem>
              </HeaderNav>
              <Button className="ml-auto">Sign In</Button>
            </HeaderContent>
          </Header>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={headerProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-1 gap-4">
          <ComponentDemo
            title="With Search"
            description="Header with search and actions"
            code={`<Header>
  <HeaderContent>
    <div>Logo</div>
    <div className="flex-1 mx-4">
      <Input placeholder="Search..." />
    </div>
    <Button>Sign In</Button>
  </HeaderContent>
</Header>`}
          >
            <Header className="relative">
              <HeaderContent>
                <div className="text-xl font-bold">Logo</div>
                <div className="flex-1 mx-4">
                  <Input placeholder="Search..." />
                </div>
                <Button>Sign In</Button>
              </HeaderContent>
            </Header>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 