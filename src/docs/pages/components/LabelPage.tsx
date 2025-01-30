import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Label } from "../../../components/label/Label";
import { Title } from "../../../components/typography/Title";
import { Input } from "../../../components/input/Input";
import { Checkbox } from "../../../components/checkbox/Checkbox";

export const LabelPage = () => {
  const labelProps = [
    {
      name: "htmlFor",
      type: "string",
      description: "ID of the form control this label is bound to",
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
        title="Label"
        description="A label component for form controls with consistent styling."
        code={`import { Label } from "av1-c";

const MyComponent = () => (
  <div className="space-y-2">
    <Label htmlFor="email">
      Email Address <span className="text-red-500">*</span>
    </Label>
    <Input id="email" type="email" required />
  </div>
);`}
      >
        <div className="w-full max-w-sm space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input id="email" type="email" required />
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={labelProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="With Different Controls"
            description="Label used with various form controls"
            code={`<div className="space-y-4">
  <div>
    <Label htmlFor="name">Full Name</Label>
    <Input id="name" className="mt-1" />
  </div>

  <div className="flex items-center gap-2">
    <Checkbox id="newsletter" />
    <Label htmlFor="newsletter">
      Subscribe to newsletter
    </Label>
  </div>
</div>`}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" className="mt-1" />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="newsletter" />
                <Label htmlFor="newsletter">
                  Subscribe to newsletter
                </Label>
              </div>
            </div>
          </ComponentDemo>

          <ComponentDemo
            title="Required Fields"
            description="Labels with required and optional indicators"
            code={`<div className="space-y-4">
  <div>
    <Label htmlFor="username">
      Username <span className="text-red-500">*</span>
    </Label>
    <Input id="username" className="mt-1" required />
  </div>

  <div>
    <Label htmlFor="bio">
      Bio <span className="text-gray-400">(optional)</span>
    </Label>
    <Input id="bio" className="mt-1" />
  </div>
</div>`}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input id="username" className="mt-1" required />
              </div>

              <div>
                <Label htmlFor="bio">
                  Bio <span className="text-gray-400">(optional)</span>
                </Label>
                <Input id="bio" className="mt-1" />
              </div>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 