import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Input } from "../../../components/input/Input";
import { FormField } from "../../../components/form/FormField";
import { Title } from "../../../components/typography/Title";
import { Label } from "../../../components/label/Label";

export const InputPage = () => {
  const inputProps = [
    {
      name: "type",
      type: "string",
      defaultValue: "text",
      description: "HTML input type attribute",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ];

  const formFieldProps = [
    {
      name: "label",
      type: "string",
      description: "Label text for the form field",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the field is required",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Input"
        description="A styled input component with various types and states."
        code={`import { Input } from "av1-c";

const MyComponent = () => (
  <Input 
    type="text"
    placeholder="Enter your name"
  />
);`}
      >
        <div className="w-full max-w-sm space-y-4">
          <Input placeholder="Basic input" />
          <Input type="password" placeholder="Password input" />
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={inputProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Form Field</Title>
        <p className="text-gray-400">
          Combine Input with FormField for a complete form control with label and error handling.
        </p>
        <ComponentDemo
          title="Form Field"
          description="Input wrapped in a FormField component"
          code={`import { FormField, Input } from "av1-c";

const MyComponent = () => (
  <FormField
    label="Email"
    error="Please enter a valid email"
    required
  >
    <Input type="email" />
  </FormField>
);`}
        >
          <div className="w-full max-w-sm space-y-4">
            <FormField label="Username" required>
              <Input placeholder="Enter username" />
            </FormField>
            <FormField 
              label="Email" 
              error="Please enter a valid email address"
            >
              <Input type="email" />
            </FormField>
          </div>
        </ComponentDemo>
        <div className="mt-4">
          <PropsTable props={formFieldProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Disabled State"
            description="Input in disabled state"
            code={`<Input disabled value="Disabled input" />`}
          >
            <Input disabled value="Disabled input" />
          </ComponentDemo>

          <ComponentDemo
            title="With Label"
            description="Input with associated label"
            code={`<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input id="name" />
</div>`}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 