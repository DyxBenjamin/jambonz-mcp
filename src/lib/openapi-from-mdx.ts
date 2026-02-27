import YAML from "yaml";
import type { EndpointMethod, OpenApiSchema, RestParameterDefinition, RestRequestBodyDefinition } from "../rest/catalog.types.js";

export interface ExtractedEndpointSpec {
  readonly method: EndpointMethod;
  readonly absoluteUrl: string;
  readonly pathTemplate: string;
  readonly operationId: string;
  readonly summary?: string;
  readonly parameters: readonly RestParameterDefinition[];
  readonly requestBody?: RestRequestBodyDefinition;
  readonly responseSchemas: readonly OpenApiSchema[];
  readonly componentsSchemas: Readonly<Record<string, OpenApiSchema>>;
}

type JsonObject = Record<string, unknown>;

export function extractEndpointSpecFromMdx(content: string): ExtractedEndpointSpec {
  const signature = extractSignature(content);
  const yamlBlock = extractOpenApiYamlBlock(content);
  const parsed = YAML.parse(yamlBlock);

  if (!isObject(parsed)) {
    throw new Error("OpenAPI block must parse to an object.");
  }

  const paths = getObject(parsed, "paths");
  const operation = getOperation(paths, signature.pathTemplate, signature.method);
  const operationId = getString(operation, "operationId");
  const summary = readOptionalString(operation, "summary");

  const components = getOptionalObject(parsed, "components");
  const schemas = components ? getOptionalObject(components, "schemas") : undefined;
  const componentsSchemas = normalizeComponentsSchemas(schemas);

  const parametersRaw = getOptionalArray(operation, "parameters") ?? [];
  const parameters = parametersRaw
    .map((item, index) => toParameterDefinition(item, index, componentsSchemas))
    .filter((parameter): parameter is RestParameterDefinition => parameter !== null)
    .filter((parameter) => parameter.in === "path" || parameter.in === "query");

  const requestBody = readRequestBody(operation, componentsSchemas);
  const responseSchemas = readResponseSchemas(operation, componentsSchemas);

  return {
    method: signature.method,
    absoluteUrl: signature.absoluteUrl,
    pathTemplate: signature.pathTemplate,
    operationId,
    ...(summary ? { summary } : {}),
    parameters,
    ...(requestBody ? { requestBody } : {}),
    responseSchemas,
    componentsSchemas
  };
}

function extractSignature(content: string): {
  readonly method: EndpointMethod;
  readonly absoluteUrl: string;
  readonly pathTemplate: string;
} {
  const match = content.match(/^(GET|POST|PUT|PATCH|DELETE)\s+(https?:\/\/\S+)$/m);
  if (!match) {
    throw new Error("Could not find endpoint signature line in document.");
  }

  const methodMatch = match[1];
  const urlMatch = match[2];
  if (!methodMatch || !urlMatch) {
    throw new Error("Endpoint signature groups are incomplete.");
  }

  const method = methodMatch as EndpointMethod;
  const absoluteUrl = urlMatch;
  const parsedUrl = new URL(absoluteUrl);
  const decodedPath = decodeURIComponent(parsedUrl.pathname);

  return {
    method,
    absoluteUrl,
    pathTemplate: decodedPath
  };
}

