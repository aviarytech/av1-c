import * as React from "react";
import { ComponentDemo } from "../components/ComponentDemo";
import { Title } from "../../components/typography/Title";
import { CodeEditor } from "../../components/editor/CodeEditor";
import { Code } from "../../components/typography/Code";
import { Card } from "../../components/card/Card";

export const GettingStartedPage = () => {
  return (
    <div className="space-y-12">
      <div>
        <Title level={1}>Getting Started</Title>
        <p className="mt-2 text-gray-400">
          AV1 Components is a React component library built with TypeScript and Tailwind CSS.
        </p>
      </div>

      <Card>
        <Card.Header>
          <Title level={2}>Installation</Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2">
            <p className="text-gray-400 mb-2">
              Install AV1 Components and its peer dependencies:
            </p>
            <Code>
              npm install av1-c tailwindcss @tailwindcss/forms lucide-react
            </Code>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Tailwind Configuration</Title>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-400">
            Add the following to your tailwind.config.js:
          </p>
          <ComponentDemo
            code={`// tailwind.config.js
module.exports = {
  content: [
    // ... your content paths
    "./node_modules/av1-c/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
  ],
}`}
            hidePreview
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Usage</Title>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-400">
            Import and use components in your React application:
          </p>
          <ComponentDemo
            code={`import { Button, Input, FormField } from '@aviarytech/av1-c';

function App() {
  return (
    <div className="p-4">
      <FormField label="Email">
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <Button className="mt-4">
        Submit
      </Button>
    </div>
  );
}`}
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Dark Mode</Title>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-600 dark:text-gray-400">
            AV1 Components supports dark mode out of the box. Add the 'dark' class to your root element to enable dark mode:
          </p>
          <ComponentDemo
            code={`// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Or set it based on user preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}`}
            hidePreview
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>TypeScript</Title>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-600 dark:text-gray-400">
            AV1 Components is written in TypeScript and includes type definitions. No additional setup is required.
          </p>
          <ComponentDemo
            code={`import { Button } from '@aviarytech/av1-c';

// Props are fully typed
const MyComponent = () => (
  <Button
    variant="primary"
    size="lg"
    onClick={(e: React.MouseEvent) => {
      console.log('Button clicked');
    }}
  >
    Click me
  </Button>
);`}
            hidePreview
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Browser Support</Title>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-600 dark:text-gray-400">
            AV1 Components supports all modern browsers (Chrome, Firefox, Safari, Edge).
            For older browsers, you may need to include appropriate polyfills.
          </p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Title level={2}>Contributing</Title>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-400">
            We welcome contributions! Please check out our{" "}
            <a 
              href="https://github.com/aviarytech/av1-c" 
              className="text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
            {" "}for guidelines.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}; 