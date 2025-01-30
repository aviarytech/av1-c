import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Toast } from "../../../components/toast/Toast";
import { Title } from "../../../components/typography/Title";
import { Button } from "../../../components/button/Button";
import { toast } from "react-hot-toast";

export const ToastPage = () => {
  const toastProps = [
    {
      name: "message",
      type: "string",
      required: true,
      description: "The message to display in the toast",
    },
    {
      name: "type",
      type: "'success' | 'error' | 'loading'",
      defaultValue: "default",
      description: "The type of toast to display",
    },
    {
      name: "duration",
      type: "number",
      defaultValue: "5000",
      description: "Duration in milliseconds to show the toast",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Toast"
        description="A toast component for showing brief notifications."
        code={`import { toast } from "react-hot-toast";

const MyComponent = () => (
  <Button onClick={() => toast.success("Operation successful!")}>
    Show Toast
  </Button>
);`}
      >
        <div className="flex gap-4">
          <Button onClick={() => toast.success("Operation successful!")}>
            Success Toast
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => toast.error("Something went wrong!")}
          >
            Error Toast
          </Button>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={toastProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-4">
          <ComponentDemo
            title="Custom Content"
            description="Toast with custom content and styling"
            code={`toast((t) => (
  <div className="flex items-center gap-2">
    <span>Custom toast content</span>
    <Button size="sm" onClick={() => toast.dismiss(t.id)}>
      Dismiss
    </Button>
  </div>
));`}
          >
            <Button
              onClick={() =>
                toast((t) => (
                  <div className="flex items-center gap-2">
                    <span>Custom toast content</span>
                    <Button size="sm" onClick={() => toast.dismiss(t.id)}>
                      Dismiss
                    </Button>
                  </div>
                ))
              }
            >
              Show Custom Toast
            </Button>
          </ComponentDemo>

          <ComponentDemo
            title="Loading State"
            description="Toast with loading state"
            code={`const promise = new Promise(...);
toast.promise(promise, {
  loading: 'Loading...',
  success: 'Success!',
  error: 'Error!',
});`}
          >
            <Button
              onClick={() => {
                const promise = new Promise((resolve) =>
                  setTimeout(resolve, 2000)
                );
                toast.promise(promise, {
                  loading: "Loading...",
                  success: "Operation completed!",
                  error: "Something went wrong",
                });
              }}
            >
              Start Operation
            </Button>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 