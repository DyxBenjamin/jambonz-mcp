import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildCatalog } from "../tools/generate-rest-catalog.js";

describe("rest catalog generator", () => {
  it("builds endpoint catalog from fixture docs", async () => {
    const docsDir = path.resolve("tests/fixtures/jambonz-docs");
    const catalog = await buildCatalog(docsDir);

    expect(catalog.length).toBe(3);
    expect(catalog.some((item) => item.toolName === "jambonz_users_create_user")).toBe(true);
    expect(catalog.some((item) => item.toolName === "jambonz_alerts_list_alerts_by_account")).toBe(true);
    expect(catalog.some((item) => item.toolName === "jambonz_accounts_get_webhook_secret")).toBe(true);

    const alerts = catalog.find((item) => item.toolName === "jambonz_alerts_list_alerts_by_account");
    expect(alerts?.method).toBe("GET");
    expect(alerts?.pathTemplate).toBe("/v1/Accounts/{AccountSid}/Alerts");

    const webhookSecret = catalog.find((item) => item.toolName === "jambonz_accounts_get_webhook_secret");
    expect(webhookSecret?.minimumPermissionLevel).toBe("ADMIN");
  });
});
