import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import type { JambonzConfig } from "../config.js";
import { executeApiRequest, type FetchLike } from "./client.js";
import { assertMethodAllowed, isMethodAllowed, resolveEndpointPermission } from "./permissions.js";
import { createEndpointValidation, type EndpointToolInput } from "./validators.js";
import type { RestEndpointDefinition } from "./catalog.types.js";

export interface RegisterRestToolsDependencies {
  readonly config: JambonzConfig;
  readonly endpoints: readonly RestEndpointDefinition[];
  readonly fetchImpl?: FetchLike;
}

export function registerRestTools(server: McpServer, dependencies: RegisterRestToolsDependencies): void {
  const fetchImpl = dependencies.fetchImpl ?? globalThis.fetch;

  for (const endpoint of dependencies.endpoints) {
    const artifacts = createEndpointValidation(endpoint);
    const allowedAtCurrentLevel = isMethodAllowed(
      dependencies.config.permissionLevel,
      endpoint.method,
      endpoint.minimumPermissionLevel
    );

    server.registerTool(
      endpoint.toolName,
      {
        title: buildToolTitle(endpoint),
        description: buildToolDescription(endpoint, dependencies.config),
        inputSchema: allowedAtCurrentLevel ? artifacts.inputShape : buildPermissionGateInputShape()
      },
      async (input: EndpointToolInput) => {
        assertMethodAllowed(dependencies.config.permissionLevel, endpoint.method, endpoint.minimumPermissionLevel);

        const parsed = artifacts.parser.parse(input) as EndpointToolInput;

        const token = resolveToken(parsed, dependencies.config);
        const baseUrl = resolveBaseUrl(parsed, dependencies.config);
        const pathParams = resolvePathParams(parsed, endpoint.pathTemplate, dependencies.config.accountSid);
        const query: Record<string, unknown> = parsed.query ? { ...parsed.query } : {};
        const timeoutMs = parsed.timeoutMs ?? dependencies.config.httpTimeoutMs;

        const result = await executeApiRequest(
          {
            method: endpoint.method,
            baseUrl,
            pathTemplate: endpoint.pathTemplate,
            pathParams,
            query,
            token,
            timeoutMs,
            ...(parsed.body !== undefined ? { body: parsed.body } : {})
          },
          fetchImpl
        );

        const payload = {
          ok: result.ok,
          status: result.status,
          method: result.method,
          url: result.url,
          operationId: endpoint.operationId,
          data: result.data,
          ...(parsed.includeHeaders ? { responseHeaders: result.responseHeaders } : {})
        };

        return {
          ...(result.ok ? {} : { isError: true }),
          content: [
            {
              type: "text",
              text: JSON.stringify(payload, null, 2)
            }
          ]
        };
      }
    );
  }
}

function buildToolTitle(endpoint: RestEndpointDefinition): string {
  const domain = endpoint.domain.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const action = (endpoint.summary ?? endpoint.operationId).replace(/\b\w/g, (char) => char.toUpperCase());
  return `Jambonz ${domain}: ${action}`;
}

