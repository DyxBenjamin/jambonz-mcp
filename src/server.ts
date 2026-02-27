import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadConfig, type JambonzConfig } from "./config.js";
import { loadDocsRepository, type DocsRepository } from "./docs/index.js";
import { registerDocsResources } from "./docs/register-resources.js";
import { registerDocsTools } from "./docs/register-tools.js";
import { registerPrompts } from "./register-prompts.js";
import { REST_ENDPOINTS } from "./rest/catalog.generated.js";
import type { RestEndpointDefinition } from "./rest/catalog.types.js";
import { registerRestTools } from "./rest/register-tools.js";
import type { FetchLike } from "./rest/client.js";

export interface ServerInfo {
  readonly name: string;
  readonly version: string;
}

export interface CreateMcpServerOptions {
  readonly config?: JambonzConfig;
  readonly docsRepository?: DocsRepository;
  readonly restEndpoints?: readonly RestEndpointDefinition[];
  readonly fetchImpl?: FetchLike;
}

export const SERVER_INFO: Readonly<ServerInfo> = {
  name: "jambonz-mcp",
  version: "0.1.0"
} as const;

export async function createMcpServer(options: CreateMcpServerOptions = {}): Promise<McpServer> {
  const config = options.config ?? loadConfig();
  const docsRepository = options.docsRepository ?? (await loadDocsRepository(config.docsDir));
  const restEndpoints = options.restEndpoints ?? REST_ENDPOINTS;

  const server = new McpServer({
    name: SERVER_INFO.name,
    version: SERVER_INFO.version
  });

  registerDocsResources(server, docsRepository, restEndpoints, config);
  registerDocsTools(server, docsRepository);
  registerPrompts(server);
  registerRestTools(server, {
    config,
    endpoints: restEndpoints,
    ...(options.fetchImpl ? { fetchImpl: options.fetchImpl } : {})
  });

  return server;
}
