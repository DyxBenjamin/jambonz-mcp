import { mkdtemp, readFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_JAMBONZ_SOURCE_URL,
  buildIndexMarkdown,
  extractMarkdownLinks,
  normalizeJambonzUrls,
  runSyncCli,
  syncJambonzDocs,
  urlToLocalPath
} from "../tools/sync-jambonz-docs.js";

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

describe("sync-jambonz-docs", () => {
  it("extracts markdown links from llms content", () => {
    const input = [
      "[Welcome](https://docs.jambonz.org/welcome.mdx)",
      "[Guide](https://docs.jambonz.org/guides/get-started/jambonz-overview)",
      "[External](https://example.com/docs/ignored.mdx)"
    ].join("\n");

    expect(extractMarkdownLinks(input)).toEqual([
      "https://docs.jambonz.org/welcome.mdx",
      "https://docs.jambonz.org/guides/get-started/jambonz-overview",
      "https://example.com/docs/ignored.mdx"
    ]);
  });

  it("normalizes and filters only jambonz docs links", () => {
    const urls = [
      "https://docs.jambonz.org/welcome",
      "https://docs.jambonz.org/welcome#top",
      "https://docs.jambonz.org/reference/introduction.mdx?x=1",
      "https://docs.jambonz.org/openapi.json",
      "https://docs.jambonz.org/guides/get-started/jambonz-overview.md",
      "https://example.com/docs/learn/architecture"
    ];

    expect(normalizeJambonzUrls(urls)).toEqual([
      "https://docs.jambonz.org/guides/get-started/jambonz-overview.md",
      "https://docs.jambonz.org/openapi.json",
      "https://docs.jambonz.org/reference/introduction.mdx",
      "https://docs.jambonz.org/welcome.mdx"
    ]);
  });

  it("maps URL paths to deterministic local paths", () => {
    expect(urlToLocalPath("https://docs.jambonz.org/welcome")).toBe("welcome.mdx");
    expect(urlToLocalPath("https://docs.jambonz.org/openapi.json")).toBe("openapi.json");
    expect(urlToLocalPath("https://docs.jambonz.org/reference/introduction.mdx")).toBe(
      "reference/introduction.mdx"
    );
  });

  it("builds grouped index markdown output", () => {
    const index = buildIndexMarkdown(
      [
        {
          sourceUrl: "https://docs.jambonz.org/reference/introduction.mdx",
          localPath: "reference/introduction.mdx",
          sha256: "x",
          downloadedAt: "2026-02-27T00:00:00.000Z"
        },
        {
          sourceUrl: "https://docs.jambonz.org/welcome.mdx",
          localPath: "welcome.mdx",
          sha256: "y",
          downloadedAt: "2026-02-27T00:00:00.000Z"
        }
      ],
      "2026-02-27T00:00:00.000Z",
      DEFAULT_JAMBONZ_SOURCE_URL
    );

    expect(index).toContain("## reference");
    expect(index).toContain("## welcome.mdx");
    expect(index).toContain("[reference/introduction.mdx](./reference/introduction.mdx)");
  });

  it("syncs jambonz docs, writes manifest and index", async () => {
    const outputDir = await mkdtemp(path.join(tmpdir(), "jambonz-sync-success-"));
    const llmsBody = [
      "[Welcome](https://docs.jambonz.org/welcome)",
      "[Intro](https://docs.jambonz.org/reference/introduction.mdx)",
      "[External](https://example.com/external.mdx)"
    ].join("\n");

    const fetchMock: FetchLike = async (input) => {
      const url = resolveInputUrl(input);
      if (url === DEFAULT_JAMBONZ_SOURCE_URL) {
        return new Response(llmsBody, { status: 200 });
      }
      if (url === "https://docs.jambonz.org/welcome.mdx") {
        return new Response("# Welcome", { status: 200 });
      }
      if (url === "https://docs.jambonz.org/reference/introduction.mdx") {
        return new Response("# Introduction", { status: 200 });
      }
      return new Response("Not Found", { status: 404 });
    };

    const result = await syncJambonzDocs({
      outputDir,
      fetchImpl: fetchMock,
      now: () => new Date("2026-02-27T00:00:00.000Z"),
      retries: 0
    });

    expect(result.failed).toBe(0);
    expect(result.succeeded).toBe(2);

    const docContent = await readFile(path.join(outputDir, "welcome.mdx"), "utf8");
    expect(docContent).toBe("# Welcome");

    const manifest = JSON.parse(await readFile(path.join(outputDir, "manifest.json"), "utf8")) as {
      total: number;
      succeeded: number;
      failed: number;
      records: { localPath: string }[];
    };
    expect(manifest.total).toBe(2);
    expect(manifest.succeeded).toBe(2);
    expect(manifest.failed).toBe(0);
    expect(manifest.records.map((record) => record.localPath)).toEqual([
      "reference/introduction.mdx",
      "welcome.mdx"
    ]);
  });

  it("reports failed downloads and returns non-zero CLI exit code", async () => {
    const outputDir = await mkdtemp(path.join(tmpdir(), "jambonz-sync-failure-"));
    const llmsBody = "[Welcome](https://docs.jambonz.org/welcome)";

    const fetchMock: FetchLike = async (input) => {
      const url = resolveInputUrl(input);
      if (url === DEFAULT_JAMBONZ_SOURCE_URL) {
        return new Response(llmsBody, { status: 200 });
      }
      return new Response("boom", { status: 500, statusText: "Internal Server Error" });
    };

    const cliOutput: string[] = [];
    const stderrOutput: string[] = [];

    const exitCode = await runSyncCli(["--output", outputDir, "--retries", "0"], {
      fetchImpl: fetchMock,
      now: () => new Date("2026-02-27T00:00:00.000Z"),
      stdout: { write: (message: string) => cliOutput.push(message) },
      stderr: { write: (message: string) => stderrOutput.push(message) }
    });

    expect(exitCode).toBe(1);
    expect(cliOutput.join("")).toContain("Failures: 1");
    expect(stderrOutput.join("")).toContain("completed with failures");
    expect(stderrOutput.join("")).toContain(path.join(outputDir, "manifest.json"));
  });
});

function resolveInputUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }
  if (input instanceof URL) {
    return input.toString();
  }
  return input.url;
}
