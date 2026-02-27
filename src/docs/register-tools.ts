import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { readDoc, readSchema, searchDocs, type DocsRepository } from "./index.js";

export function registerDocsTools(server: McpServer, repository: DocsRepository): void {
  server.registerTool(
    "jambonz_docs_search",
    {
      title: "Jambonz Docs Search",
      description: "Search local Jambonz documentation (docs/jambonz).",
      inputSchema: {
        query: z.string().min(2),
        scope: z
          .enum(["all", "guides", "reference", "verbs", "sdks", "tutorials", "self-hosting"])
          .optional()
          .default("all"),
        limit: z.number().int().min(1).max(25).optional().default(10)
      }
    },
    async ({ query, scope, limit }) => {
      const result = searchDocs(repository, query, scope, limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ results: result }, null, 2)
          }
        ]
      };
    }
  );

  server.registerTool(
    "jambonz_docs_read",
    {
      title: "Jambonz Docs Read",
      description: "Read one local Jambonz document by path.",
      inputSchema: {
        path: z.string().min(1),
        maxChars: z.number().int().min(500).max(50000).optional().default(12000)
      }
    },
    async ({ path, maxChars }) => {
      const entry = readDoc(repository, path, maxChars);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                path: entry.localPath,
                sourceUrl: entry.sourceUrl,
                title: entry.title,
                content: entry.content
              },
              null,
              2
            )
          }
        ]
      };
    }
  );

  server.registerTool(
    "jambonz_docs_schema",
    {
      title: "Jambonz Docs Schema",
      description: "Extract endpoint OpenAPI schema from local docs by operationId or doc path.",
      inputSchema: {
        operationId: z.string().min(1).optional(),
        docPath: z.string().min(1).optional(),
        includeComponents: z.boolean().optional().default(true)
      }
    },
    async (input) => {
      if (!input.operationId && !input.docPath) {
        throw new Error("Provide operationId or docPath.");
      }
      if (input.operationId && input.docPath) {
        throw new Error("Provide either operationId or docPath, not both.");
      }

      const schema = readSchema(repository, {
        ...(input.operationId ? { operationId: input.operationId } : {}),
        ...(input.docPath ? { docPath: input.docPath } : {}),
        includeComponents: input.includeComponents
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(schema, null, 2)
          }
        ]
      };
    }
  );
}
