import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { FormField } from "../../../components/form/FormField";
import { Title } from "../../../components/typography/Title";
import { Input } from "../../../components/input/Input";
import { Select } from "../../../components/select/Select";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { Label } from "../../../components/label/Label";

export const FormFieldPage = () => {
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
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Form control component(s)",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Form Field"
        description="A wrapper component for form controls that provides consistent layout, labels, and error handling."
        code={`import { FormField, Input } from "av1-c";

const MyComponent = () => (
  <FormField
    label="Email"
    required
    error="Please enter a valid email address"
  >
    <Input type="email" />
  </FormField>
);`}
      >
        <div className="w-full max-w-sm space-y-6">
          <FormField
            label="Email"
            required
            error="Please enter a valid email address"
          >
            <Input type="email" />
          </FormField>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={formFieldProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="With Different Controls"
            description="FormField works with various form controls"
            code={`<div className="space-y-4">
  <FormField label="Name">
    <Input placeholder="Enter your name" />
  </FormField>
  
  <FormField label="Country">
    <Select>
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
    </Select>
  </FormField>
  
  <FormField>
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">
        I accept the terms
      </Label>
    </div>
  </FormField>
</div>`}
          >
            <div className="space-y-4">
              <FormField label="Name">
                <Input placeholder="Enter your name" />
              </FormField>
              
              <FormField label="Country">
                <Select>
                  <option value="">Select a country</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                </Select>
              </FormField>
              
              <FormField>
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">
                    I accept the terms
                  </Label>
                </div>
              </FormField>
            </div>
          </ComponentDemo>

          <ComponentDemo
            title="Error States"
            description="FormField with different error states"
            code={`<div className="space-y-4">
  <FormField
    label="Username"
    required
    error="Username is required"
  >
    <Input />
  </FormField>

  <FormField
    label="Password"
    error="Password must be at least 8 characters"
  >
    <Input 
      type="password"
      className="border-red-500"
    />
  </FormField>
</div>`}
          >
            <div className="space-y-4">
              <FormField
                label="Username"
                required
                error="Username is required"
              >
                <Input />
              </FormField>

              <FormField
                label="Password"
                error="Password must be at least 8 characters"
              >
                <Input 
                  type="password"
                  className="border-red-500"
                />
              </FormField>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 