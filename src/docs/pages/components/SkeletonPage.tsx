import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Skeleton } from "../../../components/loading/Skeleton";
import { Title } from "../../../components/typography/Title";
import { Card } from "../../../components/card/Card";

export const SkeletonPage = () => {
  const skeletonProps = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for styling",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Skeleton"
        description="A placeholder loading state for content that is still loading."
        code={`import { Skeleton } from "av1-c";

const MyComponent = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
);`}
      >
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={skeletonProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Card Loading"
            description="Skeleton loading state for a card"
            code={`<Card>
  <Card.Header>
    <Skeleton className="h-6 w-[180px]" />
  </Card.Header>
  <Card.Content>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
  </Card.Content>
</Card>`}
          >
            <Card>
              <Card.Header>
                <Skeleton className="h-6 w-[180px]" />
              </Card.Header>
              <Card.Content>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              </Card.Content>
            </Card>
          </ComponentDemo>

          <ComponentDemo
            title="Profile Loading"
            description="Skeleton for a profile section"
            code={`<div className="flex gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[120px]" />
    <Skeleton className="h-3 w-[180px]" />
  </div>
</div>`}
          >
            <div className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[180px]" />
              </div>
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 