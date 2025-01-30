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
      name: "className",
      type: "string",
      description: "Additional CSS classes for the dropdown menu",
    },
    {
      name: "direction",
      type: "'up' | 'down'",
      defaultValue: "down",
      description: "The direction the dropdown opens",
    },
  ];

  const dropdownItemProps = [
    {
      name: "href",
      type: "string",
      description: "Optional URL for link items",
    },
    {
      name: "onClick",
      type: "() => void",
      description: "Click handler for the item",
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
        title="Dropdown"
        description="An accessible dropdown menu component powered by Headless UI."
        code={`import { Dropdown, DropdownItem } from "av1-c";

const MyComponent = () => (
  <Dropdown trigger={<Button>Open Menu</Button>}>
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Logout</DropdownItem>
  </Dropdown>
);`}
      >
        <Dropdown trigger={<Button>Open Menu</Button>}>
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
  trigger={<Button>Long Button with a Right Menu</Button>}
  align="right"
>
  <DropdownItem>Option 1</DropdownItem>
  <DropdownItem>Option 2</DropdownItem>
</Dropdown>`}
          >
            <div className="text-right">
              <Dropdown
                trigger={<Button>Long Button with a Right Menu</Button>}
                align="right"
              >
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
              </Dropdown>
            </div>
          </ComponentDemo>

          <ComponentDemo
            title="With Links"
            description="Dropdown items as links"
            code={`<Dropdown trigger={<Button>Navigation</Button>}>
  <DropdownItem href="https://google.com">
    Google
  </DropdownItem>
  <DropdownItem href="/settings">
    Settings
  </DropdownItem>
  <DropdownItem onClick={() => alert('Clicked!')}>
    Action Button
  </DropdownItem>
</Dropdown>`}
          >
            <Dropdown trigger={<Button>Navigation</Button>}>
              <DropdownItem href="https://google.com">
                Google
              </DropdownItem>
              <DropdownItem href="/settings">
                Settings
              </DropdownItem>
              <DropdownItem onClick={() => alert('Clicked!')}>
                Action Button
              </DropdownItem>
            </Dropdown>
          </ComponentDemo>

          <ComponentDemo
            title="With Icons"
            description="Dropdown items with icons"
            code={`<Dropdown trigger={<Button>User Menu</Button>}>
  <DropdownItem>
    <div className="flex items-center gap-2">
      <img 
        src="https://github.com/github.png"
        alt="GitHub"
        className="h-5 w-5 rounded-full"
      />
      GitHub
    </div>
  </DropdownItem>
  <DropdownItem>
    <div className="flex items-center gap-2">
      <img 
        src="https://avatars.githubusercontent.com/u/6412038?s=200&v=4"
        alt="React"
        className="h-5 w-5 rounded-full"
      />
      React
    </div>
  </DropdownItem>
</Dropdown>`}
          >
            <Dropdown trigger={<Button>User Menu</Button>}>
              <DropdownItem>
                <div className="flex items-center gap-2">
                  <img 
                    src="https://github.com/github.png"
                    alt="GitHub"
                    className="h-5 w-5 rounded-full"
                  />
                  GitHub
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className="flex items-center gap-2">
                  <img 
                    src="https://avatars.githubusercontent.com/u/6412038?s=200&v=4"
                    alt="React"
                    className="h-5 w-5 rounded-full"
                  />
                  React
                </div>
              </DropdownItem>
            </Dropdown>
          </ComponentDemo>

          <ComponentDemo
            title="Upward Direction"
            description="Dropdown that opens upward"
            code={`<Dropdown
  trigger={<Button>Upward Menu</Button>}
  direction="up"
>
  <DropdownItem>Option 1</DropdownItem>
  <DropdownItem>Option 2</DropdownItem>
</Dropdown>`}
          >
            <div className="mt-32">
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

      <section>
        <Title level={3}>DropdownItem Properties</Title>
        <div className="mt-4">
          <PropsTable props={dropdownItemProps} />
        </div>
      </section>
    </div>
  );
}; 