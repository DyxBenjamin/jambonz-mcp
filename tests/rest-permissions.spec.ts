import { describe, expect, it } from "vitest";
import { assertMethodAllowed, isMethodAllowed, resolveEndpointPermission } from "../src/rest/permissions.js";

describe("rest permissions", () => {
  it("enforces READ_ONLY permissions", () => {
    expect(isMethodAllowed("READ_ONLY", "GET")).toBe(true);
    expect(isMethodAllowed("READ_ONLY", "POST")).toBe(false);
    expect(() => assertMethodAllowed("READ_ONLY", "DELETE")).toThrow(/Permission denied/);
  });

  it("enforces READ_WRITE permissions", () => {
    expect(isMethodAllowed("READ_WRITE", "GET")).toBe(true);
    expect(isMethodAllowed("READ_WRITE", "POST")).toBe(true);
    expect(isMethodAllowed("READ_WRITE", "PUT")).toBe(true);
    expect(isMethodAllowed("READ_WRITE", "DELETE")).toBe(false);
  });

  it("enforces ADMIN permissions", () => {
    expect(isMethodAllowed("ADMIN", "GET")).toBe(true);
    expect(isMethodAllowed("ADMIN", "POST")).toBe(true);
    expect(isMethodAllowed("ADMIN", "PUT")).toBe(true);
    expect(isMethodAllowed("ADMIN", "DELETE")).toBe(true);
  });

  it("elevates sensitive endpoints to ADMIN even for GET", () => {
    expect(isMethodAllowed("READ_ONLY", "GET", "ADMIN")).toBe(false);
    expect(isMethodAllowed("READ_WRITE", "GET", "ADMIN")).toBe(false);
    expect(isMethodAllowed("ADMIN", "GET", "ADMIN")).toBe(true);
    expect(resolveEndpointPermission({ method: "GET", minimumPermissionLevel: "ADMIN" })).toBe("ADMIN");
    expect(() => assertMethodAllowed("READ_ONLY", "GET", "ADMIN")).toThrow(/JAMBONZ_API_PERMISSION_LEVEL=ADMIN/);
  });
});
