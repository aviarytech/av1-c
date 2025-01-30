import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { FormField } from "../../../components/form/FormField";
import { Title } from "../../../components/typography/Title";
import { Label } from "../../../components/label/Label";

export const CheckboxPage = () => {
  const checkboxProps = [
    {
      name: "checked",
      type: "boolean",
      description: "The checked state of the checkbox",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the checkbox is disabled",
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
        title="Checkbox"
        description="A checkbox component for multiple choice selections."
        code={`import { Checkbox } from "av1-c";

const MyComponent = () => (
  <div className="flex items-center gap-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms</Label>
  </div>
);`}
      >
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={checkboxProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="With Form Field"
            description="Checkbox in a form field with error"
            code={`<FormField error="This field is required">
  <div className="flex items-center gap-2">
    <Checkbox id="subscribe" />
    <Label htmlFor="subscribe">Subscribe to newsletter</Label>
  </div>
</FormField>`}
          >
            <FormField error="This field is required">
              <div className="flex items-center gap-2">
                <Checkbox id="subscribe" />
                <Label htmlFor="subscribe">Subscribe to newsletter</Label>
              </div>
            </FormField>
          </ComponentDemo>

          <ComponentDemo
            title="States"
            description="Different checkbox states"
            code={`<div className="space-y-2">
  <div className="flex items-center gap-2">
    <Checkbox checked />
    <Label>Checked</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox disabled />
    <Label>Disabled</Label>
  </div>
</div>`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox checked />
                <Label>Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox disabled />
                <Label>Disabled</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked disabled />
                <Label>Checked & Disabled</Label>
              </div>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 