function buildToolDescription(endpoint: RestEndpointDefinition, config: JambonzConfig): string {
  const requiredPath = endpoint.parameters.filter((parameter) => parameter.in === "path" && parameter.required);
  const requiredQuery = endpoint.parameters.filter((parameter) => parameter.in === "query" && parameter.required);
  const optionalQuery = endpoint.parameters.filter((parameter) => parameter.in === "query" && !parameter.required);

  const lines: string[] = [
    `${endpoint.method} ${endpoint.pathTemplate}`,
    `Operation: ${endpoint.operationId}.`,
    `Current permission level: ${config.permissionLevel}.`,
    `Required permission level: ${resolveEndpointPermission(endpoint)}.`
  ];

  if (!isMethodAllowed(config.permissionLevel, endpoint.method, endpoint.minimumPermissionLevel)) {
    lines.push(`This method is currently blocked and requires elevating JAMBONZ_API_PERMISSION_LEVEL before execution.`);
  }

  if (endpoint.minimumPermissionLevel === "ADMIN") {
    lines.push("This endpoint returns sensitive credential material and is restricted to ADMIN.");
  }

  if (requiredPath.length > 0) {
    lines.push(`Required path params: ${requiredPath.map((parameter) => parameter.name).join(", ")}.`);
  }

  if (endpoint.pathTemplate.includes("{AccountSid}")) {
    if (config.accountSid) {
      lines.push("Default `AccountSid` is already configured on this server and will be applied automatically.");
    } else {
      lines.push("`AccountSid` can be omitted only if `JAMBONZ_ACCOUNT_SID` is configured on the server.");
    }
  }

  if (requiredQuery.length > 0) {
    lines.push(`Required query params: ${requiredQuery.map((parameter) => parameter.name).join(", ")}.`);
  }

  if (optionalQuery.length > 0) {
    lines.push(`Optional query params: ${optionalQuery.map((parameter) => parameter.name).join(", ")}.`);
  }

  if (requiredQuery.some((parameter) => parameter.name === "page")) {
    lines.push("Pagination is 1-based: use `page: 1` for the first page.");
  }

  if (endpoint.requestBody) {
    const requiredBodyFields = endpoint.requestBody.schema.required ?? [];
    if (requiredBodyFields.length > 0) {
      lines.push(`Required body fields: ${requiredBodyFields.join(", ")}.`);
    } else {
      lines.push("Accepts a JSON request body.");
    }
  }

  return lines.join(" ");
}

function buildPermissionGateInputShape(): Record<string, z.ZodType> {
  return {
    pathParams: z.record(z.string(), z.unknown()).optional(),
    query: z.record(z.string(), z.unknown()).optional(),
    body: z.unknown().optional(),
    accountSid: z.unknown().optional(),
    token: z.unknown().optional(),
    baseUrl: z.unknown().optional(),
    timeoutMs: z.unknown().optional(),
    includeHeaders: z.unknown().optional()
  };
}

function resolveToken(input: EndpointToolInput, config: JambonzConfig): string {
  if (input.token) {
    if (!config.allowTokenOverride) {
      throw new Error("Token override is disabled by JAMBONZ_ALLOW_TOKEN_OVERRIDE.");
    }
    return input.token;
  }

  if (!config.apiToken) {
    throw new Error("Missing API token. Set JAMBONZ_API_TOKEN or enable per-call token override.");
  }
  return config.apiToken;
}

function resolveBaseUrl(input: EndpointToolInput, config: JambonzConfig): string {
  if (input.baseUrl) {
    if (!config.allowBaseUrlOverride) {
      throw new Error("Base URL override is disabled by JAMBONZ_ALLOW_BASE_URL_OVERRIDE.");
    }
    return normalizeBaseUrl(input.baseUrl);
  }

  return normalizeBaseUrl(config.apiBaseUrl);
}

function normalizeBaseUrl(value: string): string {
  const parsed = new URL(value);
  if (parsed.protocol !== "https:") {
    throw new Error("Base URL must use https.");
  }
  return parsed.toString().replace(/\/$/, "");
}

function resolvePathParams(
  input: EndpointToolInput,
  pathTemplate: string,
  defaultAccountSid?: string
): Readonly<Record<string, string>> {
  const params: Record<string, string> = {
    ...(input.pathParams ?? {})
  };

  if (pathTemplate.includes("{AccountSid}")) {
    const explicit = params.AccountSid;
    if (!explicit || explicit.length === 0) {
      if (input.accountSid && input.accountSid.length > 0) {
        params.AccountSid = input.accountSid;
      } else if (defaultAccountSid && defaultAccountSid.length > 0) {
        params.AccountSid = defaultAccountSid;
      }
    }
  }

  return params;
}
