import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types.js";
import { describe, expect, it } from "vitest";
import type { JambonzConfig } from "../src/config.js";
import { loadDocsRepository } from "../src/docs/index.js";
import { REST_ENDPOINTS } from "../src/rest/catalog.generated.js";
import type { FetchLike } from "../src/rest/client.js";
import { SERVER_INFO, createMcpServer } from "../src/server.js";

describe("jambonz mcp server", () => {
  it("exposes generated catalog with expected size and key tools", () => {
    expect(SERVER_INFO).toEqual({
      name: "jambonz-mcp",
      version: "0.1.0"
    });
    expect(REST_ENDPOINTS.length).toBe(108);
    expect(REST_ENDPOINTS.some((item) => item.toolName === "jambonz_users_create_user")).toBe(true);
    expect(REST_ENDPOINTS.some((item) => item.toolName === "jambonz_alerts_list_alerts_by_account")).toBe(true);
    expect(REST_ENDPOINTS.some((item) => item.toolName === "jambonz_recent_calls_list_recent_calls")).toBe(true);
    expect(
      REST_ENDPOINTS.find((item) => item.toolName === "jambonz_accounts_get_account_api_keys")?.minimumPermissionLevel
    ).toBe("ADMIN");
    expect(REST_ENDPOINTS.find((item) => item.toolName === "jambonz_accounts_create_api_key")?.minimumPermissionLevel).toBe(
      "ADMIN"
    );
    expect(
      REST_ENDPOINTS.find((item) => item.toolName === "jambonz_accounts_get_webhook_secret")?.minimumPermissionLevel
    ).toBe("ADMIN");
  });

  it("exposes docs tools and endpoint tools end-to-end", async () => {
    const docsRepository = await loadDocsRepository(path.resolve("tests/fixtures/jambonz-docs"));
    const fetchMock: FetchLike = async (input) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/Alerts")) {
        return new Response(JSON.stringify([{ id: "AL1" }]), { status: 200 });
      }
      return new Response(JSON.stringify({ sid: "US1" }), { status: 201 });
    };

    const server = await createMcpServer({
      docsRepository,
      config: buildConfig("ADMIN"),
      fetchImpl: fetchMock,
      restEndpoints: REST_ENDPOINTS
    });

    const client = new Client({
      name: "jambonz-mcp-test-client",
      version: "0.1.0"
    });

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    await client.connect(clientTransport);

    const tools = await client.listTools();
    expect(tools.tools.some((tool) => tool.name === "jambonz_docs_search")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "jambonz_alerts_list_alerts_by_account")).toBe(true);
    expect(tools.tools.some((tool) => tool.name === "echo")).toBe(false);

    const resources = await client.listResources();
    expect(resources.resources.some((resource) => resource.uri === "jambonz://docs/index")).toBe(true);
    expect(resources.resources.some((resource) => resource.uri === "jambonz://rest/catalog")).toBe(true);
    expect(resources.resources.some((resource) => resource.uri === "jambonz://rest/usage")).toBe(true);
    expect(resources.resources.some((resource) => resource.uri === "jambonz://runtime/defaults")).toBe(true);

    const templates = await client.listResourceTemplates();
    expect(templates.resourceTemplates.some((template) => template.uriTemplate === "jambonz://doc/{path}")).toBe(true);
    expect(
      templates.resourceTemplates.some((template) => template.uriTemplate === "jambonz://schema/{operationId}")
    ).toBe(true);

    const prompts = await client.listPrompts();
    expect(prompts.prompts.some((prompt) => prompt.name === "jambonz_usage_guide")).toBe(true);

    const docsIndex = await client.readResource({
      uri: "jambonz://docs/index"
    });
    const docsIndexText = docsIndex.contents.find((item) => "text" in item);
    expect(docsIndexText).toBeDefined();
    if (docsIndexText && "text" in docsIndexText) {
      expect(docsIndexText.text).toContain("developer-quickstart.mdx");
    }

    const restUsage = await client.readResource({
      uri: "jambonz://rest/usage"
    });
    const restUsageText = restUsage.contents.find((item) => "text" in item);
    expect(restUsageText).toBeDefined();
    if (restUsageText && "text" in restUsageText) {
      expect(restUsageText.text).toContain("page: 1");
      expect(restUsageText.text).toContain("count");
      expect(restUsageText.text).toContain("jambonz://runtime/defaults");
    }

    const runtimeDefaults = await client.readResource({
      uri: "jambonz://runtime/defaults"
    });
    const runtimeDefaultsText = runtimeDefaults.contents.find((item) => "text" in item);
    expect(runtimeDefaultsText).toBeDefined();
    if (runtimeDefaultsText && "text" in runtimeDefaultsText) {
      expect(runtimeDefaultsText.text).toContain('"permissionLevel": "ADMIN"');
      expect(runtimeDefaultsText.text).toContain('"accountSid": "AC123"');
    }

    const resourceDoc = await client.readResource({
      uri: "jambonz://doc/reference%2Frest-platform-management%2Fusers%2Fcreate-user.mdx"
    });
    const resourceDocText = resourceDoc.contents.find((item) => "text" in item);
    expect(resourceDocText).toBeDefined();
    if (resourceDocText && "text" in resourceDocText) {
      expect(resourceDocText.text).toContain("POST https://api.jambonz.cloud/v1/Accounts/{AccountSid}/Users");
    }

    const resourceSchema = await client.readResource({
      uri: "jambonz://schema/create-user"
    });
    const resourceSchemaText = resourceSchema.contents.find((item) => "text" in item);
    expect(resourceSchemaText).toBeDefined();
    if (resourceSchemaText && "text" in resourceSchemaText) {
      expect(resourceSchemaText.text).toContain("\"operationId\": \"create-user\"");
    }

    const docsResult = await client.callTool(
      {
        name: "jambonz_docs_search",
        arguments: {
          query: "users",
          scope: "all",
          limit: 5
        }
      },
      CallToolResultSchema
    );
    const parsedDocs = CallToolResultSchema.parse(docsResult);
    const docsText = parsedDocs.content.find((item) => item.type === "text");
    expect(docsText?.type).toBe("text");
    if (docsText?.type === "text") {
      expect(docsText.text).toContain("developer-quickstart.mdx");
    }

    const schemaResult = await client.callTool(
      {
        name: "jambonz_docs_schema",
        arguments: {
          operationId: "create-user",
          includeComponents: true
        }
      },
      CallToolResultSchema
    );
    const parsedSchema = CallToolResultSchema.parse(schemaResult);
    const schemaText = parsedSchema.content.find((item) => item.type === "text");
    expect(schemaText?.type).toBe("text");
    if (schemaText?.type === "text") {
      expect(schemaText.text).toContain("create-user");
      expect(schemaText.text).toContain("/v1/Accounts/{AccountSid}/Users");
    }

    const alertsResult = await client.callTool(
      {
        name: "jambonz_alerts_list_alerts_by_account",
        arguments: {
          query: {
            page: 1,
            count: 10
          }
        }
      },
      CallToolResultSchema
    );
    const parsedAlerts = CallToolResultSchema.parse(alertsResult);
    const alertsText = parsedAlerts.content.find((item) => item.type === "text");
    expect(alertsText?.type).toBe("text");
    if (alertsText?.type === "text") {
      expect(alertsText.text).toContain('"status": 200');
      expect(alertsText.text).toContain('"AL1"');
      expect(alertsText.text).toContain('/v1/Accounts/AC123/Alerts');
    }

    await client.close();
    await server.close();
  });

  it("blocks mutating tools when permission level is READ_ONLY", async () => {
    const docsRepository = await loadDocsRepository(path.resolve("tests/fixtures/jambonz-docs"));
    const createUser = REST_ENDPOINTS.find((item) => item.toolName === "jambonz_users_create_user");
    expect(createUser).toBeDefined();
    if (!createUser) {
      throw new Error("Expected create user endpoint in generated catalog.");
    }

    const server = await createMcpServer({
      docsRepository,
      config: buildConfig("READ_ONLY"),
      restEndpoints: [createUser]
    });

    const client = new Client({
      name: "jambonz-mcp-test-client",
      version: "0.1.0"
    });

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    await client.connect(clientTransport);

    const deniedResult = await client.callTool(
      {
        name: "jambonz_users_create_user",
        arguments: {}
      },
      CallToolResultSchema
    );

    const parsedDenied = CallToolResultSchema.parse(deniedResult);
    expect(parsedDenied.isError).toBe(true);
    const deniedText = parsedDenied.content.find((item) => item.type === "text");
    expect(deniedText?.type).toBe("text");
    if (deniedText?.type === "text") {
      expect(deniedText.text).toContain("Permission denied");
      expect(deniedText.text).not.toContain("Invalid arguments");
      expect(deniedText.text).not.toContain("Required");
    }

    await client.close();
    await server.close();
  });

  it("blocks sensitive credential-returning GET tools unless permission level is ADMIN", async () => {
    const docsRepository = await loadDocsRepository(path.resolve("tests/fixtures/jambonz-docs"));
    const getWebhookSecret = REST_ENDPOINTS.find((item) => item.toolName === "jambonz_accounts_get_webhook_secret");
    expect(getWebhookSecret).toBeDefined();
    if (!getWebhookSecret) {
      throw new Error("Expected get webhook secret endpoint in generated catalog.");
    }

    const server = await createMcpServer({
      docsRepository,
      config: buildConfig("READ_WRITE"),
      restEndpoints: [getWebhookSecret]
    });

    const client = new Client({
      name: "jambonz-mcp-test-client",
      version: "0.1.0"
    });

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    await client.connect(clientTransport);

    const deniedResult = await client.callTool(
      {
        name: "jambonz_accounts_get_webhook_secret",
        arguments: {}
      },
      CallToolResultSchema
    );

    const parsedDenied = CallToolResultSchema.parse(deniedResult);
    expect(parsedDenied.isError).toBe(true);
    const deniedText = parsedDenied.content.find((item) => item.type === "text");
    expect(deniedText?.type).toBe("text");
    if (deniedText?.type === "text") {
      expect(deniedText.text).toContain("JAMBONZ_API_PERMISSION_LEVEL=ADMIN");
      expect(deniedText.text).not.toContain("Invalid arguments");
    }

    await client.close();
    await server.close();
  });
});

function buildConfig(permissionLevel: JambonzConfig["permissionLevel"]): JambonzConfig {
  return {
    docsDir: path.resolve("tests/fixtures/jambonz-docs"),
    apiBaseUrl: "https://jambonz.cloud/api",
    apiToken: "token-1",
    accountSid: "AC123",
    permissionLevel,
    httpTimeoutMs: 5000,
    allowTokenOverride: false,
    allowBaseUrlOverride: false
  };
}
