import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Input } from '../input/Input';
import { Select } from '../select/Select';
import { Checkbox } from '../checkbox/Checkbox';
import { Dialog, DialogHeader, DialogContent } from '../modal/Dialog';
import { FormProperty, FormPropertyPath } from '../../types/schema';
import { Textarea } from '../textarea/Textarea';
import { Button } from '../button/Button';

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (fieldName: string, field: FormProperty) => void;
  parentPath?: FormPropertyPath;
  editMode?: boolean;
  initialField?: FormProperty;
  fieldName?: string;
}

export const AddFieldModal: React.FC<AddFieldModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  parentPath = [], 
  editMode = false,
  initialField,
  fieldName = ''
}) => {
  const [title, setTitle] = useState('');
  const [fieldType, setFieldType] = useState<FormProperty['type']>('string');
  const [isRequired, setIsRequired] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [comment, setComment] = useState('');
  const [example, setExample] = useState('');

  // Generate a unique ID that includes a timestamp to avoid collisions
  const checkboxId = useRef(`required-checkbox-${Date.now()}-${Math.random().toString(36).slice(2)}`);

  // Reset form when modal is opened/closed
  useEffect(() => {
    if (!isOpen) {
      // Reset form when closing
      setTitle('');
      setFieldType('string');
      setIsRequired(false);
      setComment('');
      setShowAdvanced(false);
      setExample('');
    } else if (editMode && initialField) {
      // Set values when editing
      setTitle(initialField.title);
      setFieldType(initialField.type);
      setIsRequired(initialField.required || false);
      setComment(initialField.$comment || '');
      // Show advanced if there's a comment
      setShowAdvanced(!!initialField.$comment);
      setExample(initialField.example || '');
    } else {
      // Reset form when opening for new field
      setTitle('');
      setFieldType('string');
      setIsRequired(false);
      setComment('');
      setShowAdvanced(false);
      setExample('');
    }
  }, [isOpen, editMode, initialField]);

  const getParentPath = (path: FormPropertyPath): string => {
    if (path.length < 2) return '';
    const titles: string[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      const segment = path[i];
      if (typeof segment === 'string' && segment !== 'properties' && segment !== 'items') {
        titles.push(segment);
      }
    }
    return titles.join(' → ');
  };

  const parentPathString = getParentPath(parentPath);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const key = editMode ? fieldName : title.toLowerCase().replace(/\s+/g, '_');
    
    // Parse example value based on field type
    let parsedExample: string | number | boolean | object | any[] = example;
    if (example) {
      try {
        switch (fieldType) {
          case 'number':
            parsedExample = Number(example);
            break;
          case 'boolean':
            parsedExample = example.toLowerCase() === 'true';
            break;
          case 'object':
          case 'array':
            try {
              parsedExample = JSON.parse(example);
            } catch {
              // If JSON parsing fails, keep as string
              parsedExample = example;
            }
            break;
          default:
            parsedExample = example;
        }
      } catch (error) {
        console.error('Failed to parse example:', error);
        // Keep as string if parsing fails
        parsedExample = example;
      }
    }

    onAdd(key, {
      title,
      type: fieldType,
      required: isRequired,
      ...(comment && { $comment: comment }),
      ...(example !== '' && example !== undefined && { example: parsedExample }),
      ...(fieldType === 'object' && { properties: {} })
    });
    onClose();
    // Reset form
    setTitle('');
    setFieldType('string');
    setIsRequired(false);
    setComment('');
    setShowAdvanced(false);
    setExample('');
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      size="lg"
    >
      <DialogHeader className="px-6 py-4 border-b bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-semibold">Add Root Field</h2>
        {parentPathString && (
          <p className="text-sm text-gray-500 mt-1">
            Adding to: {parentPathString}
          </p>
        )}
      </DialogHeader>
      <DialogContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
              <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter field title (e.g. First Name)"
              required
              className="w-full bg-white dark:bg-gray-900 shadow-sm"
            />
            {!editMode && title && (
              <p className="text-sm text-gray-500 mt-1">
                Field name: <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{title.toLowerCase().replace(/\s+/g, '_')}</code>
              </p>
            )}
          </div>

          {/* Type Select */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
              Type
              <span className="text-red-500">*</span>
            </label>
            <Select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value as FormProperty['type'])}
              className="w-full bg-white dark:bg-gray-900 shadow-sm"
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="object">Object</option>
              <option value="array">Array</option>
            </Select>
          </div>

          {/* Required Checkbox */}
          <div className="pt-2">
            <Checkbox
              id={checkboxId.current}
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
              label="Required field"
              className="text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Advanced Options Section */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              <ChevronRight 
                className={`transition-transform duration-150 ${showAdvanced ? 'rotate-90' : ''}`} 
                size={16} 
              />
              Advanced Options
            </button>
            
            {showAdvanced && (
              <div className="mt-6 space-y-6 pl-6">
                {/* Description Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Description
                  </label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a description for this field..."
                    rows={3}
                    className="w-full bg-white dark:bg-gray-900 shadow-sm resize-none"
                  />
                </div>
                
                {/* Example Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Example Value
                  </label>
                  <Input
                    type="text"
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                    placeholder={`Enter example ${fieldType} value...`}
                    className="w-full bg-white dark:bg-gray-900 shadow-sm"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Enter a valid {fieldType} value
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              size="sm"
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              size="sm"
              className="px-4"
              onClick={handleSubmit}
            >
              Add Field
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};