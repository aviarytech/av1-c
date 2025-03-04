import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Card } from "../../../components/card/Card";
import { Title } from "../../../components/typography/Title";
import { Button } from "../../../components/button/Button";

export const CardPage = () => {
  const cardProps = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the card",
    },
  ];

  const cardHeaderProps = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the header",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Card"
        description="A container component for grouping related content."
        code={`import { Card } from "av1-c";

const MyComponent = () => (
  <Card>
    <Card.Header>
      <Card.Title>Card Title</Card.Title>
      <Card.Description>Optional card description</Card.Description>
    </Card.Header>
    <Card.Content>
      Main content goes here
    </Card.Content>
    <Card.Footer>
      <Button>Action</Button>
    </Card.Footer>
  </Card>
);`}
      >
        <Card className="w-[400px]">
          <Card.Header>
            <Card.Title>Example Card</Card.Title>
            <Card.Description>
              This is an example of a card with all its subcomponents
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-400">
              Cards can contain any content, including text, images, and other components.
            </p>
          </Card.Content>
          <Card.Footer>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </Card.Footer>
        </Card>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4 space-y-8">
          <div>
            <h4 className="text-sm font-medium mb-3">Card</h4>
            <PropsTable props={cardProps} />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Card.Header</h4>
            <PropsTable props={cardHeaderProps} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Simple Card"
            description="Basic card with just content"
            code={`<Card>
  <Card.Content>
    Simple content
  </Card.Content>
</Card>`}
          >
            <Card className="w-full">
              <Card.Content>
                <p className="text-gray-400">Simple content example</p>
              </Card.Content>
            </Card>
          </ComponentDemo>

          <ComponentDemo
            title="With Footer"
            description="Card with actions in the footer"
            code={`<Card>
  <Card.Content>Content</Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>`}
          >
            <Card className="w-full">
              <Card.Content>
                <p className="text-gray-400">Card with footer actions</p>
              </Card.Content>
              <Card.Footer>
                <Button size="sm">Action</Button>
              </Card.Footer>
            </Card>
          </ComponentDemo>
          
          <ComponentDemo
            title="Plain Card"
            description="Card with direct content (no Card.Content)"
            code={`<Card>
  Direct content with no Card.Content wrapper
</Card>`}
          >
            <Card className="w-full">
              Direct content without using Card.Content
            </Card>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 