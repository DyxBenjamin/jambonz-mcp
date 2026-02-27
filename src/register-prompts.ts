import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";

export function registerPrompts(server: McpServer): void {
  server.registerPrompt(
    "jambonz_usage_guide",
    {
      title: "Jambonz Usage Guide",
      description: "Explains how to discover documentation resources and API tools exposed by this MCP server.",
      argsSchema: {
        task: z.string().min(1).optional()
      }
    },
    async ({ task }) => {
      const focus = task ? `Focus on this task: ${task}\n\n` : "";
      return {
        description: "Jambonz MCP usage guide",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text:
                `${focus}` +
                [
                  "Use resources for passive context first:",
                  "- Read `jambonz://docs/index` to discover local documentation.",
                  "- Read `jambonz://rest/catalog` to discover the REST tool surface.",
                  "- Read `jambonz://rest/usage` for calling conventions and concrete JSON examples.",
                  "- Read `jambonz://runtime/defaults` before any AccountSid-scoped call; if it exposes an `accountSid`, use that default instead of calling account discovery tools.",
                  "- Use the `jambonz://doc/{path}` resource template for a specific document.",
                  "- Use the `jambonz://schema/{operationId}` resource template for endpoint schema.",
                  "",
                  "Use tools for actions:",
                  "- Documentation tools: `jambonz_docs_search`, `jambonz_docs_read`, `jambonz_docs_schema`.",
                  "- REST tools are one-per-endpoint with names like `jambonz_<domain>_<endpoint_slug>`.",
                  "- Examples: `jambonz_alerts_list_alerts_by_account`, `jambonz_users_create_user`.",
                  "- For paginated endpoints, use `page: 1` for the first page and provide `count` when required.",
                  "- If `jambonz://runtime/defaults` already exposes an `accountSid`, do not call list-accounts only to discover it.",
                  "",
                  "For API calls, provide required query/path/body parameters exactly as documented by the endpoint schema."
                ].join("\n")
            }
          }
        ]
      };
    }
  );
}
