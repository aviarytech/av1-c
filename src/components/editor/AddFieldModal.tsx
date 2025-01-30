import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Input } from '../input/Input';
import { Select } from '../select/Select';
import { Checkbox } from '../checkbox/Checkbox';
import { Dialog, DialogHeader, DialogContent } from '../modal/Dialog';
import { FormProperty, FormPropertyPath } from '../../types/schema';
import { Textarea } from '../textarea/Textarea';

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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogHeader>
        <h2 className="text-xl font-semibold text-gray-200">
          {editMode ? (
            <>Edit Field {parentPathString && <>in <span className="text-blue-300">{parentPathString}</span></>}</>
          ) : parentPath.length > 0 ? (
            <>Add Field to <span className="text-blue-300">{parentPathString}</span></>
          ) : (
            'Add Root Field'
          )}
        </h2>
      </DialogHeader>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Title</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter field title (e.g. First Name)"
                required
              />
              {!editMode && title && (
                <p className="text-gray-400 text-sm mt-1">
                  Field name: <code className="bg-gray-700 px-1 rounded">{title.toLowerCase().replace(/\s+/g, '_')}</code>
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Type</label>
              <Select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value as FormProperty['type'])}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="object">Object</option>
                <option value="array">Array</option>
              </Select>
            </div>
            <Checkbox
              id={checkboxId.current}
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
              label="Required"
            />
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-gray-400 hover:text-gray-300 flex items-center gap-2"
              >
                <ChevronRight className={`transition-transform ${showAdvanced ? 'rotate-90' : ''}`} size={16} />
                Advanced Options
              </button>
              
              {showAdvanced && (
                <div className="mt-2 space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a description for this field..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Example</label>
                    <Input
                      type="text"
                      value={example}
                      onChange={(e) => setExample(e.target.value)}
                      placeholder={`Enter example ${fieldType} value...`}
                    />
                    <p className="text-xs text-gray-400">
                      {fieldType === 'object' || fieldType === 'array' 
                        ? 'Enter valid JSON for this type' 
                        : `Enter a valid ${fieldType} value`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 
                       hover:bg-blue-500/30 rounded transition-colors"
            >
              {editMode ? 'Update Field' : 'Add Field'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};