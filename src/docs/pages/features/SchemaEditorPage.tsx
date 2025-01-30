import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { Title } from "../../../components/typography/Title";
import { Card } from "../../../components/card/Card";
import { Code } from "../../../components/typography/Code";

export const SchemaEditorPage = () => {
  return (
    <div className="space-y-12">
      <div>
        <Title level={1}>Schema Editor</Title>
        <p className="mt-2 text-gray-400">
          A powerful visual editor for creating and managing Verifiable Credential schemas.
        </p>
      </div>

      <Card>
        <Card.Header>
          <Title level={2}>Overview</Title>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-400">
            The Schema Editor provides both a form-based and JSON editor interface for creating 
            JSON-LD compatible credential templates. It includes real-time preview and validation 
            to ensure your schemas are compatible with Verifiable Credentials standards.
          </p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Installation</Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2">
            <p className="text-gray-400 mb-2">
              The Schema Editor is included in the main package:
            </p>
            <Code>
              npm install @aviarytech/av1-c
            </Code>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Basic Usage</Title>
        </Card.Header>
        <Card.Content>
          <ComponentDemo
            code={`import { SchemaEditor } from '@aviarytech/av1-c';

function MySchemaBuilder() {
  return (
    <div className="container mx-auto">
      <SchemaEditor />
    </div>
  );
}`}
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Features</Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-200">Field Types</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>String</li>
                <li>Number</li>
                <li>Boolean</li>
                <li>Object</li>
                <li>Array</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-200">Capabilities</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Visual form builder</li>
                <li>JSON-LD context management</li>
                <li>Live preview with normalization</li>
                <li>Dark mode support</li>
                <li>TypeScript integration</li>
              </ul>
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Advanced Features</Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Field Properties</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Nested objects and arrays</li>
              <li>Field descriptions and comments</li>
              <li>Required field validation</li>
              <li>Example values</li>
              <li>JSON-LD context mapping</li>
            </ul>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded">
              <h4 className="text-blue-300 font-medium mb-2">Pro Tip</h4>
              <p className="text-gray-400">
                Use the JSON-LD normalization preview to ensure your credential template is compatible with 
                Verifiable Credentials standards. The preview will show a green indicator when your schema 
                is valid and can be properly normalized.
              </p>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}; 