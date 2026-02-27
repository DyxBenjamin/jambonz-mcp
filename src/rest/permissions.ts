import type { PermissionLevel } from "../config.js";
import type { EndpointMethod, RestEndpointDefinition } from "./catalog.types.js";

const METHOD_PERMISSIONS: Readonly<Record<EndpointMethod, readonly PermissionLevel[]>> = {
  GET: ["READ_ONLY", "READ_WRITE", "ADMIN"],
  POST: ["READ_WRITE", "ADMIN"],
  PUT: ["READ_WRITE", "ADMIN"],
  PATCH: ["READ_WRITE", "ADMIN"],
  DELETE: ["ADMIN"]
};

const PERMISSION_RANK: Readonly<Record<PermissionLevel, number>> = {
  READ_ONLY: 0,
  READ_WRITE: 1,
  ADMIN: 2
};

export function isMethodAllowed(
  permissionLevel: PermissionLevel,
  method: EndpointMethod,
  minimumPermissionLevel?: PermissionLevel
): boolean {
  const requiredPermissionLevel = resolveRequiredPermissionLevel(method, minimumPermissionLevel);
  return PERMISSION_RANK[permissionLevel] >= PERMISSION_RANK[requiredPermissionLevel];
}

export function assertMethodAllowed(
  permissionLevel: PermissionLevel,
  method: EndpointMethod,
  minimumPermissionLevel?: PermissionLevel
): void {
  const requiredPermissionLevel = resolveRequiredPermissionLevel(method, minimumPermissionLevel);
  if (!isMethodAllowed(permissionLevel, method, minimumPermissionLevel)) {
    throw new Error(
      `Permission denied: ${method} requires JAMBONZ_API_PERMISSION_LEVEL=${requiredPermissionLevel}; current level is ${permissionLevel}.`
    );
  }
}

export function resolveEndpointPermission(endpoint: Pick<RestEndpointDefinition, "method" | "minimumPermissionLevel">): PermissionLevel {
  return resolveRequiredPermissionLevel(endpoint.method, endpoint.minimumPermissionLevel);
}

function resolveRequiredPermissionLevel(
  method: EndpointMethod,
  minimumPermissionLevel?: PermissionLevel
): PermissionLevel {
  const methodRequirement = METHOD_PERMISSIONS[method][0];
  if (!methodRequirement) {
    return minimumPermissionLevel ?? "ADMIN";
  }
  if (!minimumPermissionLevel) {
    return methodRequirement;
  }
  return PERMISSION_RANK[minimumPermissionLevel] >= PERMISSION_RANK[methodRequirement]
    ? minimumPermissionLevel
    : methodRequirement;
}
