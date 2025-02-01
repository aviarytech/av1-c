import { useState, FormEvent, useEffect, useCallback } from 'react';
import { ChevronLeft, PlusCircle, Code, Trash2 } from 'lucide-react';
import * as jsonld from 'jsonld';
import { Context as ContextType, FormProperty, FormPropertyPath, FormData, JsonSchema, JsonSchemaProperty } from '../../types/schema';
import { generateExampleCredential, toPascalCase } from '../../utils/schemaUtils';
import { CodeEditor } from '../editor/CodeEditor';
import FieldComponent from './FieldComponent';
import { AddFieldModal } from './AddFieldModal';
import { ContextChipInput } from './ContextChipInput';
import Editor from '@monaco-editor/react';
import { Tabs, Tab, TabPanel } from "../../components/tabs/Tabs";
import { Button } from '../button/Button';
import { Tooltip } from '../tooltip/Tooltip';

interface Errors {
  title?: string;
  properties?: string;
  submit?: string | JSX.Element;
}

interface SchemaEditorProps {
  /** Initial schema data */
  initialData?: JsonSchema;
  /** Callback when schema is submitted */
  onSubmit?: (schema: JsonSchema) => void;
  /** Callback when schema validation status changes */
  onValidationChange?: (isValid: boolean) => void;
}

const DEV_CONTEXT = {
  uri: 'https://www.w3.org/ns/credentials/examples/v2',
  prefix: 'ex',
  description: 'W3C Verifiable Credentials Examples v2'
};

// Update the type to be simpler
type NormalizationStatus = 'none' | 'loading' | 'valid' | 'invalid';

/**
 * A visual editor for creating and managing Verifiable Credential schemas
 */
