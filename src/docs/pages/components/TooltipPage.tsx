import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Tooltip } from "../../../components/tooltip/Tooltip";
import { Title } from "../../../components/typography/Title";
import { Button } from "../../../components/button/Button";

export const TooltipPage = () => {
  const tooltipProps = [
    {
      name: "content",
      type: "ReactNode",
      required: true,
      description: "Content to display in the tooltip",
    },
    {
      name: "position",
      type: "'top' | 'right' | 'bottom' | 'left'",
      defaultValue: "top",
      description: "Position of the tooltip relative to the trigger",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the tooltip",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Tooltip"
        description="A tooltip component for displaying additional information on hover."
        code={`import { Tooltip } from "av1-c";

const MyComponent = () => (
  <Tooltip content="Simple tooltip">
    <Button>Hover me</Button>
  </Tooltip>
);`}
      >
        <div className="flex gap-4">
          <Tooltip content="Simple tooltip">
            <Button>Hover me</Button>
          </Tooltip>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={tooltipProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Custom Content"
            description="Tooltip with rich content"
            code={`<Tooltip 
  content={
    <div className="space-y-2">
      <h3 className="font-semibold">Custom Content</h3>
      <p>Tooltip with rich content including multiple paragraphs and formatting.</p>
      <p className="text-gray-500 dark:text-gray-400">
        Supporting text with different styles
      </p>
    </div>
  }
>
  <Button>Rich Content</Button>
</Tooltip>`}
          >
            <Tooltip
              content={
                <div className="space-y-2">
                  <h3 className="font-semibold">Custom Content</h3>
                  <p>Tooltip with rich content including multiple paragraphs and formatting.</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Supporting text with different styles
                  </p>
                </div>
              }
            >
              <Button>Rich Content</Button>
            </Tooltip>
          </ComponentDemo>

          <ComponentDemo
            title="Different Positions"
            description="Tooltips can be positioned in different directions"
            code={`<div className="flex gap-4">
  <Tooltip content="Top tooltip" position="top">
    <Button>Top</Button>
  </Tooltip>
  <Tooltip content="Right tooltip" position="right">
    <Button>Right</Button>
  </Tooltip>
  <Tooltip content="Bottom tooltip" position="bottom">
    <Button>Bottom</Button>
  </Tooltip>
  <Tooltip content="Left tooltip" position="left">
    <Button>Left</Button>
  </Tooltip>
</div>`}
          >
            <div className="flex gap-4">
              <Tooltip content="Top tooltip" position="top">
                <Button>Top</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" position="right">
                <Button>Right</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button>Bottom</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" position="left">
                <Button>Left</Button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 