import React from 'react';
import { Title } from '../../components/typography/Title';
import { Card } from '../../components/card/Card';
import { ComponentDemo } from '../components/ComponentDemo';
import { Code } from '../../components/typography/Code';

export const GettingStartedPage = () => {
  return (
    <div className="space-y-12">
      <div>
        <Title level={1}>Getting Started</Title>
        <p className="mt-2 text-gray-400">
          Learn how to install and start using AV1-C in your project.
        </p>
      </div>

      <Card>
        <Card.Header>
          <Title level={2}>Installation</Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <p className="text-gray-400">
              Install AV1-C using your preferred package manager:
            </p>
            <Code>
              npm install av1-c
            </Code>
            <p className="text-gray-400 mt-4">
              Or using yarn:
            </p>
            <Code>
              yarn add av1-c
            </Code>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Quick Start</Title>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-400 mb-4">
            Here's a simple example using the Schema Editor component:
          </p>

          <ComponentDemo
            code={`import { SchemaEditor } from 'av1-c';

function App() {
  return (
    <SchemaEditor
      onSubmit={(schema) => {
        console.log('Created schema:', schema);
      }}
    />
  );
}`}
          />

          <div className="mt-6">
            <p className="text-gray-400">
              Check out our <a href="/features" className="text-blue-400 hover:text-blue-300">Features</a> page 
              for more detailed documentation and advanced usage examples.
            </p>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Need Help?</Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <p className="text-gray-400">
              If you have questions or run into issues:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>
                <a href="https://github.com/aviarytech/av1-c/issues" className="text-blue-400 hover:text-blue-300">
                  Open an issue
                </a>
              </li>
              <li>
                <a href="https://discord.gg/aviarytech" className="text-blue-400 hover:text-blue-300">
                  Join our Discord
                </a>
              </li>
              <li>
                <a href="https://blog.aviarytech.com" className="text-blue-400 hover:text-blue-300">
                  Read our blog
                </a>
              </li>
            </ul>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}; 