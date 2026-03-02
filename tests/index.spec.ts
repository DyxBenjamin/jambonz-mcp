import { describe, expect, it, vi } from "vitest";
import { startServer, type ConnectableServer } from "../src/index.js";

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
});
