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
  const [sizeDemo, setSizeDemo] = React.useState<{
    open: boolean;
    size?: 'sm' | 'default' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  }>({ open: false });

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
    {
      name: "size",
      type: "'sm' | 'default' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'",
      defaultValue: "default",
      description: "Controls the maximum width of the dialog",
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
      
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        size="default"
      >
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
        <Title level={3}>Sizes</Title>
        <p className="text-gray-400">
          The Dialog component comes in different sizes to accommodate various content needs.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {(['sm', 'default', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <Button
                onClick={() => setSizeDemo({ open: true, size })}
                variant="outline"
                className="w-32 justify-start"
              >
                <span className="font-mono text-sm">{size}</span>
              </Button>
              <span className="text-sm text-gray-400">
                {size === 'sm' && 'Small (384px)'}
                {size === 'default' && 'Default (512px)'}
                {size === 'lg' && 'Large (576px)'}
                {size === 'xl' && 'Extra Large (672px)'}
                {size === '2xl' && 'Double Extra Large (768px)'}
                {size === '3xl' && 'Triple Extra Large (896px)'}
                {size === '4xl' && 'Quadruple Extra Large (1024px)'}
                {size === '5xl' && 'Quintuple Extra Large (1152px)'}
                {size === 'full' && 'Full Width'}
              </span>
            </div>
          ))}

          <Dialog 
            open={sizeDemo.open} 
            onClose={() => setSizeDemo({ open: false })}
            size={sizeDemo.size}
          >
            <DialogHeader>
              <h2 className="text-xl font-semibold">
                {sizeDemo.size} Dialog
              </h2>
            </DialogHeader>
            <DialogContent>
              <div className="space-y-4">
                <p className="text-gray-400">
                  This is an example of a dialog with the <code className="text-blue-400">{sizeDemo.size}</code> size variant.
                </p>
                <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Content Area</span>
                </div>
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSizeDemo({ open: false })}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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