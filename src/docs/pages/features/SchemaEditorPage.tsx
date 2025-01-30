import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { Title } from "../../../components/typography/Title";
import { PropsTable } from "../../components/PropsTable";
import { SchemaEditor } from "../../../components/editor/SchemaEditor";

export const SchemaEditorPage = () => {
  const schemaEditorProps = [
    {
      name: "initialData",
      type: "FormData",
      description: "Initial schema data to populate the editor",
    },
    {
      name: "onSubmit",
      type: "(schema: JsonSchema) => void",
      description: "Callback when schema is submitted",
    },
    {
      name: "onValidationChange",
      type: "(isValid: boolean) => void",
      description: "Callback when validation status changes",
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <Title level={1}>Schema Editor</Title>
        <p className="mt-2 text-gray-400">
          A visual editor for creating and managing JSON schemas.
        </p>
      </div>

      <section>
        <Title level={3}>Usage</Title>
        <div className="mt-4">
          <ComponentDemo
            code={`import { SchemaEditor } from 'av1-c';

function MySchemaBuilder() {
  return (
    <SchemaEditor
      onSubmit={(schema) => {
        console.log('Schema created:', schema);
      }}
    />
  );
}`}
          >
            <div className="w-full">
              <SchemaEditor 
                onSubmit={(schema) => console.log('Schema created:', schema)}
              />
            </div>
          </ComponentDemo>
        </div>
      </section>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={schemaEditorProps} />
        </div>
      </section>
    </div>
  );
}; 