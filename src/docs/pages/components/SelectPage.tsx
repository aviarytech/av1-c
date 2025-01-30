import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Select } from "../../../components/select/Select";
import { FormField } from "../../../components/form/FormField";
import { Title } from "../../../components/typography/Title";

export const SelectPage = () => {
  const selectProps = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the select is disabled",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Select"
        description="A styled select component for choosing from a list of options."
        code={`import { Select } from "av1-c";

const MyComponent = () => (
  <Select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
);`}
      >
        <div className="w-full max-w-sm">
          <Select>
            <option value="">Select an option...</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Select>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={selectProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="With Form Field"
            description="Select with label and error handling"
            code={`<FormField label="Choose option" error="Please select an option">
  <Select>
    <option value="">Select...</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </Select>
</FormField>`}
          >
            <FormField 
              label="Choose option" 
              error="Please select an option"
            >
              <Select>
                <option value="">Select...</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </Select>
            </FormField>
          </ComponentDemo>

          <ComponentDemo
            title="Disabled State"
            description="Select in disabled state"
            code={`<Select disabled>
  <option>Disabled select</option>
</Select>`}
          >
            <Select disabled>
              <option>Disabled select</option>
            </Select>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 