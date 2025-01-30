import * as React from "react";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Prop</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Type</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Default</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-gray-200 dark:border-gray-800">
              <td className="py-2 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                {prop.name}
              </td>
              <td className="py-2 px-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                {prop.type}
              </td>
              <td className="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">
                {prop.defaultValue || '—'}
              </td>
              <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 