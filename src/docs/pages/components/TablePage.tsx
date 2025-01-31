import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { Table } from "../../../components/table/Table";
import { Title } from "../../../components/typography/Title";
import { Badge } from "../../../components/badge/Badge";

export const TablePage = () => {
  const tableProps = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the table",
    },
  ];

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Table"
        description="A responsive table component for displaying structured data."
        code={`import { Table } from "av1-c";

const MyComponent = () => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head>Name</Table.Head>
        <Table.Head>Email</Table.Head>
        <Table.Head>Role</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>John Doe</Table.Cell>
        <Table.Cell>john@example.com</Table.Cell>
        <Table.Cell>Admin</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);`}
      >
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head>Role</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.email}</Table.Cell>
                <Table.Cell>{row.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={tableProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-1 gap-4">
          <ComponentDemo
            title="With Custom Styling"
            description="Table with custom cell styling"
            code={`<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Status</Table.Head>
      <Table.Head>Value</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Badge variant="success">Active</Badge>
      </Table.Cell>
      <Table.Cell className="font-mono">$1,234.56</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Badge variant="warning">Pending</Badge>
      </Table.Cell>
      <Table.Cell className="font-mono">$567.89</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`}
          >
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Value</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Badge variant="success">Active</Badge>
                  </Table.Cell>
                  <Table.Cell className="font-mono">$1,234.56</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Badge variant="warning">Pending</Badge>
                  </Table.Cell>
                  <Table.Cell className="font-mono">$567.89</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 