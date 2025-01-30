import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { ErrorState } from "../../../components/error/ErrorState";
import { Title } from "../../../components/typography/Title";
import { Button } from "../../../components/button/Button";

export const ErrorStatePage = () => {
  const errorStateProps = [
    {
      name: "title",
      type: "string",
      required: true,
      description: "Title of the error message",
    },
    {
      name: "description",
      type: "string",
      description: "Detailed error description",
    },
    {
      name: "action",
      type: "ReactNode",
      description: "Action button or link",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Error State"
        description="A component for displaying error states and messages."
        code={`import { ErrorState } from "av1-c";

const MyComponent = () => (
  <ErrorState
    title="Something went wrong"
    description="Please try again later"
    action={<Button>Retry</Button>}
  />
);`}
      >
        <ErrorState
          title="Something went wrong"
          description="Please try again later or contact support if the problem persists."
          action={<Button>Retry</Button>}
        />
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={errorStateProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="No Action"
            description="Error state without action button"
            code={`<ErrorState
  title="404 Not Found"
  description="The page you're looking for doesn't exist."
/>`}
          >
            <ErrorState
              title="404 Not Found"
              description="The page you're looking for doesn't exist."
            />
          </ComponentDemo>

          <ComponentDemo
            title="With Custom Action"
            description="Error state with custom action"
            code={`<ErrorState
  title="No Results"
  description="Try adjusting your search"
  action={
    <Button variant="outline">
      Clear Filters
    </Button>
  }
/>`}
          >
            <ErrorState
              title="No Results"
              description="Try adjusting your search parameters"
              action={
                <Button variant="outline">
                  Clear Filters
                </Button>
              }
            />
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 