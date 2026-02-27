import { describe, expect, it } from "vitest";
import { createEndpointValidation } from "../src/rest/validators.js";
import type { RestEndpointDefinition } from "../src/rest/catalog.types.js";

const endpoint: RestEndpointDefinition = {
  toolName: "jambonz_alerts_list_alerts_by_account",
  domain: "alerts",
  endpointSlug: "list-alerts-by-account",
  sourcePath: "reference/rest-platform-management/alerts/list-alerts-by-account.mdx",
  method: "GET",
  pathTemplate: "/v1/Accounts/{AccountSid}/Alerts",
  operationId: "list-alerts-by-account",
  summary: "list alerts by account",
  parameters: [
    {
      name: "AccountSid",
      in: "path",
      required: true,
      schema: { type: "string" }
    },
    {
      name: "page",
      in: "query",
      required: false,
      schema: { type: "integer" }
    },
    {
      name: "severity",
      in: "query",
      required: false,
      schema: {
        type: "string",
        enum: ["critical", "warning"]
      }
    }
  ],
  componentsSchemas: {}
};

describe("endpoint validators", () => {
  it("accepts valid payloads", () => {
    const validator = createEndpointValidation(endpoint);
    const parsed = validator.parser.parse({
      pathParams: { AccountSid: "AC123" },
      query: { page: 1, severity: "critical" },
      includeHeaders: true
    }) as { query?: { page?: number; severity?: string } };

    expect(parsed.query?.page).toBe(1);
    expect(parsed.query?.severity).toBe("critical");
  });

  it("rejects invalid enum and unknown query fields", () => {
    const validator = createEndpointValidation(endpoint);

    expect(() =>
      validator.parser.parse({
        pathParams: { AccountSid: "AC123" },
        query: { severity: "info" }
      })
    ).toThrow();

    expect(() =>
      validator.parser.parse({
        pathParams: { AccountSid: "AC123" },
        query: { unknown: "x" }
      })
    ).toThrow();
  });
});
