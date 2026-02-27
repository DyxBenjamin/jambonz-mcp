import type { EndpointMethod } from "./catalog.types.js";

export type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export interface ExecuteApiRequestInput {
  readonly method: EndpointMethod;
  readonly baseUrl: string;
  readonly pathTemplate: string;
  readonly pathParams: Readonly<Record<string, string>>;
  readonly query: Readonly<Record<string, unknown>>;
  readonly token: string;
  readonly timeoutMs: number;
  readonly body?: unknown;
}

export interface ExecuteApiRequestResult {
  readonly ok: boolean;
  readonly status: number;
  readonly method: EndpointMethod;
  readonly url: string;
  readonly data: unknown;
  readonly responseHeaders: Readonly<Record<string, string>>;
}

export async function executeApiRequest(
  input: ExecuteApiRequestInput,
  fetchImpl: FetchLike = globalThis.fetch
): Promise<ExecuteApiRequestResult> {
  if (typeof fetchImpl !== "function") {
    throw new Error("No fetch implementation available.");
  }

  const url = buildRequestUrl(input.baseUrl, input.pathTemplate, input.pathParams, input.query);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), input.timeoutMs);

  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${input.token}`,
      Accept: "application/json"
    };

    let body: string | undefined;
    if (input.body !== undefined) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(input.body);
    }

    const response = await fetchImpl(url, {
      method: input.method,
      headers,
      signal: controller.signal,
      ...(body !== undefined ? { body } : {})
    });

    const responseHeaders = extractHeaders(response.headers);
    const data = await parseResponseBody(response);

    return {
      ok: response.ok,
      status: response.status,
      method: input.method,
      url,
      data,
      responseHeaders
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timed out after ${input.timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function buildRequestUrl(
  baseUrl: string,
  pathTemplate: string,
  pathParams: Readonly<Record<string, string>>,
  query: Readonly<Record<string, unknown>>
): string {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const resolvedPath = pathTemplate.replace(/\{([^}]+)\}/g, (_, token: string) => {
    const value = pathParams[token];
    if (typeof value !== "string" || value.length === 0) {
      throw new Error(`Missing required path parameter: ${token}`);
    }
    return encodeURIComponent(value);
  });

  const url = new URL(`${normalizedBase}${resolvedPath}`);
  for (const [key, value] of Object.entries(query)) {
    appendQueryValue(url.searchParams, key, value);
  }
  return url.toString();
}

function appendQueryValue(searchParams: URLSearchParams, key: string, value: unknown): void {
  if (value === undefined || value === null) {
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      appendQueryValue(searchParams, key, item);
    }
    return;
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    searchParams.append(key, String(value));
    return;
  }
  throw new Error(`Invalid query value for ${key}. Expected primitive or array of primitives.`);
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }
  const text = await response.text();
  if (text.length === 0) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function extractHeaders(headers: Headers): Readonly<Record<string, string>> {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
