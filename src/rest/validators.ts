import * as z from "zod/v4";
import type { OpenApiSchema, RestEndpointDefinition, RestParameterDefinition } from "./catalog.types.js";

export interface EndpointToolInput {
  readonly pathParams?: Readonly<Record<string, string>>;
  readonly query?: Readonly<Record<string, unknown>>;
  readonly body?: unknown;
  readonly accountSid?: string;
  readonly token?: string;
  readonly baseUrl?: string;
  readonly timeoutMs?: number;
  readonly includeHeaders?: boolean;
}

export interface EndpointValidationArtifacts {
  readonly inputShape: Record<string, z.ZodType>;
  readonly parser: z.ZodObject<Record<string, z.ZodType>>;
}

export function createEndpointValidation(endpoint: RestEndpointDefinition): EndpointValidationArtifacts {
  const pathParamsShape = parameterShape(endpoint.parameters, "path", endpoint.componentsSchemas);
  const queryShape = parameterShape(endpoint.parameters, "query", endpoint.componentsSchemas);

  const shape: Record<string, z.ZodType> = {
    pathParams: z.object(pathParamsShape).strict().optional(),
    query: z.object(queryShape).strict().optional(),
    accountSid: z.string().min(1).optional(),
    token: z.string().min(1).optional(),
    baseUrl: z.string().url().optional(),
    timeoutMs: z.number().int().min(1000).max(60000).optional(),
    includeHeaders: z.boolean().optional().default(false)
  };

  if (endpoint.requestBody) {
    const bodySchema = describeSchema(
      toZodSchema(endpoint.requestBody.schema, endpoint.componentsSchemas),
      buildRequestBodyDescription(endpoint.requestBody.schema)
    );
    shape.body = endpoint.requestBody.required ? bodySchema : bodySchema.optional();
  } else {
    shape.body = z.never().optional();
  }

  const parser = z.object(shape).strict();
  return {
    inputShape: shape,
    parser
  };
}

function parameterShape(
  parameters: readonly RestParameterDefinition[],
  location: RestParameterDefinition["in"],
  componentsSchemas: Readonly<Record<string, OpenApiSchema>>
): Record<string, z.ZodType> {
  return Object.fromEntries(
    parameters
      .filter((parameter) => parameter.in === location)
      .map((parameter) => {
        const base = describeSchema(
          toZodSchema(parameter.schema, componentsSchemas),
          buildParameterDescription(parameter)
        );
        const value = parameter.required ? base : base.optional();
        return [parameter.name, value];
      })
  );
}

export function toZodSchema(
  schema: OpenApiSchema,
  componentsSchemas: Readonly<Record<string, OpenApiSchema>>,
  visited: ReadonlySet<string> = new Set<string>()
): z.ZodType {
  const resolved = resolveRef(schema, componentsSchemas, visited);

  if (resolved.oneOf && resolved.oneOf.length > 0) {
    const variants = resolved.oneOf.map((item) => toZodSchema(item, componentsSchemas, visited));
    const union =
      variants.length === 1
        ? variants[0]!
        : z.union(variants as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]);
    return applyNullable(union, resolved);
  }

  if (resolved.anyOf && resolved.anyOf.length > 0) {
    const variants = resolved.anyOf.map((item) => toZodSchema(item, componentsSchemas, visited));
    const union =
      variants.length === 1
        ? variants[0]!
        : z.union(variants as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]);
    return applyNullable(union, resolved);
  }

  if (resolved.allOf && resolved.allOf.length > 0) {
    const mapped = resolved.allOf.map((item) => toZodSchema(item, componentsSchemas, visited));
    const base = mapped.reduce((acc, current) => z.intersection(acc, current));
    return applyNullable(base, resolved);
  }

  const enumValues = extractEnumValues(resolved.enum);
  if (enumValues.length > 0) {
    return applyNullable(enumToSchema(enumValues), resolved);
  }

  switch (resolved.type) {
    case "string":
      return applyNullable(describeSchema(z.string(), resolved.description), resolved);
    case "integer":
      return applyNullable(describeSchema(z.number().int(), resolved.description), resolved);
    case "number":
      return applyNullable(describeSchema(z.number(), resolved.description), resolved);
    case "boolean":
      return applyNullable(describeSchema(z.boolean(), resolved.description), resolved);
    case "array": {
      const itemSchema = resolved.items ? toZodSchema(resolved.items, componentsSchemas, visited) : z.unknown();
      return applyNullable(z.array(itemSchema), resolved);
    }
    case "object": {
      const objectSchema = buildObjectSchema(resolved, componentsSchemas, visited);
      return applyNullable(objectSchema, resolved);
    }
    default: {
      if (resolved.properties || resolved.additionalProperties) {
        const objectSchema = buildObjectSchema(resolved, componentsSchemas, visited);
        return applyNullable(objectSchema, resolved);
      }
      return applyNullable(z.unknown(), resolved);
    }
  }
}

