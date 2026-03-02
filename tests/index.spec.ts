import { mkdtempSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { isEntrypointInvocation, startServer, type ConnectableServer } from "../src/index.js";

describe("startServer", () => {
  it("resumes process stdin when using the default stdio transport", async () => {
    const connect = vi.fn(async () => undefined);
    const resume = vi.spyOn(process.stdin, "resume").mockImplementation(() => process.stdin);

    const server: ConnectableServer = {
      connect
    };

    await startServer({
      createServer: () => server
    });

    expect(resume).toHaveBeenCalledTimes(1);
    expect(connect).toHaveBeenCalledTimes(1);

    resume.mockRestore();
  });

  it("does not resume process stdin when a custom transport is provided", async () => {
    const connect = vi.fn(async () => undefined);
    const resume = vi.spyOn(process.stdin, "resume").mockImplementation(() => process.stdin);

    const server: ConnectableServer = {
      connect
    };

    await startServer({
      createServer: () => server,
      createTransport: () => ({}) as never
    });

    expect(resume).not.toHaveBeenCalled();
    expect(connect).toHaveBeenCalledTimes(1);

    resume.mockRestore();
  });

  it("treats a symlinked executable path as the same entrypoint", () => {
    const tempDir = mkdtempSync(path.join(tmpdir(), "jambonz-mcp-"));
    const targetPath = path.join(tempDir, "index.js");
    const symlinkPath = path.join(tempDir, "jambonz-mcp");

    writeFileSync(targetPath, "#!/usr/bin/env node\n", "utf8");
    symlinkSync(targetPath, symlinkPath);

    expect(isEntrypointInvocation(targetPath, symlinkPath)).toBe(true);

    unlinkSync(symlinkPath);
  });
});
