import { describe, expect, it } from "vitest";
import { executeApiRequest } from "../src/rest/client.js";

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

describe("rest client", () => {
  it("builds URL with path and query and sends auth", async () => {
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;

    const fetchMock: FetchLike = async (input, init) => {
      capturedUrl = typeof input === "string" ? input : input.toString();
      capturedInit = init;
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          "content-type": "application/json"
        }
      });
    };

    const result = await executeApiRequest(
      {
        method: "GET",
        baseUrl: "https://jambonz.cloud/api",
        pathTemplate: "/v1/Accounts/{AccountSid}/Alerts",
        pathParams: { AccountSid: "AC123" },
        query: { page: 2, severity: "critical" },
        token: "token-1",
        timeoutMs: 5000
      },
      fetchMock
    );

    expect(result.ok).toBe(true);
    expect(capturedUrl).toContain("/api/v1/Accounts/AC123/Alerts");
    expect(capturedUrl).toContain("page=2");
    expect(capturedUrl).toContain("severity=critical");

    const headers = new Headers(capturedInit?.headers);
    expect(headers.get("Authorization")).toBe("Bearer token-1");
  });

  it("throws if a required path parameter is missing", async () => {
    await expect(
      executeApiRequest({
        method: "GET",
        baseUrl: "https://jambonz.cloud/api",
        pathTemplate: "/v1/Accounts/{AccountSid}/Alerts",
        pathParams: {},
        query: {},
        token: "token-1",
        timeoutMs: 5000
      })
    ).rejects.toThrow(/Missing required path parameter/);
  });
});
