import { readFile } from "node:fs/promises";
import path from "node:path";
import { extractEndpointSpecFromMdx } from "../lib/openapi-from-mdx.js";
import type { RestEndpointDefinition } from "../rest/catalog.types.js";

export interface DocsRecord {
  readonly sourceUrl: string;
  readonly localPath: string;
}

export interface DocsManifest {
  readonly records: readonly DocsRecord[];
}

export interface DocEntry {
  readonly sourceUrl: string;
  readonly localPath: string;
  readonly title: string;
  readonly content: string;
  readonly contentLower: string;
}

export interface DocsRepository {
  readonly docsDir: string;
  readonly ready: boolean;
  readonly error?: string;
  readonly entries: readonly DocEntry[];
  readonly entriesByPath: Readonly<Record<string, DocEntry>>;
}

export type DocsScope = "all" | "guides" | "reference" | "verbs" | "sdks" | "tutorials" | "self-hosting";

export interface DocsSearchResult {
  readonly path: string;
  readonly sourceUrl: string;
  readonly title: string;
  readonly snippet: string;
  readonly score: number;
}

export async function loadDocsRepository(docsDir: string): Promise<DocsRepository> {
  const manifestPath = path.join(docsDir, "manifest.json");

  let manifestContent: string;
  try {
    manifestContent = await readFile(manifestPath, "utf8");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      docsDir,
      ready: false,
      error: `DOCS_NOT_SYNCED: ${message}. Run npm run jambonz:sync.`,
      entries: [],
      entriesByPath: {}
    };
  }

  const manifest = JSON.parse(manifestContent) as DocsManifest;
  if (!Array.isArray(manifest.records)) {
    return {
      docsDir,
      ready: false,
      error: "DOCS_NOT_SYNCED: Invalid manifest records. Run npm run jambonz:sync.",
      entries: [],
      entriesByPath: {}
    };
  }

  const entries: DocEntry[] = [];
  for (const record of manifest.records) {
    if (!record || typeof record.localPath !== "string" || typeof record.sourceUrl !== "string") {
      continue;
    }
    const absolutePath = path.join(docsDir, record.localPath);
    try {
      const content = await readFile(absolutePath, "utf8");
      const title = extractTitle(content, record.localPath);
      entries.push({
        sourceUrl: record.sourceUrl,
        localPath: record.localPath,
        title,
        content,
        contentLower: content.toLowerCase()
      });
    } catch {
      // Ignore missing or unreadable document files and continue loading the rest.
    }
  }

  const entriesByPath = Object.fromEntries(entries.map((entry) => [entry.localPath, entry]));
  return {
    docsDir,
    ready: true,
    entries,
    entriesByPath
  };
}

export function searchDocs(
  repository: DocsRepository,
  query: string,
  scope: DocsScope,
  limit: number
): readonly DocsSearchResult[] {
  if (!repository.ready) {
    throw new Error(repository.error ?? "DOCS_NOT_SYNCED: documentation index is unavailable.");
  }

  const normalizedQuery = query.trim().toLowerCase();
  const tokens = normalizedQuery.split(/\s+/).filter((token) => token.length > 0);
  const filtered = repository.entries.filter((entry) => matchesScope(entry.localPath, scope));

  const scored: DocsSearchResult[] = [];
  for (const entry of filtered) {
    const titleLower = entry.title.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      score += countOccurrences(titleLower, token) * 5;
      score += countOccurrences(entry.contentLower, token);
    }

    if (score <= 0) {
      continue;
    }

    scored.push({
      path: entry.localPath,
      sourceUrl: entry.sourceUrl,
      title: entry.title,
      snippet: buildSnippet(entry.content, tokens),
      score
    });
  }

  return scored.sort((left, right) => right.score - left.score).slice(0, limit);
}

export function readDoc(repository: DocsRepository, docPath: string, maxChars: number): DocEntry {
  if (!repository.ready) {
    throw new Error(repository.error ?? "DOCS_NOT_SYNCED: documentation index is unavailable.");
  }

  const entry = repository.entriesByPath[docPath];
  if (!entry) {
    throw new Error(`Document not found: ${docPath}`);
  }

  const content = entry.content.length > maxChars ? entry.content.slice(0, maxChars) : entry.content;
  return {
    ...entry,
    content
  };
}

export function readSchema(repository: DocsRepository, options: {
  readonly operationId?: string;
  readonly docPath?: string;
  readonly includeComponents: boolean;
}): RestEndpointDefinition {
  if (!repository.ready) {
    throw new Error(repository.error ?? "DOCS_NOT_SYNCED: documentation index is unavailable.");
  }

  const found = resolveDocForSchema(repository, options);
  if (!found) {
    throw new Error("Schema source not found for provided operationId/docPath.");
  }

  const parsed = extractEndpointSpecFromMdx(found.content);
  return {
    toolName: "",
    domain: inferDomainFromPath(found.localPath),
    endpointSlug: path.basename(found.localPath, path.extname(found.localPath)),
    sourcePath: found.localPath,
    method: parsed.method,
    pathTemplate: parsed.pathTemplate,
    operationId: parsed.operationId,
    ...(parsed.summary ? { summary: parsed.summary } : {}),
    parameters: parsed.parameters,
    ...(parsed.requestBody ? { requestBody: parsed.requestBody } : {}),
    componentsSchemas: options.includeComponents ? parsed.componentsSchemas : {}
  };
}

function resolveDocForSchema(
  repository: DocsRepository,
  options: { readonly operationId?: string; readonly docPath?: string }
): DocEntry | null {
  if (options.docPath) {
    return repository.entriesByPath[options.docPath] ?? null;
  }

  if (!options.operationId) {
    return null;
  }

  for (const entry of repository.entries) {
    if (!entry.localPath.startsWith("reference/rest-")) {
      continue;
    }

    try {
      const parsed = extractEndpointSpecFromMdx(entry.content);
      if (parsed.operationId === options.operationId) {
        return entry;
      }
    } catch {
      // Ignore non-endpoint pages.
    }
  }

  return null;
}

function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (match?.[1]) {
    return match[1].trim();
  }
  return fallback;
}

function matchesScope(localPath: string, scope: DocsScope): boolean {
  if (scope === "all") {
    return true;
  }
  const prefixMap: Readonly<Record<Exclude<DocsScope, "all">, string>> = {
    guides: "guides/",
    reference: "reference/",
    verbs: "verbs/",
    sdks: "sdks/",
    tutorials: "tutorials/",
    "self-hosting": "self-hosting/"
  };
  return localPath.startsWith(prefixMap[scope]);
}

function countOccurrences(content: string, token: string): number {
  if (token.length === 0) {
    return 0;
  }
  let count = 0;
  let fromIndex = 0;
  while (true) {
    const index = content.indexOf(token, fromIndex);
    if (index < 0) {
      break;
    }
    count += 1;
    fromIndex = index + token.length;
  }
  return count;
}

function buildSnippet(content: string, tokens: readonly string[]): string {
  const lower = content.toLowerCase();
  const firstToken = tokens.find((token) => lower.includes(token));
  if (!firstToken) {
    return content.slice(0, 240).replace(/\s+/g, " ").trim();
  }

  const index = lower.indexOf(firstToken);
  const start = Math.max(0, index - 80);
  const end = Math.min(content.length, index + 160);
  return content.slice(start, end).replace(/\s+/g, " ").trim();
}

function inferDomainFromPath(sourcePath: string): string {
  const segments = sourcePath.split("/");
  return segments[segments.length - 2] ?? "unknown";
}