function extractOpenApiYamlBlock(content: string): string {
  const sectionIndex = content.search(/^##\s+OpenAPI Specification\s*$/im);
  if (sectionIndex < 0) {
    throw new Error("OpenAPI Specification section not found.");
  }

  const section = content.slice(sectionIndex);
  const blockMatch = section.match(/```ya?ml\n([\s\S]*?)\n```/i);
  if (!blockMatch) {
    throw new Error("OpenAPI YAML fenced block not found.");
  }

  const yamlBlock = blockMatch[1];
  if (!yamlBlock) {
    throw new Error("OpenAPI YAML fenced block is empty.");
  }
  return yamlBlock;
}

function getOperation(paths: JsonObject, pathTemplate: string, method: EndpointMethod): JsonObject {
  const candidates = [pathTemplate];
  if (pathTemplate.startsWith("/v1/")) {
    candidates.push(pathTemplate.slice(3));
  }

  let pathEntry: JsonObject | null = null;
  let matchedPath = "";
  for (const candidate of candidates) {
    const current = paths[candidate];
    if (isObject(current)) {
      pathEntry = current;
      matchedPath = candidate;
      break;
    }
  }

  if (!pathEntry) {
    throw new Error(`OpenAPI paths does not include ${pathTemplate}.`);
  }

  const methodEntry = pathEntry[method.toLowerCase()];
  if (!isObject(methodEntry)) {
    throw new Error(`OpenAPI operation ${method} ${matchedPath} not found in YAML block.`);
  }
  return methodEntry;
}

function normalizeComponentsSchemas(value: JsonObject | undefined): Readonly<Record<string, OpenApiSchema>> {
  if (!value) {
    return {};
  }
  const result: Record<string, OpenApiSchema> = {};
  for (const [key, schema] of Object.entries(value)) {
    if (isObject(schema)) {
      result[key] = toOpenApiSchema(schema);
    }
  }
  return result;
}

function toParameterDefinition(
  value: unknown,
  index: number,
  components: Readonly<Record<string, OpenApiSchema>>
): RestParameterDefinition | null {
  if (!isObject(value)) {
    throw new Error(`Invalid parameter at index ${index}.`);
  }

  const location = getString(value, "in");
  if (location !== "path" && location !== "query" && location !== "header") {
    return null;
  }

  const name = getString(value, "name");
  const required = readBoolean(value, "required") ?? false;
  const schemaValue = getObject(value, "schema");
  const schema = normalizeSchemaRefs(toOpenApiSchema(schemaValue), components);

  const description = readOptionalString(value, "description");
  return {
    name,
    in: location,
    required,
    ...(description ? { description } : {}),
    schema
  };
}

function readRequestBody(
  operation: JsonObject,
  components: Readonly<Record<string, OpenApiSchema>>
): RestRequestBodyDefinition | undefined {
  const raw = getOptionalObject(operation, "requestBody");
  if (!raw) {
    return undefined;
  }

  const content = getObject(raw, "content");
  const contentEntries = Object.entries(content).filter((entry) => isObject(entry[1]));
  if (contentEntries.length === 0) {
    return undefined;
  }

  const preferred = contentEntries.find(([key]) => key === "application/json") ?? contentEntries[0];
  if (!preferred) {
    return undefined;
  }
  const mediaType = preferred[0];
  const mediaObject = preferred[1];
  if (!isObject(mediaObject)) {
    return undefined;
  }

  const schemaValue = getObject(mediaObject, "schema");
  const schema = normalizeSchemaRefs(toOpenApiSchema(schemaValue), components);

  return {
    required: readBoolean(raw, "required") ?? false,
    contentType: mediaType,
    schema
  };
}

function readResponseSchemas(
  operation: JsonObject,
  components: Readonly<Record<string, OpenApiSchema>>
): readonly OpenApiSchema[] {
  const raw = getOptionalObject(operation, "responses");
  if (!raw) {
    return [];
  }

  const schemas: OpenApiSchema[] = [];
  for (const [statusCode, responseValue] of Object.entries(raw)) {
    if (!statusCode.startsWith("2") || !isObject(responseValue)) {
      continue;
    }

    const content = getOptionalObject(responseValue, "content");
    if (!content) {
      continue;
    }

    for (const mediaValue of Object.values(content)) {
      if (!isObject(mediaValue)) {
        continue;
      }
      const schemaValue = getOptionalObject(mediaValue, "schema");
      if (!schemaValue) {
        continue;
      }
      schemas.push(normalizeSchemaRefs(toOpenApiSchema(schemaValue), components));
    }
  }

  return schemas;
}

function normalizeSchemaRefs(
  schema: OpenApiSchema,
  components: Readonly<Record<string, OpenApiSchema>>,
  visited: ReadonlySet<string> = new Set<string>()
): OpenApiSchema {
  if (typeof schema.$ref === "string") {
    const refName = readRefName(schema.$ref);
    if (!refName) {
      return schema;
    }
    if (visited.has(refName)) {
      return schema;
    }
    const component = components[refName];
    if (!component) {
      return schema;
    }
    return normalizeSchemaRefs(component, components, new Set([...visited, refName]));
  }

  return {
    ...schema,
    ...(schema.items ? { items: normalizeSchemaRefs(schema.items, components, visited) } : {}),
    ...(schema.properties
      ? {
          properties: Object.fromEntries(
            Object.entries(schema.properties).map(([key, value]) => [key, normalizeSchemaRefs(value, components, visited)])
          )
        }
      : {}),
    ...(schema.oneOf ? { oneOf: schema.oneOf.map((item) => normalizeSchemaRefs(item, components, visited)) } : {}),
    ...(schema.anyOf ? { anyOf: schema.anyOf.map((item) => normalizeSchemaRefs(item, components, visited)) } : {}),
    ...(schema.allOf ? { allOf: schema.allOf.map((item) => normalizeSchemaRefs(item, components, visited)) } : {})
  };
}

function readRefName(ref: string): string | null {
  const match = ref.match(/^#\/components\/schemas\/(.+)$/);
  return match?.[1] ?? null;
}

function toOpenApiSchema(input: JsonObject): OpenApiSchema {
  const result: {
    type?: string;
    enum?: readonly (string | number | boolean | null | { readonly value?: unknown })[];
    items?: OpenApiSchema;
    properties?: Readonly<Record<string, OpenApiSchema>>;
    required?: readonly string[];
    additionalProperties?: boolean | OpenApiSchema;
    format?: string;
    description?: string;
    default?: unknown;
    nullable?: boolean;
    oneOf?: readonly OpenApiSchema[];
    anyOf?: readonly OpenApiSchema[];
    allOf?: readonly OpenApiSchema[];
    $ref?: string;
  } = {};

  const type = readOptionalString(input, "type");
  if (type) {
    result.type = type;
  }

  const enumValue = input.enum;
  if (Array.isArray(enumValue)) {
    result.enum = enumValue.filter(
      (item): item is string | number | boolean | null | { readonly value?: unknown } =>
        typeof item === "string" ||
        typeof item === "number" ||
        typeof item === "boolean" ||
        item === null ||
        isObject(item)
    );
  }

  const items = getOptionalObject(input, "items");
  if (items) {
    result.items = toOpenApiSchema(items);
  }

  const properties = getOptionalObject(input, "properties");
  if (properties) {
    result.properties = Object.fromEntries(
      Object.entries(properties)
        .filter((entry): entry is [string, JsonObject] => isObject(entry[1]))
        .map(([key, value]) => [key, toOpenApiSchema(value)])
    );
  }

  const required = getOptionalArray(input, "required");
  if (required) {
    result.required = required.filter((value): value is string => typeof value === "string");
  }

  const additional = input.additionalProperties;
  if (typeof additional === "boolean") {
    result.additionalProperties = additional;
  } else if (isObject(additional)) {
    result.additionalProperties = toOpenApiSchema(additional);
  }

  const format = readOptionalString(input, "format");
  if (format) {
    result.format = format;
  }

  const description = readOptionalString(input, "description");
  if (description) {
    result.description = description;
  }

  if (Object.prototype.hasOwnProperty.call(input, "default")) {
    result.default = input.default;
  }

  const nullable = readBoolean(input, "nullable");
  if (typeof nullable === "boolean") {
    result.nullable = nullable;
  }

  const ref = readOptionalString(input, "$ref");
  if (ref) {
    result.$ref = ref;
  }

  const oneOf = getOptionalArray(input, "oneOf");
  if (oneOf) {
    result.oneOf = oneOf.filter(isObject).map((entry) => toOpenApiSchema(entry));
  }

  const anyOf = getOptionalArray(input, "anyOf");
  if (anyOf) {
    result.anyOf = anyOf.filter(isObject).map((entry) => toOpenApiSchema(entry));
  }

  const allOf = getOptionalArray(input, "allOf");
  if (allOf) {
    result.allOf = allOf.filter(isObject).map((entry) => toOpenApiSchema(entry));
  }

  return result;
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getObject(input: JsonObject, key: string): JsonObject {
  const value = input[key];
  if (!isObject(value)) {
    throw new Error(`Expected object at key: ${key}`);
  }
  return value;
}

function getOptionalObject(input: JsonObject, key: string): JsonObject | undefined {
  const value = input[key];
  if (value === undefined) {
    return undefined;
  }
  return isObject(value) ? value : undefined;
}

function getOptionalArray(input: JsonObject, key: string): unknown[] | undefined {
  const value = input[key];
  if (value === undefined) {
    return undefined;
  }
  return Array.isArray(value) ? value : undefined;
}

function getString(input: JsonObject, key: string): string {
  const value = input[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Expected non-empty string at key: ${key}`);
  }
  return value;
}

function readOptionalString(input: JsonObject, key: string): string | undefined {
  const value = input[key];
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  return undefined;
}

function readBoolean(input: JsonObject, key: string): boolean | undefined {
  const value = input[key];
  if (typeof value === "boolean") {
    return value;
  }
  return undefined;
}
