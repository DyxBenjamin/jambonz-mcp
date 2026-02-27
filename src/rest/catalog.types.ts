import type { PermissionLevel } from "../config.js";

export type EndpointMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ParameterLocation = "path" | "query" | "header";

export interface OpenApiSchema {
  readonly type?: string;
  readonly enum?: readonly (string | number | boolean | null | { readonly value?: unknown })[];
  readonly items?: OpenApiSchema;
  readonly properties?: Readonly<Record<string, OpenApiSchema>>;
  readonly required?: readonly string[];
  readonly additionalProperties?: boolean | OpenApiSchema;
  readonly format?: string;
  readonly description?: string;
  readonly default?: unknown;
  readonly nullable?: boolean;
  readonly oneOf?: readonly OpenApiSchema[];
  readonly anyOf?: readonly OpenApiSchema[];
  readonly allOf?: readonly OpenApiSchema[];
  readonly $ref?: string;
}

export interface RestParameterDefinition {
  readonly name: string;
  readonly in: ParameterLocation;
  readonly required: boolean;
  readonly description?: string;
  readonly schema: OpenApiSchema;
}

export interface RestRequestBodyDefinition {
  readonly required: boolean;
  readonly contentType: string;
  readonly schema: OpenApiSchema;
}

export interface RestEndpointDefinition {
  readonly toolName: string;
  readonly domain: string;
  readonly endpointSlug: string;
  readonly sourcePath: string;
  readonly minimumPermissionLevel?: PermissionLevel;
  readonly method: EndpointMethod;
  readonly pathTemplate: string;
  readonly operationId: string;
  readonly summary?: string;
  readonly parameters: readonly RestParameterDefinition[];
  readonly requestBody?: RestRequestBodyDefinition;
  readonly componentsSchemas: Readonly<Record<string, OpenApiSchema>>;
}
