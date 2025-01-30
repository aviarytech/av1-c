import * as React from "react";
import { Card } from "../../components/card/Card";
import { Title } from "../../components/typography/Title";
import { CodeEditor } from "../../components/editor/CodeEditor";
import { CopyButton } from "./CopyButton";

interface ComponentDemoProps {
  title?: string;
  description?: string;
  code: string;
  children?: React.ReactNode;
  hidePreview?: boolean;
}

export const ComponentDemo: React.FC<ComponentDemoProps> = ({
  title,
  description,
  code,
  children,
  hidePreview = false,
}) => {
  return (
    <section className="space-y-4">
      {(title || description) && (
        <div>
          {title && <Title level={2}>{title}</Title>}
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
      )}

      {!hidePreview && children && (
        <Card>
          <Card.Content className="flex justify-center p-8 border-b border-gray-200 dark:border-gray-800">
            {children}
          </Card.Content>
          <Card.Content className="relative">
            <div className="absolute right-4 top-4 z-10">
              <CopyButton value={code} />
            </div>
            <CodeEditor
              value={code}
              language="typescript"
              readOnly
              className="relative"
            />
          </Card.Content>
        </Card>
      )}

      {hidePreview && (
        <Card>
          <Card.Content className="relative">
            <div className="absolute right-4 top-4 z-10">
              <CopyButton value={code} />
            </div>
            <CodeEditor
              value={code}
              language="typescript"
              readOnly
              className="relative"
            />
          </Card.Content>
        </Card>
      )}
    </section>
  );
}; 