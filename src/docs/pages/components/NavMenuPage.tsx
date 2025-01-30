import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { NavMenu, NavMenuItem } from "../../../components/navigation/NavMenu";
import { Title } from "../../../components/typography/Title";
import { Button } from "../../../components/button/Button";
import { User, Settings, ChevronDown } from "lucide-react";

export const NavMenuPage = () => {
  const navMenuProps = [
    {
      name: "trigger",
      type: "ReactNode",
      required: true,
      description: "Element that triggers the menu",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Menu items",
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
        title="Navigation Menu"
        description="A dropdown navigation menu component."
        code={`import { NavMenu, NavMenuItem } from "av1-c";

const MyComponent = () => (
  <NavMenu trigger="Settings">
    <NavMenuItem>Profile</NavMenuItem>
    <NavMenuItem>Preferences</NavMenuItem>
    <NavMenuItem>Logout</NavMenuItem>
  </NavMenu>
);`}
      >
        <div className="flex justify-center">
          <NavMenu trigger="Settings">
            <NavMenuItem>Profile</NavMenuItem>
            <NavMenuItem>Preferences</NavMenuItem>
            <NavMenuItem>Logout</NavMenuItem>
          </NavMenu>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={navMenuProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="With Icons"
            description="Navigation menu with icons"
            code={`<NavMenu trigger="Account">
  <NavMenuItem>
    <User className="mr-2 h-4 w-4" />
    Profile
  </NavMenuItem>
  <NavMenuItem>
    <Settings className="mr-2 h-4 w-4" />
    Settings
  </NavMenuItem>
</NavMenu>`}
          >
            <div className="flex justify-center">
              <NavMenu trigger="Account">
                <NavMenuItem>
                  <span className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </span>
                </NavMenuItem>
                <NavMenuItem>
                  <span className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </span>
                </NavMenuItem>
              </NavMenu>
            </div>
          </ComponentDemo>

          <ComponentDemo
            title="Custom Trigger"
            description="Menu with custom trigger element"
            code={`<NavMenu
  trigger={
    <Button variant="outline">
      Menu <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  }
>
  <NavMenuItem>Option 1</NavMenuItem>
  <NavMenuItem>Option 2</NavMenuItem>
</NavMenu>`}
          >
            <div className="flex justify-center">
              <NavMenu
                trigger={
                  <Button variant="outline">
                    Menu <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                }
              >
                <NavMenuItem>Option 1</NavMenuItem>
                <NavMenuItem>Option 2</NavMenuItem>
              </NavMenu>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 