export type PermissionLevel = "READ_ONLY" | "READ_WRITE" | "ADMIN";

export interface JambonzConfig {
  readonly docsDir: string;
  readonly apiBaseUrl: string;
  readonly apiToken?: string;
  readonly accountSid?: string;
  readonly permissionLevel: PermissionLevel;
  readonly httpTimeoutMs: number;
  readonly allowTokenOverride: boolean;
  readonly allowBaseUrlOverride: boolean;
}

const DEFAULT_DOCS_DIR = "docs/jambonz";
const DEFAULT_API_BASE_URL = "https://jambonz.cloud/api";
const DEFAULT_TIMEOUT_MS = 15000;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): JambonzConfig {
  return {
    docsDir: env.JAMBONZ_DOCS_DIR?.trim() || DEFAULT_DOCS_DIR,
    apiBaseUrl: validateBaseUrl(env.JAMBONZ_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL),
    ...(env.JAMBONZ_API_TOKEN?.trim() ? { apiToken: env.JAMBONZ_API_TOKEN.trim() } : {}),
    ...(env.JAMBONZ_ACCOUNT_SID?.trim() ? { accountSid: env.JAMBONZ_ACCOUNT_SID.trim() } : {}),
    permissionLevel: parsePermissionLevel(env.JAMBONZ_API_PERMISSION_LEVEL),
    httpTimeoutMs: parseTimeout(env.JAMBONZ_HTTP_TIMEOUT_MS),
    allowTokenOverride: parseBoolean(env.JAMBONZ_ALLOW_TOKEN_OVERRIDE),
    allowBaseUrlOverride: parseBoolean(env.JAMBONZ_ALLOW_BASE_URL_OVERRIDE)
  };
}

function parsePermissionLevel(value: string | undefined): PermissionLevel {
  const normalized = (value ?? "READ_ONLY").trim().toUpperCase();
  if (normalized === "READ_ONLY" || normalized === "READ_WRITE" || normalized === "ADMIN") {
    return normalized;
  }
  throw new Error(
    `Invalid JAMBONZ_API_PERMISSION_LEVEL: ${value}. Expected READ_ONLY, READ_WRITE, or ADMIN.`
  );
}

function parseTimeout(value: string | undefined): number {
  if (!value) {
    return DEFAULT_TIMEOUT_MS;
  }
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1000 || parsed > 60000) {
    throw new Error(`Invalid JAMBONZ_HTTP_TIMEOUT_MS: ${value}. Expected integer between 1000 and 60000.`);
  }
  return parsed;
}

function parseBoolean(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  const normalized = value.trim().toLowerCase();
  if (normalized === "true") {
    return true;
  }
  if (normalized === "false") {
    return false;
  }
  throw new Error(`Invalid boolean value: ${value}. Expected true or false.`);
}

function validateBaseUrl(value: string): string {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`Invalid JAMBONZ_API_BASE_URL: ${value}`);
  }
  if (parsed.protocol !== "https:") {
    throw new Error(`JAMBONZ_API_BASE_URL must be https: ${value}`);
  }
  return parsed.toString().replace(/\/$/, "");
}