export function SchemaEditor({ 
  initialData,
  onSubmit,
  onValidationChange 
}: SchemaEditorProps) {
  // Add this helper function to convert JsonSchemaProperty to FormProperty
  const convertJsonSchemaToFormProperty = (prop: JsonSchemaProperty): FormProperty => {
    const type = prop.type as 'string' | 'number' | 'boolean' | 'object' | 'array';
    return {
      title: prop.title,
      type,
      $comment: prop.$comment,
      required: false, // We'll handle required fields separately
      example: prop.example,
      ...(prop.properties && {
        properties: Object.entries(prop.properties).reduce<{ [key: string]: FormProperty }>(
          (acc, [key, value]) => ({
            ...acc,
            [key]: convertJsonSchemaToFormProperty(value)
          }),
          {}
        )
      }),
      ...(prop.items && {
        items: Array.isArray(prop.items)
          ? prop.items.map(convertJsonSchemaToFormProperty)
          : convertJsonSchemaToFormProperty(prop.items)
      }),
      minItems: prop.minItems,
      maxItems: prop.maxItems,
      uniqueItems: prop.uniqueItems
    };
  };

  // Convert initialData (JsonSchema) to FormData when initializing state
  const [formData, setFormData] = useState<FormData>(() => {
    if (initialData) {
      const properties = initialData.properties.credentialSubject.properties || {};
      const required = initialData.properties.credentialSubject.required || [];
      
      // Convert properties and mark required fields
      const convertedProperties = Object.entries(properties).reduce<{ [key: string]: FormProperty }>(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            ...convertJsonSchemaToFormProperty(value),
            required: required.includes(key)
          }
        }),
        {}
      );

      return {
        title: initialData.title,
        $comment: initialData.$comment || '',
        allowId: !!initialData.properties.id,
        properties: convertedProperties
      };
    }
    return { 
      title: '', 
      $comment: '', 
      allowId: false, 
      properties: {} 
    };
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isJsonView, setIsJsonView] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [contexts, setContexts] = useState<ContextType[]>(() => {
    if (initialData?.properties['@context']?.prefixItems) {
      return initialData.properties['@context'].prefixItems.map(item => ({
        uri: item.const,
        prefix: item.const.split('/').pop()?.replace('.json', '') || '',
        description: ''
      }));
    }
    return [{
      uri: 'https://www.w3.org/ns/credentials/v2',
      prefix: 'vc',
      description: 'W3C Verifiable Credentials v2'
    }];
  });
  const [normalizedView, setNormalizedView] = useState(false);
  const [normalizedData, setNormalizedData] = useState<string>('');
  const [normalizationStatus, setNormalizationStatus] = useState<NormalizationStatus>('none');
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [currentParentPath, setCurrentParentPath] = useState<FormPropertyPath>([]);
  const [editingField, setEditingField] = useState<{
    path: FormPropertyPath;
    field: FormProperty;
    fieldName: string;
  } | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Add the copyToClipboard function here inside the component
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // First, memoize convertFormToProperties
  const convertFormToProperties = useCallback((properties: { [key: string]: FormProperty }): { [key: string]: any } => {
    const result: { [key: string]: any } = {};
    const required: string[] = [];
    
    Object.entries(properties).forEach(([key, property]) => {
      console.log('Converting property:', key, property);
      
      result[key] = {
        title: property.title,
        type: property.type,
        $comment: property.$comment,
        ...(property.example !== undefined && property.example !== '' && { example: property.example }),
      };

      if (property.required) {
        required.push(property.title || key);
      }

      if (property.type === 'object' && property.properties) {
        const nested = convertFormToProperties(property.properties);
        result[key].properties = nested.properties;
        if (nested.required?.length > 0) {
          result[key].required = nested.required;
        }
      }

      if (property.type === 'array' && property.items) {
        if (Array.isArray(property.items)) {
          result[key].items = property.items.map((item: any) => ({
            title: item.title,
            type: item.type,
            $comment: item.$comment,
            ...(item.example !== undefined && { example: item.example }),
            ...(item.properties && { properties: convertFormToProperties(item.properties) })
          }));
        } else {
          result[key].items = {
            title: property.items.title,
            type: property.items.type,
            $comment: property.items.$comment,
            ...(property.items.example !== undefined && { example: property.items.example }),
            ...(property.items.properties && { properties: convertFormToProperties(property.items.properties) })
          };
        }

        if (property.minItems !== undefined) result[key].minItems = property.minItems;
        if (property.maxItems !== undefined) result[key].maxItems = property.maxItems;
        if (property.uniqueItems !== undefined) result[key].uniqueItems = property.uniqueItems;
      }
    });

    return { 
      properties: result, 
      required: required.length > 0 ? required : undefined 
    };
  }, []); // No dependencies needed as it's a pure function

  // Then update getCompleteJsonSchema to include convertFormToProperties as a dependency
  const getCompleteJsonSchema = useCallback(() => {
    const subjectSchema = convertFormToProperties(formData.properties);
    console.log('Subject schema after conversion:', subjectSchema); // Debug log
    return {
      title: toPascalCase(formData.title),
      $comment: formData.$comment,
      type: 'object',
      properties: {
        '@context': {
          type: 'array',
          items: {
            type: 'string'
          },
          minItems: 1,
          prefixItems: contexts.map(ctx => ({
            type: 'string',
            const: ctx.uri
          }))
        },
        ...(formData.allowId && {
          id: {
            type: 'string',
            format: 'uri'
          }
        }),
        type: {
          type: 'array',
          items: {
            type: 'string'
          },
          prefixItems: [
            { type: 'string', const: 'VerifiableCredential' },
            { type: 'string', const: toPascalCase(formData.title) }
          ],
          maxItems: 2
        },
        credentialSubject: {
          type: 'object',
          properties: subjectSchema.properties,
          ...(subjectSchema.required?.length > 0 && { required: subjectSchema.required })
        }
      },
      required: ['@context', 'type', 'credentialSubject']
    };
  }, [formData.title, formData.$comment, formData.properties, formData.allowId, contexts, convertFormToProperties]);

  // Initialize jsonInput with the schema when formData changes
  useEffect(() => {
    setJsonInput(JSON.stringify(getCompleteJsonSchema(), null, 2));
  }, [getCompleteJsonSchema]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};
    
    // Check normalization status first
    if (normalizationStatus === 'invalid') {
      setErrors({ 
        submit: (
          <>
            Cannot create schema: JSON-LD normalization failed. Please check your schema structure.{' '}
            <button
              type="button"
              onClick={() => {
                if (!contexts.some(ctx => ctx.uri === DEV_CONTEXT.uri)) {
                  setContexts([...contexts, DEV_CONTEXT]);
                  setErrors({}); // Clear errors after adding context
                }
              }}
              className="text-blue-500 hover:text-blue-400 underline"
            >
              Add development context?
            </button>
          </>
        ) as unknown as string
      });
      return;
    }

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = document.querySelector('.text-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      const schemaData = getCompleteJsonSchema();
      onSubmit?.(schemaData);
    } catch (error: any) {
      console.error('Error creating schema:', error);
      setErrors({ 
        submit: error.message || 'Failed to create schema. Please try again.' 
      });

      // Scroll error into view
      const errorElement = document.querySelector('.text-red-500');
      errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const addProperty = (fieldName: string, field: FormProperty) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      properties: {
        ...prevData.properties,
        [fieldName]: field
      }
    }));
  };

  const updateProperty = (path: FormPropertyPath, updatedField: Partial<FormProperty>) => {
    setFormData((prevFormData: FormData) => {
      const newProperties = { ...prevFormData.properties };
      let current = newProperties as { [key: string]: FormProperty };
      
      // Handle the path traversal
      for (let i = 0; i < path.length; i++) {
        const segment = path[i];
        
        if (segment === 'properties' || segment === 'items') {
          continue;
        }
        
        if (i === path.length - 1) {
          if (typeof segment === 'string') {
            if (updatedField.title && updatedField.title !== current[segment]?.title) {
              const newKey = updatedField.title.toLowerCase().replace(/\s+/g, '_');
              const currentField = current[segment] as FormProperty | undefined;
              const oldValue = {
                title: '', 
                type: 'string' as const,
                required: false,
                ...(currentField?.example !== undefined && { example: currentField.example })
              };
              delete current[segment];
              current[newKey] = { ...oldValue, ...updatedField };
            } else {
              const currentField = current[segment] as FormProperty | undefined;
              current[segment] = { 
                ...(current[segment] || { 
                  title: '', 
                  type: 'string' as const, 
                  required: false,
                }), 
                ...updatedField 
              };
            }
          }
          break;
        }
        
        // Otherwise, traverse to the next level
        if (typeof segment === 'string') {
          // Ensure the path exists with a valid FormProperty object
          if (!current[segment]) {
            current[segment] = { title: '', type: 'string', required: false };
          }
          
          // Move to the next level based on the next segment type
          if (path[i + 1] === 'properties') {
            if (!current[segment].properties) {
              current[segment].properties = {};
            }
            current = current[segment].properties as { [key: string]: FormProperty };
          } else if (path[i + 1] === 'items') {
            if (!current[segment].items) {
              current[segment].items = { title: '', type: 'string', required: false };
            }
            current = Array.isArray(current[segment].items) 
              ? (current[segment].items as FormProperty[]).reduce<{ [key: string]: FormProperty }>(
                  (acc, item, idx) => ({ 
                    ...acc, 
                    [`item_${idx}`]: item 
                  }), 
                  {}
                )
              : { item: current[segment].items } as { [key: string]: FormProperty };
          }
        }
      }

      console.log('Updated form data:', { ...prevFormData, properties: newProperties });
      return { ...prevFormData, properties: newProperties };
    });
  };

  const removeProperty = (path: FormPropertyPath) => {
    setFormData((prevFormData: FormData) => {
      console.log('Removing property:', path);
      console.log('Previous form data:', prevFormData);
      
      const newProperties = { ...prevFormData.properties };
      let current: { [key: string]: FormProperty } = newProperties;
      let parent: { [key: string]: FormProperty } | null = null;
      let lastSegment: string | null = null;
      
      // Handle the path traversal
      for (let i = 0; i < path.length - 1; i++) {
        const segment = path[i];
        
        if (segment === 'properties' || segment === 'items') {
          continue;
        }
        
        if (typeof segment === 'string') {
          parent = current;
          lastSegment = segment;
          
          // Move to the appropriate container based on next segment
          if (path[i + 1] === 'properties' && current[segment]?.properties) {
            current = current[segment].properties as { [key: string]: FormProperty };
          } else if (path[i + 1] === 'items' && current[segment]?.items) {
            current = Array.isArray(current[segment].items)
              ? (current[segment].items as FormProperty[]).reduce<{ [key: string]: FormProperty }>(
                  (acc, item, idx) => ({ 
                    ...acc, 
                    [`item_${idx}`]: item 
                  }), 
                  {}
                )
              : { item: current[segment].items } as { [key: string]: FormProperty };
          }
        }
      }
      
      const finalSegment = path[path.length - 1];
      if (typeof finalSegment === 'string') {
        if (parent && lastSegment) {
          delete current[finalSegment];
        } else {
          delete newProperties[finalSegment];
        }
      }

      console.log('Updated form data:', { ...prevFormData, properties: newProperties });
      return { ...prevFormData, properties: newProperties };
    });
  };

  const toggleView = () => {
    if (isJsonView) {
      try {
        const parsedJson = JSON.parse(jsonInput);
        // Validate the schema structure
        if (!parsedJson.properties?.credentialSubject) {
          throw new Error('Invalid schema: missing credentialSubject property');
        }
        
        // Extract contexts from the schema
        const schemaContexts = parsedJson.properties['@context']?.prefixItems?.map((item: any) => ({
          uri: item.const,
          prefix: item.const.split('/').pop()?.replace('.json', '') || '',
          description: ''
        })) || [];
        
        // Ensure W3C VC v2 context is first
        const w3cContext = schemaContexts.find((ctx: { uri: string }) => ctx.uri === 'https://www.w3.org/ns/credentials/v2');
        const otherContexts = schemaContexts.filter((ctx: { uri: string }) => ctx.uri !== 'https://www.w3.org/ns/credentials/v2');
        
        // Update contexts state
        setContexts([
          {
            uri: 'https://www.w3.org/ns/credentials/v2',
            prefix: 'vc',
            description: 'W3C Verifiable Credentials v2'
          },
          ...otherContexts
        ]);
        
        const convertedFormData = {
          title: parsedJson.title || '',
          $comment: parsedJson.$comment || '',
          allowId: !!parsedJson.properties.id,
          properties: parsedJson.properties.credentialSubject.properties || {}
        };
        
        setFormData(convertedFormData);
        setJsonError(null);
        setIsJsonView(false);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setJsonError(error instanceof Error ? error.message : "Invalid JSON. Please check your input.");
        return; // Don't toggle the view if there's an error
      }
    } else {
      try {
        const jsonData = getCompleteJsonSchema();
        const formattedJson = JSON.stringify(jsonData, null, 2);
        setJsonInput(formattedJson);
        setIsJsonView(true);
      } catch (error) {
        console.error('Error converting form data to JSON:', error);
        setJsonError("Error converting form data to JSON.");
        return; // Don't toggle the view if there's an error
      }
    }
  };

  const renderJsonView = () => {
    return (
      <div className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Template Name</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 rounded border-gray-600 text-gray-900"
            placeholder="Enter schema name"
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
        </div>
        <label className="block text-gray-300 mb-2">JSON Schema</label>
        <div className="h-96 border border-gray-600 rounded">
          <Editor
            height="100%"
            language="json"
            value={jsonInput}
            onChange={(value) => {
              setJsonInput(value || '');
              try {
                const parsedJson = JSON.parse(value || '');
                if (!parsedJson.properties?.credentialSubject) {
                  setJsonError('Schema must include a credentialSubject property');
                  return;
                }
                
                // Update contexts from pasted JSON
                if (parsedJson.properties['@context']?.prefixItems) {
                  setContexts(parsedJson.properties['@context'].prefixItems.map((item: { type: string; const: string }) => ({
                    uri: item.const,
                    prefix: item.const.split('/').pop()?.replace('.json', '') || '',
                    description: ''
                  })));
                }
                
                const convertedFormData = {
                  title: parsedJson.title || '',
                  $comment: parsedJson.$comment || '',
                  allowId: !!parsedJson.properties.id,
                  properties: parsedJson.properties.credentialSubject.properties || {}
                };
                
                setFormData(convertedFormData);
                setJsonError(null);
              } catch (error) {
                setJsonError('Invalid JSON format');
              }
            }}
            beforeMount={(monaco) => {
              // Configure JSON schema validation
              monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                validate: true,
                schemas: [{
                  uri: "schema.json",
                  fileMatch: ["*"],
                  schema: {
                    type: "object",
                    required: ["title", "type", "properties"],
                    properties: {
                      title: { type: "string" },
                      $comment: { type: "string" },
                      type: { type: "string", const: "object" },
                      properties: {
                        type: "object",
                        required: ["credentialSubject"],
                        properties: {
                          credentialSubject: {
                            type: "object",
                            required: ["type", "properties"],
                            properties: {
                              type: { type: "string", const: "object" },
                              properties: { 
                                type: "object",
                                additionalProperties: {
                                  type: "object",
                                  required: ["type", "title"],
                                  properties: {
                                    type: { 
                                      type: "string", 
                                      enum: ["string", "number", "boolean", "object", "array"] 
                                    },
                                    title: { type: "string" },
                                    $comment: { type: "string" },
                                    required: { type: "boolean" }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }]
              });
            }}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              tabSize: 2,
              formatOnPaste: true,
              formatOnType: true
            }}
          />
        </div>
        {jsonError && <p className="text-red-500 mt-2">{jsonError}</p>}
        {errors.properties && <p className="text-red-500 mt-2">{errors.properties}</p>}
        {errors.submit && <p className="text-red-500 mt-2">{errors.submit}</p>}
      </div>
    );
  };

  const renderProperties = (properties: { [key: string]: FormProperty } = {}, path: FormPropertyPath = []) => {
    return (
      <>
        {Object.entries(properties).map(([key, property]) => {
          const currentPath = [...path, key] as FormPropertyPath;
          return (
            <div key={key} className="mb-4">
              <div className="flex items-start gap-2">
                <div 
                  onClick={() => {
                    setEditingField({
                      path: currentPath,
                      field: property,
                      fieldName: key
                    });
                    setIsAddFieldModalOpen(true);
                  }}
                  className="cursor-pointer flex-grow"
                >
                  <FieldComponent
                    field={property}
                    updateField={(updatedField) => updateProperty(currentPath as FormPropertyPath, updatedField)}
                    removeField={() => removeProperty(currentPath as FormPropertyPath)}
                    addNestedField={() => {
                      if (property.type === 'object') {
                        const newKey = `field_${Date.now()}`;
                        const newPath = [...currentPath, 'properties', newKey] as FormPropertyPath;
                        updateProperty(newPath, {
                          title: '',
                          type: 'string',
                          required: false
                        });
                      }
                    }}
                    path={currentPath as FormPropertyPath}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeProperty(currentPath as FormPropertyPath)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                  title="Remove field"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              {property.type === 'object' && (
                <div className="ml-8 mt-2 border-l-2 border-gray-600 pl-4">
                  {property.properties && renderProperties(property.properties, [...currentPath, 'properties'])}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentParentPath([...currentPath, 'properties']);
                      setIsAddFieldModalOpen(true);
                    }}
                    className="mt-2 text-sm px-3 py-1.5 bg-blue-500/20 text-blue-300 
                              border border-blue-500/30 hover:bg-blue-500/30 
                              rounded flex items-center gap-2 transition-colors"
                  >
                    <PlusCircle size={16} />
                    Add Field
                  </Button>
                </div>
              )}
              {property.type === 'array' && property.items && (
                <div className="ml-8 mt-2 border-l-2 border-gray-600 pl-4">
                  <h4 className="text-gray-300 mb-2">Array Items:</h4>
                  {renderProperties(
                    Array.isArray(property.items) 
                      ? property.items.reduce<{ [key: string]: FormProperty }>(
                          (acc: { [key: string]: FormProperty }, item: FormProperty, idx: number) => ({ 
                            ...acc, 
                            [`item_${idx}`]: item 
                          }), 
                          {}
                        )
                      : { 'item': property.items },
                    [...currentPath, 'items']
                  )}
                </div>
              )}
            </div>
          );
        })}
        
        {path.length === 0 && (
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setCurrentParentPath([]);
              setIsAddFieldModalOpen(true);
            }}
            className="flex gap-2"
          >
            <PlusCircle size={18} />
            Add Field
          </Button>
        )}
        
        <AddFieldModal
          isOpen={isAddFieldModalOpen}
          onClose={() => {
            setIsAddFieldModalOpen(false);
            setEditingField(null);
          }}
          onAdd={(fieldName, field) => {
            if (editingField) {
              updateProperty(editingField.path, field);
            } else if (currentParentPath.length === 0) {
              addProperty(fieldName, field);
            } else {
              const newPath = [...currentParentPath, fieldName] as FormPropertyPath;
              updateProperty(newPath, field);
            }
          }}
          parentPath={editingField ? editingField.path : currentParentPath}
          editMode={!!editingField}
          initialField={editingField?.field}
          fieldName={editingField?.fieldName}
        />
      </>
    );
  };

  // Add this helper function
  const isValidProperty = (prop: any): prop is FormProperty => {
    return (
      typeof prop === 'object' &&
      prop !== null &&
      typeof prop.title === 'string' &&
      ['string', 'number', 'boolean', 'object', 'array'].includes(prop.type)
    );
  };

  // Update the normalizeCredential function
  const normalizeCredential = async (credential: any) => {
    setNormalizationStatus('loading');
    try {
      // Try with safe mode
      await jsonld.normalize(credential, {
        algorithm: 'URDNA2015',
        format: 'application/n-quads',
        safe: true
      });
      
      // If safe mode succeeds, get the actual normalized result
      const normalized = await jsonld.normalize(credential, {
        algorithm: 'URDNA2015',
        format: 'application/n-quads'
      });
      
      setNormalizationStatus('valid');
      return normalized;
    } catch (error) {
      console.error('Normalization error:', error);
      setNormalizationStatus('invalid');
      return `Error normalizing credential: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  // Update the useEffect to always check normalization status
  useEffect(() => {
    const updateNormalization = async () => {
      const schema = getCompleteJsonSchema();
      const example = generateExampleCredential(schema);
      
      if (normalizedView) {
        const normalized = await normalizeCredential(example);
        setNormalizedData(normalized);
      } else {
        // Still check normalization even in JSON view
        try {
          await jsonld.normalize(example, {
            algorithm: 'URDNA2015',
            format: 'application/n-quads',
            safe: true
          });
          setNormalizationStatus('valid');
        } catch (error) {
          console.error('Normalization error:', error);
          setNormalizationStatus('invalid');
        }
      }
    };
    
    updateNormalization();
  }, [formData, normalizedView, getCompleteJsonSchema]);

  // Add a handler for title changes
  const handleTitleChange = (newTitle: string) => {
    setFormData((prev: FormData) => ({ ...prev, title: newTitle }));
    // Clear the title error when a title is entered
    if (newTitle.trim()) {
      setErrors(prev => ({ ...prev, title: undefined }));
    }
  };

  // Add useEffect to update preview when form data changes
  useEffect(() => {
    try {
      const schema = getCompleteJsonSchema();
      const example = generateExampleCredential(schema);
      setPreviewData(example);
    } catch (error) {
      console.error('Error generating preview:', error);
    }
  }, [formData, getCompleteJsonSchema]);

  // Notify parent of validation status changes
  useEffect(() => {
    onValidationChange?.(normalizationStatus === 'valid');
  }, [normalizationStatus, onValidationChange]);

  return (
    <div className="bg-white dark:bg-gray-900">
      <main className="grid grid-cols-1 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg">
          {errors.submit && (
            <div className="p-4 m-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-md">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Tabs Section */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <Tabs defaultValue="form">
                <Tab value="form" type="button">Form View</Tab>
                <Tab value="json" type="button">JSON View</Tab>
                
                <TabPanel value="form">
                  <div className="space-y-6">
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">Schema Name</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter schema name (e.g., University Degree or UniversityDegree)"
                      />
                      {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Type: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {formData.title ? `VerifiableCredential, ${toPascalCase(formData.title)}` : 'VerifiableCredential'}
                        </code>
                      </p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                      <textarea
                        value={formData.$comment}
                        onChange={(e) => setFormData({ ...formData, $comment: e.target.value })}
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter schema description"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <Tooltip content="Enable ID field">
                          <input
                            type="checkbox"
                            checked={formData.allowId}
                            onChange={(e) => setFormData({ ...formData, allowId: e.target.checked })}
                            className="form-checkbox h-4 w-4 text-blue-500"
                          />
                        </Tooltip>
                        <span>Allow ID field (URI format)</span>
                      </label>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        If checked, the credential can include an optional ID field in URI format
                      </p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Contexts
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          (Define semantic meaning of credential properties)
                        </span>
                      </label>
                      
                      <div className="space-y-2">
                        <ContextChipInput 
                          contexts={contexts}
                          onChange={setContexts}
                        />
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>The W3C VC context is required and cannot be removed</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (!contexts.some(ctx => ctx.uri === DEV_CONTEXT.uri)) {
                                setContexts([...contexts, DEV_CONTEXT]);
                              }
                            }}
                            className="px-3 py-1 bg-purple-50 dark:bg-purple-500/20 
                                       text-purple-600 dark:text-purple-300 
                                       border border-purple-200 dark:border-purple-500/30 
                                       hover:bg-purple-100 dark:hover:bg-purple-500/30 
                                       rounded-full transition-colors"
                          >
                            + Add Dev Context
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">Fields</label>
                      <div className="space-y-2">
                        {renderProperties(formData.properties)}
                      </div>
                      {errors.properties && <p className="text-red-500 mt-2">{errors.properties}</p>}
                    </div>
                  </div>
                </TabPanel>
                
                <TabPanel value="json">
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">Schema Name</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter schema name"
                      />
                      {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700 dark:text-gray-300">JSON Schema</label>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(jsonInput)}
                          className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm
                                   ${copyFeedback 
                                     ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30' 
                                     : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'}
                                   border rounded-md
                                   hover:bg-gray-50 dark:hover:bg-gray-800 
                                   transition-colors duration-200`}
                        >
                          {copyFeedback ? 'Copied!' : 'Copy JSON'}
                        </button>
                      </div>
                      <div className="h-[600px] border border-gray-300 dark:border-gray-700 rounded-md">
                        <Editor
                          height="100%"
                          language="json"
                          value={jsonInput}
                          onChange={(value) => {
                            setJsonInput(value || '');
                            try {
                              const parsedJson = JSON.parse(value || '');
                              if (!parsedJson.properties?.credentialSubject) {
                                setJsonError('Schema must include a credentialSubject property');
                                return;
                              }
                              
                              // Update contexts from pasted JSON
                              if (parsedJson.properties['@context']?.prefixItems) {
                                setContexts(parsedJson.properties['@context'].prefixItems.map((item: { type: string; const: string }) => ({
                                  uri: item.const,
                                  prefix: item.const.split('/').pop()?.replace('.json', '') || '',
                                  description: ''
                                })));
                              }
                              
                              const convertedFormData = {
                                title: parsedJson.title || '',
                                $comment: parsedJson.$comment || '',
                                allowId: !!parsedJson.properties.id,
                                properties: parsedJson.properties.credentialSubject.properties || {}
                              };
                              
                              setFormData(convertedFormData);
                              setJsonError(null);
                            } catch (error) {
                              setJsonError('Invalid JSON format');
                            }
                          }}
                          beforeMount={(monaco) => {
                            // Configure JSON schema validation
                            monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                              validate: true,
                              schemas: [{
                                uri: "schema.json",
                                fileMatch: ["*"],
                                schema: {
                                  type: "object",
                                  required: ["title", "type", "properties"],
                                  properties: {
                                    title: { type: "string" },
                                    $comment: { type: "string" },
                                    type: { type: "string", const: "object" },
                                    properties: {
                                      type: "object",
                                      required: ["credentialSubject"],
                                      properties: {
                                        credentialSubject: {
                                          type: "object",
                                          required: ["type", "properties"],
                                          properties: {
                                            type: { type: "string", const: "object" },
                                            properties: { 
                                              type: "object",
                                              additionalProperties: {
                                                type: "object",
                                                required: ["type", "title"],
                                                properties: {
                                                  type: { 
                                                    type: "string", 
                                                    enum: ["string", "number", "boolean", "object", "array"] 
                                                  },
                                                  title: { type: "string" },
                                                  $comment: { type: "string" },
                                                  required: { type: "boolean" }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }]
                            });
                          }}
                          options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 14,
                            tabSize: 2,
                            formatOnPaste: true,
                            formatOnType: true
                          }}
                        />
                      </div>
                      {jsonError && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{jsonError}</p>
                      )}
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium 
                           bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
                           border border-gray-300 dark:border-gray-700 rounded-md
                           hover:bg-gray-50 dark:hover:bg-gray-800 
                           transition-colors duration-200"
                >
                  {isPreviewOpen ? 'Hide Preview' : 'Show Preview'}
                  <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                    {normalizationStatus === 'loading' && (
                      <div className="w-2 h-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    )}
                    {normalizationStatus === 'valid' && (
                      <Tooltip content="Valid JSON-LD">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                      </Tooltip>
                    )}
                    {normalizationStatus === 'invalid' && (
                      <Tooltip content="Invalid JSON-LD">
                        <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500" />
                      </Tooltip>
                    )}
                  </div>
                </button>

                <button 
                  type="submit" 
                  disabled={normalizationStatus === 'invalid'}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
                             bg-blue-600 dark:bg-blue-500 text-white rounded-md
                             hover:bg-blue-700 dark:hover:bg-blue-600
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200`}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Panel */}
        {isPreviewOpen && (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">Preview</h2>
                <div className="flex items-center gap-1.5 pl-3 border-l border-gray-200 dark:border-gray-700">
                  {normalizationStatus === 'loading' && (
                    <div className="w-2 h-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  )}
                  {normalizationStatus === 'valid' && (
                    <Tooltip content="Valid JSON-LD">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                    </Tooltip>
                  )}
                  {normalizationStatus === 'invalid' && (
                    <Tooltip content="Invalid JSON-LD">
                      <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500" />
                    </Tooltip>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {normalizationStatus === 'valid' && 'Valid JSON-LD'}
                    {normalizationStatus === 'invalid' && 'Invalid JSON-LD'}
                    {normalizationStatus === 'loading' && 'Validating...'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const schema = getCompleteJsonSchema();
                    const example = generateExampleCredential(schema);
                    const text = normalizedView 
                      ? await normalizeCredential(example)
                      : JSON.stringify(example, null, 2);
                    navigator.clipboard.writeText(text);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm
                           bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
                           border border-gray-300 dark:border-gray-700 rounded-md
                           hover:bg-gray-50 dark:hover:bg-gray-800 
                           transition-colors duration-200"
                >
                  Copy
                </button>
                
                <button
                  type="button"
                  onClick={() => setNormalizedView(!normalizedView)}
                  className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm
                           bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
                           border border-gray-300 dark:border-gray-700 rounded-md
                           hover:bg-gray-50 dark:hover:bg-gray-800 
                           transition-colors duration-200"
                >
                  {normalizedView ? 'Show JSON' : 'Show Normalized'}
                </button>
              </div>
            </div>

            <div className="h-[400px]">
              <CodeEditor
                height="100%"
                language={normalizedView ? 'text' : 'json'}
                value={normalizedView ? normalizedData : JSON.stringify(previewData, null, 2)}
                readOnly={true}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}