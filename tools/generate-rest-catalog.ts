import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PermissionLevel } from "../src/config.js";
import { extractEndpointSpecFromMdx } from "../src/lib/openapi-from-mdx.js";
import type { OpenApiSchema, RestEndpointDefinition } from "../src/rest/catalog.types.js";

const DEFAULT_DOCS_DIR = path.resolve(process.cwd(), "docs/jambonz");
const DEFAULT_OUTPUT = path.resolve(process.cwd(), "src/rest/catalog.generated.ts");

type CliOptions = {
  readonly docsDir: string;
  readonly outputFile: string;
  readonly check: boolean;
};

interface ManifestRecord {
  readonly localPath: string;
}

async function main(): Promise<void> {
  const options = parseCliArgs(process.argv.slice(2));
  const endpoints = await buildCatalog(options.docsDir);
  const fileContent = renderCatalogFile(endpoints);

  if (options.check) {
    const current = await readFileSafe(options.outputFile);
    if (current !== fileContent) {
      process.stderr.write(
        `REST catalog is outdated. Run npm run rest:catalog:generate to update ${options.outputFile}.\n`
      );
      process.exitCode = 1;
      return;
    }
    process.stdout.write(`REST catalog is up to date (${endpoints.length} endpoints).\n`);
    return;
  }

  await writeFile(options.outputFile, fileContent, "utf8");
  process.stdout.write(`Generated REST catalog with ${endpoints.length} endpoints at ${options.outputFile}.\n`);
}

export async function buildCatalog(docsDir: string): Promise<readonly RestEndpointDefinition[]> {
  const manifestPath = path.join(docsDir, "manifest.json");
  const manifestContent = await readFile(manifestPath, "utf8");
  const manifest = JSON.parse(manifestContent) as { readonly records?: readonly ManifestRecord[] };

  if (!Array.isArray(manifest.records)) {
    throw new Error(`Invalid manifest format: ${manifestPath}`);
  }

  const restDocPaths = manifest.records
    .filter((record): record is ManifestRecord => Boolean(record && typeof record.localPath === "string"))
    .map((record) => record.localPath)
    .filter((localPath) =>
      localPath.startsWith("reference/rest-call-control/") || localPath.startsWith("reference/rest-platform-management/")
    )
    .filter((localPath) => localPath.endsWith(".mdx"))
    .sort((left, right) => left.localeCompare(right));

  const uniquePaths = Array.from(new Set(restDocPaths));
  const endpoints: RestEndpointDefinition[] = [];

  for (const localPath of uniquePaths) {
    const absolutePath = path.join(docsDir, localPath);
    const content = await readFile(absolutePath, "utf8");

    let spec;
    try {
      spec = extractEndpointSpecFromMdx(content);
    } catch {
      continue;
    }

    const domain = inferDomain(localPath);
    const endpointSlug = path.basename(localPath, path.extname(localPath));
    const toolName = `jambonz_${sanitizeIdentifier(domain)}_${sanitizeIdentifier(endpointSlug)}`;
    const minimumPermissionLevel = inferMinimumPermissionLevel(spec.responseSchemas);

    const endpoint: RestEndpointDefinition = {
      toolName,
      domain,
      endpointSlug,
      sourcePath: localPath,
      ...(minimumPermissionLevel ? { minimumPermissionLevel } : {}),
      method: spec.method,
      pathTemplate: spec.pathTemplate,
      operationId: spec.operationId,
      ...(spec.summary ? { summary: spec.summary } : {}),
      parameters: spec.parameters,
      ...(spec.requestBody ? { requestBody: spec.requestBody } : {}),
      componentsSchemas: spec.componentsSchemas
    };

    endpoints.push(endpoint);
  }

  assertUniqueToolNames(endpoints);
  return endpoints.sort((left, right) => left.toolName.localeCompare(right.toolName));
}

function inferMinimumPermissionLevel(responseSchemas: readonly OpenApiSchema[]): PermissionLevel | undefined {
  return responseSchemas.some((schema) => schemaContainsSensitiveData(schema)) ? "ADMIN" : undefined;
}

function schemaContainsSensitiveData(schema: OpenApiSchema): boolean {
  const propertyNames = Object.keys(schema.properties ?? {});
  if (propertyNames.some((name) => isSensitivePropertyName(name))) {
    return true;
  }

  const nestedSchemas: OpenApiSchema[] = [];

  if (schema.items) {
    nestedSchemas.push(schema.items);
  }

  if (schema.properties) {
    nestedSchemas.push(...Object.values(schema.properties));
  }

  if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
    nestedSchemas.push(schema.additionalProperties);
  }

  if (schema.oneOf) {
    nestedSchemas.push(...schema.oneOf);
  }

  if (schema.anyOf) {
    nestedSchemas.push(...schema.anyOf);
  }

  if (schema.allOf) {
    nestedSchemas.push(...schema.allOf);
  }

  return nestedSchemas.some((nestedSchema) => schemaContainsSensitiveData(nestedSchema));
}

function isSensitivePropertyName(value: string): boolean {
  const normalized = value.toLowerCase();
  return (
    normalized.includes("token") ||
    normalized.includes("secret") ||
    normalized.includes("password") ||
    normalized === "client_secret"
  );
}

function renderCatalogFile(endpoints: readonly RestEndpointDefinition[]): string {
  const json = JSON.stringify(endpoints, null, 2);
  return [
    'import type { RestEndpointDefinition } from "./catalog.types.js";',
    "",
    "// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.",
    "// Regenerate with: npm run rest:catalog:generate",
    `export const REST_ENDPOINTS: readonly RestEndpointDefinition[] = ${json};`,
    ""
  ].join("\n");
}

function parseCliArgs(argv: readonly string[]): CliOptions {
  let docsDir = DEFAULT_DOCS_DIR;
  let outputFile = DEFAULT_OUTPUT;
  let check = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--docs-dir") {
      docsDir = path.resolve(readArgValue(argv, index, argument));
      index += 1;
      continue;
    }
    if (argument === "--output") {
      outputFile = path.resolve(readArgValue(argv, index, argument));
      index += 1;
      continue;
    }
    if (argument === "--check") {
      check = true;
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }

  return {
    docsDir,
    outputFile,
    check
  };
}

function readArgValue(argv: readonly string[], index: number, flag: string): string {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${flag}`);
  }
  return value;
}

function sanitizeIdentifier(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

function inferDomain(localPath: string): string {
  const segments = localPath.split("/");
  const domain = segments[segments.length - 2];
  if (!domain) {
    throw new Error(`Could not infer domain from ${localPath}`);
  }
  return domain;
}

function assertUniqueToolNames(endpoints: readonly RestEndpointDefinition[]): void {
  const seen = new Set<string>();
  for (const endpoint of endpoints) {
    if (seen.has(endpoint.toolName)) {
      throw new Error(`Duplicate tool name detected: ${endpoint.toolName}`);
    }
    seen.add(endpoint.toolName);
  }
}

async function readFileSafe(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

const currentFilePath = fileURLToPath(import.meta.url);
const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (entryPath === currentFilePath) {
  void main().catch((error: unknown) => {
    const message = error instanceof Error ? error.stack ?? error.message : String(error);
    process.stderr.write(`Failed to generate REST catalog: ${message}\n`);
    process.exitCode = 1;
  });
}