function buildObjectSchema(
  schema: OpenApiSchema,
  componentsSchemas: Readonly<Record<string, OpenApiSchema>>,
  visited: ReadonlySet<string>
): z.ZodType {
  const required = new Set(schema.required ?? []);
  const properties = schema.properties ?? {};

  const shape: Record<string, z.ZodType> = Object.fromEntries(
    Object.entries(properties).map(([key, value]) => {
      const propertySchema = toZodSchema(value, componentsSchemas, visited);
      return [key, required.has(key) ? propertySchema : propertySchema.optional()];
    })
  );

  let base = z.object(shape).strict() as z.ZodType;
  if (schema.additionalProperties === true) {
    base = z.record(z.string(), z.unknown());
  } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
    base = z.record(z.string(), toZodSchema(schema.additionalProperties, componentsSchemas, visited));
  }

  return base;
}

function resolveRef(
  schema: OpenApiSchema,
  componentsSchemas: Readonly<Record<string, OpenApiSchema>>,
  visited: ReadonlySet<string>
): OpenApiSchema {
  if (typeof schema.$ref !== "string") {
    return schema;
  }

  const refName = readRefName(schema.$ref);
  if (!refName || visited.has(refName)) {
    return schema;
  }

  const resolved = componentsSchemas[refName];
  if (!resolved) {
    return schema;
  }

  return resolveRef(resolved, componentsSchemas, new Set([...visited, refName]));
}

function readRefName(ref: string): string | null {
  const match = ref.match(/^#\/components\/schemas\/(.+)$/);
  return match?.[1] ?? null;
}

function extractEnumValues(value: OpenApiSchema["enum"]): readonly (string | number | boolean | null)[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const result: (string | number | boolean | null)[] = [];
  for (const item of value) {
    if (typeof item === "string" || typeof item === "number" || typeof item === "boolean" || item === null) {
      result.push(item);
      continue;
    }
    if (item && typeof item === "object" && "value" in item) {
      const nested = item.value;
      if (
        typeof nested === "string" ||
        typeof nested === "number" ||
        typeof nested === "boolean" ||
        nested === null
      ) {
        result.push(nested);
      }
    }
  }
  return result;
}

function enumToSchema(values: readonly (string | number | boolean | null)[]): z.ZodType {
  if (values.length === 1) {
    return z.literal(values[0]);
  }
  if (values.every((value): value is string => typeof value === "string")) {
    return z.enum([...values]);
  }
  const literals = values.map((value) => z.literal(value));
  return z.union(literals as unknown as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]);
}

function applyNullable(schema: z.ZodType, openApiSchema: OpenApiSchema): z.ZodType {
  return openApiSchema.nullable ? schema.nullable() : schema;
}

function describeSchema(schema: z.ZodType, description?: string): z.ZodType {
  if (!description || description.trim().length === 0) {
    return schema;
  }
  return schema.describe(description.trim());
}

function buildParameterDescription(parameter: RestParameterDefinition): string {
  const parts: string[] = [`${parameter.in} parameter`, parameter.required ? "required" : "optional"];

  if (parameter.description) {
    parts.push(parameter.description);
  }

  const enumValues = extractEnumValues(parameter.schema.enum);
  if (enumValues.length > 0) {
    parts.push(`Allowed values: ${enumValues.map(String).join(", ")}`);
  }

  if (parameter.name === "page") {
    parts.push("Pagination is 1-based; use page 1 for the first page.");
  }

  if (parameter.name === "count") {
    parts.push("Number of records to return in the page.");
  }

  return parts.join(". ");
}

function buildRequestBodyDescription(schema: OpenApiSchema): string {
  const required = schema.required ?? [];
  if (required.length === 0) {
    return "JSON request body.";
  }
  return `JSON request body. Required fields: ${required.join(", ")}.`;
}
