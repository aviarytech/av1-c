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
  <Tooltip content="This is a tooltip">
    <Button>Hover me</Button>
  </Tooltip>
);`}
      >
        <div className="flex gap-4">
          <Tooltip content="This is a tooltip">
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
            title="Positions"
            description="Different tooltip positions"
            code={`<div className="space-x-4">
  <Tooltip content="Top" position="top">
    <Button>Top</Button>
  </Tooltip>
  <Tooltip content="Right" position="right">
    <Button>Right</Button>
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

          <ComponentDemo
            title="Custom Content"
            description="Tooltip with rich content"
            code={`<Tooltip
  content={
    <div className="space-y-1">
      <p className="font-semibold">Title</p>
      <p className="text-xs">Description</p>
    </div>
  }
>
  <Button>Rich Content</Button>
</Tooltip>`}
          >
            <Tooltip
              content={
                <div className="space-y-1">
                  <p className="font-semibold">Feature Info</p>
                  <p className="text-xs">Click to learn more about this feature</p>
                </div>
              }
            >
              <Button>Rich Content</Button>
            </Tooltip>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 