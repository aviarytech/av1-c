import React from 'react';
import { Title } from '../../components/typography/Title';
import { Card } from '../../components/card/Card';
import { ComponentDemo } from '../components/ComponentDemo';
import { CodeEditor } from '../../components/editor/CodeEditor';
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
          <Title level={2}>Tailwind CSS Configuration</Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <p className="text-gray-400">
              AV1-C uses Tailwind CSS for styling. You'll need to configure your Tailwind CSS to scan the component classes in the package:
            </p>
            <CodeEditor
              value={`// tailwind.config.js
module.exports = {
  content: [
    // ... your other content paths
    "./node_modules/av1-c/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of your config
}`}
              language="javascript"
            />
            <p className="text-gray-400 mt-4">
              This ensures that all the necessary styles for AV1-C components are included in your final CSS bundle.
            </p>
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
          <Title level={2}>Theme Support</Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <p className="text-gray-400">
              AV1-C components automatically support both light and dark mode. For the best experience, wrap your application with the ThemeProvider:
            </p>
            <CodeEditor
              value={`import { ThemeProvider } from 'av1-c';

function App() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  );
}`}
              language="typescript"
            />
            
            <p className="text-gray-400 mt-4">
              The ThemeProvider respects user system preferences while also allowing manual theme selection:
            </p>
            
            <CodeEditor
              value={`import { useTheme } from 'av1-c';

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}`}
              language="typescript"
            />
            
            <p className="text-gray-400 mt-4">
              The ThemeProvider offers three theme options:
            </p>
            
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li><code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">light</code> - Forces light mode</li>
              <li><code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">dark</code> - Forces dark mode</li>
              <li><code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">system</code> - Follows the user's system preference (default)</li>
            </ul>
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