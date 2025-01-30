/**
 * Represents a JSON Schema for a Verifiable Credential
 */
export interface JsonSchema {
  title: string;
  $comment?: string;
  type: string;
  properties: {
    '@context': {
      type: string;
      items: { type: string };
      prefixItems: Array<{ type: string; const: string }>;
      minItems?: number;
    };
    id?: {
      type: string;
      format?: string;
    };
    type: {
      type: string;
      items: { type: string };
      prefixItems: Array<{ type: string; const: string }>;
    };
    credentialSubject: {
      type: string;
      title?: string;
      properties: { [key: string]: JsonSchemaProperty };
      required?: string[];
    };
  };
  required?: string[];
}

/**
 * Represents a property in a JSON Schema
 */
export interface JsonSchemaProperty {
  title: string;
  type: string;
  $comment?: string;
  properties?: { [key: string]: JsonSchemaProperty };
  items?: JsonSchemaProperty | JsonSchemaProperty[];
  required?: string[];
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  example?: any;
}

/**
 * Represents a form property in the schema editor
 */
export interface FormProperty {
  title: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  $comment?: string;
  example?: any;
  properties?: { [key: string]: FormProperty };
  items?: FormProperty | FormProperty[];
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  enum?: string[];
}

/**
 * Represents a path to a property in the form structure
 */
export type FormPropertyPath = (number | 'properties' | 'items')[];

/**
 * Represents the form data structure for the schema editor
 */
export interface FormData {
  title: string;
  $comment?: string;
  allowId?: boolean;
  properties: { [key: string]: FormProperty };
}

export interface Context {
  uri: string;
  prefix?: string;
  description?: string;
}