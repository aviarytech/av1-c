import React from 'react';
import { Title } from '../../components/typography/Title';
import { Card } from '../../components/card/Card';
import { SchemaEditor } from '../../components/editor/SchemaEditor';

export const FeaturesPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <Title level={1}>Schema Editor</Title>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Create and manage Verifiable Credential schemas with our visual editor, featuring live JSON-LD validation.
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <Title level={2} className="mb-3">Field Types</Title>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>String</li>
              <li>Number</li>
              <li>Boolean</li>
              <li>Object</li>
              <li>Array</li>
            </ul>
          </div>

          <div>
            <Title level={2} className="mb-3">Advanced Features</Title>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>Nested objects and arrays</li>
              <li>Field descriptions and validation</li>
              <li>JSON-LD context management</li>
              <li>Dark mode support</li>
              <li>TypeScript integration</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="text-blue-400 font-medium">Pro Tip:</span> Use the live preview to verify your schema's 
            compatibility with Verifiable Credentials standards.
          </p>
        </div>

        <div className="mt-8">
          <SchemaEditor
            onSubmit={(schema) => console.log('Schema created:', schema)}
            onValidationChange={(isValid) => console.log('Schema validation:', isValid)}
          />
        </div>
      </Card>
    </div>
  );
}; 