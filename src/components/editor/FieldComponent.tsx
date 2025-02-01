import React from 'react';
import { FormProperty, FormPropertyPath } from '../../types/schema';
import { MessageCircle } from 'lucide-react';

interface FieldComponentProps {
  /** The field property to render */
  field: FormProperty;
  /** Callback to update the field */
  updateField: (field: Partial<FormProperty>) => void;
  /** Callback to remove the field */
  removeField: () => void;
  /** Callback to add a nested field (for object types) */
  addNestedField: () => void;
  /** Path to this field in the form structure */
  path: FormPropertyPath;
}

/**
 * Renders a form field with its type, required status, and description
 */
const FieldComponent: React.FC<FieldComponentProps> = ({
  field,
  updateField,
  removeField,
  addNestedField,
  path
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <span className="font-medium">{field.title}</span>
          {field.required && (
            <span className="text-red-400 text-sm" title="Required field">*</span>
          )}
          <span className="text-gray-400 text-sm">({field.type})</span>
          {field.$comment && (
            <div className="relative group">
              <MessageCircle 
                size={16} 
                className="text-gray-400 hover:text-gray-300 cursor-help" 
              />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block">
                <div className="text-sm rounded px-2 py-1 whitespace-nowrap">
                  {field.$comment}
                </div>
              </div>
            </div>
          )}
          {field.example !== undefined && (
            <span className="text-gray-400 text-sm">
              (example: {JSON.stringify(field.example)})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldComponent; 