import path from "node:path";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { JambonzConfig } from "../config.js";
import type { DocsRepository } from "./index.js";
import { readDoc, readSchema } from "./index.js";
import type { RestEndpointDefinition } from "../rest/catalog.types.js";

export function registerDocsResources(
  server: McpServer,
  repository: DocsRepository,
  restEndpoints: readonly RestEndpointDefinition[],
  config: JambonzConfig
): void {
  server.registerResource(
    "jambonz_docs_index",
    "jambonz://docs/index",
    {
      title: "Jambonz Docs Index",
      description: "Index of locally synced Jambonz documentation.",
      mimeType: "application/json"
    },
    async (uri) => {
      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: "application/json",
            text: JSON.stringify(
              {
                ready: repository.ready,
                total: repository.entries.length,
                paths: repository.entries.map((entry) => entry.localPath)
              },
              null,
              2
            )
          }
        ]
      };
    }
  );

  server.registerResource(
    "jambonz_rest_catalog",
    "jambonz://rest/catalog",
    {
      title: "Jambonz REST Tool Catalog",
      description: "Summary of REST endpoint tools exposed by this server.",
      mimeType: "application/json"
    },
    async (uri) => {
      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: "application/json",
            text: JSON.stringify(
              {
                total: restEndpoints.length,
                endpoints: restEndpoints.map((endpoint) => ({
                  toolName: endpoint.toolName,
                  method: endpoint.method,
                  pathTemplate: endpoint.pathTemplate,
                  operationId: endpoint.operationId,
                  sourcePath: endpoint.sourcePath
                }))
              },
              null,
              2
            )
          }
        ]
      };
    }
  );

  server.registerResource(
    "jambonz_rest_usage",
    "jambonz://rest/usage",
    {
      title: "Jambonz REST Usage Guide",
      description: "Calling conventions and practical examples for Jambonz REST tools.",
      mimeType: "text/markdown"
    },
    async (uri) => {
      const text = [
        "# Jambonz REST Tool Usage",
        "",
        "Use `jambonz://rest/catalog` to discover the full REST tool surface.",
        "Use `jambonz://runtime/defaults` to see runtime defaults such as the configured permission level and default AccountSid.",
        "Use `jambonz://schema/{operationId}` to inspect one endpoint schema before calling its tool.",
        "",
        "Rules:",
        "- Tools are one-per-endpoint and use names like `jambonz_<domain>_<endpoint_slug>`.",
        "- Required `path`, `query`, and `body` fields must be supplied exactly as the endpoint schema defines.",
        "- If `jambonz://runtime/defaults` shows an `accountSid`, omit `pathParams.AccountSid` and the server will apply it automatically.",
        "- Pagination is 1-based: use `page: 1` for the first page.",
        "- If an endpoint requires `count`, supply it explicitly.",
        "",
        "Examples:",
        "",
        "List alerts by account:",
        "```json",
        "{",
        '  "query": {',
        '    "page": 1,',
        '    "count": 20',
        "  }",
        "}",
        "```",
        "",
        "Create user:",
        "```json",
        "{",
        '  "body": {',
        '    "name": "Jane",',
        '    "email": "jane@example.com",',
        '    "is_active": true,',
        '    "force_change": false,',
        '    "initial_password": "secret-1",',
        '    "is_view_only": false',
        "  }",
        "}",
        "```"
      ].join("\n");

      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: "text/markdown",
            text
          }
        ]
      };
    }
  );

  server.registerResource(
    "jambonz_runtime_defaults",
    "jambonz://runtime/defaults",
    {
      title: "Jambonz Runtime Defaults",
      description: "Current non-secret runtime defaults that influence tool execution.",
      mimeType: "application/json"
    },
    async (uri) => {
      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: "application/json",
            text: JSON.stringify(
              {
                permissionLevel: config.permissionLevel,
                hasDefaultAccountSid: Boolean(config.accountSid),
                ...(config.accountSid
                  ? {
                      accountSid: config.accountSid,
                      accountSidUsage:
                        "For routes that include {AccountSid}, omit pathParams.AccountSid to use this configured default."
                    }
                  : {
                      accountSidUsage:
                        "No default AccountSid is configured. Provide pathParams.AccountSid or accountSid for AccountSid-scoped routes."
                    })
              },
              null,
              2
            )
          }
        ]
      };
    }
  );

  const docTemplate = new ResourceTemplate("jambonz://doc/{path}", {
    list: async () => ({
      resources: repository.entries.map((entry) => ({
        uri: buildDocResourceUri(entry.localPath),
        name: entry.title,
        description: entry.localPath,
        mimeType: "text/markdown"
      }))
    }),
    complete: {
      path: (value: string) => completePrefix(repository.entries.map((entry) => entry.localPath), value)
    }
  });

  server.registerResource(
    "jambonz_doc",
    docTemplate,
    {
      title: "Jambonz Document",
      description: "Read a specific Jambonz document by path.",
      mimeType: "text/markdown"
    },
    async (uri, variables) => {
      const rawPath = readVariable(variables.path, "path");
      const docPath = decodeURIComponent(rawPath);
      const entry = readDoc(repository, docPath, 50000);
      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: "text/markdown",
            text: entry.content
          }
        ]
      };
    }
  );

  const schemaTemplate = new ResourceTemplate("jambonz://schema/{operationId}", {
    list: async () => ({
      resources: restEndpoints.map((endpoint) => ({
        uri: buildSchemaResourceUri(endpoint.operationId),
        name: endpoint.operationId,
        description: endpoint.sourcePath,
        mimeType: "application/json"
      }))
    }),
    complete: {
      operationId: (value: string) => completePrefix(restEndpoints.map((endpoint) => endpoint.operationId), value)
    }
  });

  server.registerResource(
    "jambonz_schema",
    schemaTemplate,
    {
      title: "Jambonz Endpoint Schema",
      description: "Read a parsed OpenAPI schema for a documented endpoint.",
      mimeType: "application/json"
    },
    async (uri, variables) => {
      const operationId = decodeURIComponent(readVariable(variables.operationId, "operationId"));
      const schema = readSchema(repository, {
        operationId,
        includeComponents: true
      });
      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: "application/json",
            text: JSON.stringify(schema, null, 2)
          }
        ]
      };
    }
  );
}

function buildDocResourceUri(docPath: string): string {
  return `jambonz://doc/${encodeURIComponent(docPath)}`;
}

function buildSchemaResourceUri(operationId: string): string {
  return `jambonz://schema/${encodeURIComponent(operationId)}`;
}

function completePrefix(values: readonly string[], prefix: string): string[] {
  return values.filter((value) => value.startsWith(prefix)).slice(0, 50);
}

function readVariable(value: unknown, key: string): string {
  if (Array.isArray(value)) {
    const joined = value.join("/");
    if (joined.length > 0) {
      return joined;
    }
  }
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  throw new Error(`Missing resource template variable: ${key}`);
}
