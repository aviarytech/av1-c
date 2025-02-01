import type { JsonSchema, JsonSchemaProperty, FormProperty, FormData } from '../types/schema';

export const generateExampleCredential = (schema: any): any => {
  const generateExampleValue = (property: any): any => {
    if (property.example !== undefined) {
      return property.example;
    }

    switch (property.type) {
      case 'string':
        return 'example';
      case 'number':
        return 42;
      case 'boolean':
        return true;
      case 'object':
        if (!property.properties) return {};
        return Object.entries(property.properties).reduce((acc, [key, prop]: [string, any]) => ({
          ...acc,
          [key]: generateExampleValue(prop)
        }), {});
      case 'array':
        if (!property.items) return [];
        return [generateExampleValue(property.items)];
      default:
        return null;
    }
  };
  const credentialSubject = Object.entries(schema.properties.credentialSubject.properties).reduce(
    (acc, [key, prop]: [string, any]) => ({
      ...acc,
      [key]: generateExampleValue(prop)
    }), 
    {}
  );

  return {
    '@context': schema.properties['@context'].prefixItems.map((item: any) => item.const),
    'type': schema.properties.type.prefixItems.map((item: any) => item.const),
    ...(schema.properties.id && { 'id': 'urn:uuid:example-credential-id' }),
    'issuer': 'did:example:issuer',
    'validFrom': new Date().toISOString(),
    'credentialSubject': credentialSubject
  };
};

/**
 * Converts a string to PascalCase
 * @param str - The input string to convert
 * @returns The string in PascalCase format
 */
export const toPascalCase = (str: string): string => {
  // If it's already PascalCase, return as is
  if (/^[A-Z][a-zA-Z0-9]*$/.test(str)) {
    return str;
  }
  // Otherwise convert from space-separated
  return str
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

/**
 * Converts a JSON schema to form data format
 * @param schema - The JSON schema to convert
 * @returns The converted form data
 */
export function jsonSchemaToFormData(schema: JsonSchema): FormData {
  const convertProperties = (
    properties: { [key: string]: JsonSchemaProperty },
    parentRequired: string[] = []
  ): { [key: string]: FormProperty } => {
    const result: { [key: string]: FormProperty } = {};

    if ('properties' in properties && 
        typeof properties.properties === 'object' && 
        !('type' in properties)) {
      const nestedProps = properties.properties as unknown as { [key: string]: JsonSchemaProperty };
      const nestedRequired = Array.isArray(properties.required) ? properties.required : [];
      return convertProperties(nestedProps, nestedRequired);
    }

    Object.entries(properties).forEach(([key, prop]) => {
      if (key === 'required' && !prop.type) return;
      const propertyKey = prop.title || key;

      const formProp: FormProperty = {
        title: propertyKey,
        type: prop.type as FormProperty['type'],
        required: parentRequired.includes(propertyKey),
        $comment: prop.$comment,
        ...(prop.example !== undefined && { example: prop.example }),
      };

      if (prop.properties) {
        formProp.properties = convertProperties(prop.properties, prop.required || []);
      }

      if (prop.items) {
        if (Array.isArray(prop.items)) {
          formProp.items = prop.items.map(item => ({
            title: item.title,
            type: item.type as FormProperty['type'],
            required: false,
            $comment: item.$comment,
            ...(item.example !== undefined && { example: item.example }),
            ...(item.properties && {
              properties: convertProperties(item.properties, item.required || [])
            })
          }));
        } else {
          formProp.items = {
            title: prop.items.title,
            type: prop.items.type as FormProperty['type'],
            required: false,
            $comment: prop.items.$comment,
            ...(prop.items.example !== undefined && { example: prop.items.example }),
            ...(prop.items.properties && {
              properties: convertProperties(prop.items.properties, prop.items.required || [])
            })
          };
        }

        if (prop.minItems !== undefined) formProp.minItems = prop.minItems;
        if (prop.maxItems !== undefined) formProp.maxItems = prop.maxItems;
        if (prop.uniqueItems !== undefined) formProp.uniqueItems = prop.uniqueItems;
      }

      result[key] = formProp;
    });

    return result;
  };

  return {
    title: schema.title,
    $comment: schema.$comment || '',
    allowId: 'id' in schema.properties,
    properties: convertProperties(
      schema.properties.credentialSubject.properties,
      schema.properties.credentialSubject.required || []
    )
  };
}

/**
 * Converts form data back to a JSON schema
 * @param formData - The form data to convert
 * @returns The converted JSON schema
 */
export const formDataToJsonSchema = (formData: FormData): JsonSchema => {
  // Convert form properties to JSON schema properties
  const convertProperties = (props: { [key: string]: FormProperty }): { 
    properties: { [key: string]: JsonSchemaProperty },
    required: string[]
  } => {
    const properties: { [key: string]: JsonSchemaProperty } = {};
    const required: string[] = [];

    Object.entries(props).forEach(([key, prop]) => {
      properties[key] = {
        title: prop.title,
        type: prop.type,
        ...(prop.$comment && { $comment: prop.$comment }),
        ...(prop.example !== undefined && { example: prop.example }),
      };

      if (prop.required) {
        required.push(key);
      }

      if (prop.type === 'object' && prop.properties) {
        const nested = convertProperties(prop.properties);
        properties[key].properties = nested.properties;
        if (nested.required.length > 0) {
          properties[key].required = nested.required;
        }
      }

      if (prop.type === 'array' && prop.items) {
        if (Array.isArray(prop.items)) {
          properties[key].items = prop.items.map(item => ({
            title: item.title,
            type: item.type,
            ...(item.$comment && { $comment: item.$comment }),
            ...(item.example !== undefined && { example: item.example }),
            ...(item.properties && {
              properties: convertProperties(item.properties).properties
            })
          }));
        } else {
          properties[key].items = {
            title: prop.items.title,
            type: prop.items.type,
            ...(prop.items.$comment && { $comment: prop.items.$comment }),
            ...(prop.items.example !== undefined && { example: prop.items.example }),
            ...(prop.items.properties && {
              properties: convertProperties(prop.items.properties).properties
            })
          };
        }

        if (prop.minItems !== undefined) properties[key].minItems = prop.minItems;
        if (prop.maxItems !== undefined) properties[key].maxItems = prop.maxItems;
        if (prop.uniqueItems !== undefined) properties[key].uniqueItems = prop.uniqueItems;
      }
    });

    return { properties, required };
  };

  // Convert the form properties
  const { properties: convertedProps, required: subjectRequired } = convertProperties(formData.properties);

  return {
    title: toPascalCase(formData.title),
    ...(formData.$comment && { $comment: formData.$comment }),
    type: 'object',
    properties: {
      '@context': {
        type: 'array',
        items: {
          type: 'string'
        },
        minItems: 1,
        prefixItems: [{
          type: 'string',
          const: 'https://www.w3.org/ns/credentials/v2'
        }]
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
        ]
      },
      credentialSubject: {
        type: 'object',
        properties: convertedProps,
        ...(subjectRequired.length > 0 && { required: subjectRequired })
      }
    },
    required: ['@context', 'type', 'credentialSubject']
  };
};

/**
 * Validates if a property matches the FormProperty interface
 * @param prop - The property to validate
 * @returns True if the property is valid
 */
export const isValidFormProperty = (prop: any): prop is FormProperty => {
  return (
    typeof prop === 'object' &&
    prop !== null &&
    typeof prop.title === 'string' &&
    ['string', 'number', 'boolean', 'object', 'array'].includes(prop.type)
  );
}; 