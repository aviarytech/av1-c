import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Dropdown, DropdownItem } from "../../../components/dropdown/Dropdown";
import { Title } from "../../../components/typography/Title";
import { Button } from "../../../components/button/Button";

export const DropdownPage = () => {
  const dropdownProps = [
    {
      name: "trigger",
      type: "ReactNode",
      required: true,
      description: "The element that triggers the dropdown",
    },
    {
      name: "align",
      type: "'left' | 'right'",
      defaultValue: "left",
      description: "The alignment of the dropdown menu",
    },
    {
      name: "direction",
      type: "'down' | 'up'",
      defaultValue: "down",
      description: "Direction for the menu to expand",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the dropdown menu",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Dropdown"
        description="A dropdown menu component that can be triggered by any element."
        code={`import { Dropdown, DropdownItem } from "av1-c";

const MyComponent = () => (
  <Dropdown 
    trigger={<Button>Open Menu</Button>}
    align="left"
  >
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Logout</DropdownItem>
  </Dropdown>
);`}
      >
        <Dropdown
          trigger={<Button>Open Menu</Button>}
        >
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </Dropdown>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={dropdownProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Right Aligned"
            description="Dropdown menu aligned to the right"
            code={`<Dropdown
  trigger={<Button>Right Menu</Button>}
  align="right"
>
  <DropdownItem>Option 1</DropdownItem>
  <DropdownItem>Option 2</DropdownItem>
</Dropdown>`}
          >
            <div className="text-right">
              <Dropdown
                trigger={<Button>Right Menu</Button>}
                align="right"
              >
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
              </Dropdown>
            </div>
          </ComponentDemo>

          <ComponentDemo
            title="Custom Trigger"
            description="Using a custom trigger element"
            code={`<Dropdown
  trigger={
    <Button variant="outline">
      Custom Trigger
    </Button>
  }
>
  <DropdownItem>Action</DropdownItem>
</Dropdown>`}
          >
            <Dropdown
              trigger={
                <Button variant="outline">
                  Custom Trigger
                </Button>
              }
            >
              <DropdownItem>Action</DropdownItem>
            </Dropdown>
          </ComponentDemo>

          <ComponentDemo
            title="Upward Direction"
            description="Dropdown menu that expands upward"
            code={`<Dropdown
  trigger={<Button>Upward Menu</Button>}
  direction="up"
>
  <DropdownItem>Option 1</DropdownItem>
  <DropdownItem>Option 2</DropdownItem>
</Dropdown>`}
          >
            <div className="text-center mt-16">
              <Dropdown
                trigger={<Button>Upward Menu</Button>}
                direction="up"
              >
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
              </Dropdown>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 