import * as React from "react";
import { Table } from "../../components/table/Table";
import { Badge } from "../../components/badge/Badge";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Prop</Table.Head>
          <Table.Head>Type</Table.Head>
          <Table.Head>Default</Table.Head>
          <Table.Head>Description</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.map((prop) => (
          <Table.Row key={prop.name}>
            <Table.Cell>
              <div className="flex items-center gap-2">
                {prop.name}
                {prop.required && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
              </div>
            </Table.Cell>
            <Table.Cell>
              <code className="text-sm bg-gray-800 px-1.5 py-0.5 rounded">
                {prop.type}
              </code>
            </Table.Cell>
            <Table.Cell>
              {prop.defaultValue && (
                <code className="text-sm bg-gray-800 px-1.5 py-0.5 rounded">
                  {prop.defaultValue}
                </code>
              )}
            </Table.Cell>
            <Table.Cell>{prop.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}; 