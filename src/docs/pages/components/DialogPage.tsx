import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Dialog, DialogHeader, DialogContent } from "../../../components/modal/Dialog";
import { AlertDialog } from "../../../components/modal/DialogVariants";
import { Title } from "../../../components/typography/Title";
import { Button } from "../../../components/button/Button";

export const DialogPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const dialogProps = [
    {
      name: "open",
      type: "boolean",
      required: true,
      description: "Controls the visibility of the dialog",
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
      description: "Callback when dialog should close",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ];

  const alertDialogProps = [
    {
      name: "title",
      type: "string",
      required: true,
      description: "Title of the alert dialog",
    },
    {
      name: "description",
      type: "string",
      description: "Description text",
    },
    {
      name: "variant",
      type: "'info' | 'success' | 'warning' | 'error'",
      defaultValue: "info",
      description: "Visual style variant",
    },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Dialog"
        description="A modal dialog component for displaying content that requires attention or interaction."
        code={`import { Dialog, DialogHeader, DialogContent } from "av1-c";

const MyComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>
          <h2>Dialog Title</h2>
        </DialogHeader>
        <DialogContent>
          Dialog content goes here
        </DialogContent>
      </Dialog>
    </>
  );
};`}
      >
        <div>
          <Button onClick={() => setIsOpen(true)}>
            Open Dialog
          </Button>
          
          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogHeader>
              <h2 className="text-xl font-semibold">Example Dialog</h2>
            </DialogHeader>
            <DialogContent>
              <p className="text-gray-400">
                This is an example of a basic dialog component.
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOpen(false)}>
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={dialogProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Alert Dialog</Title>
        <p className="text-gray-400">
          A specialized dialog variant for displaying alerts and confirmations.
        </p>
        <ComponentDemo
          title="Alert Dialog"
          description="Dialog with predefined styles for different states"
          code={`import { AlertDialog } from "av1-c";

const MyComponent = () => (
  <AlertDialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    title="Delete Item"
    description="Are you sure you want to delete this item?"
    variant="warning"
    actions={
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </>
    }
  />
);`}
        >
          <div>
            <Button 
              variant="destructive" 
              onClick={() => setIsAlertOpen(true)}
            >
              Show Alert
            </Button>
            
            <AlertDialog
              open={isAlertOpen}
              onClose={() => setIsAlertOpen(false)}
              title="Delete Item"
              description="Are you sure you want to delete this item? This action cannot be undone."
              variant="warning"
              actions={
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAlertOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => setIsAlertOpen(false)}
                  >
                    Delete
                  </Button>
                </>
              }
            />
          </div>
        </ComponentDemo>
        <div className="mt-4">
          <PropsTable props={alertDialogProps} />
        </div>
      </section>
    </div>
  );
}; 