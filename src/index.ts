#!/usr/bin/env node

import { realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from "./server.js";

export interface ConnectableServer {
  connect(transport: StdioServerTransport): Promise<void>;
}

export interface StartServerDependencies {
  readonly createServer?: () => ConnectableServer | Promise<ConnectableServer>;
  readonly createTransport?: () => StdioServerTransport;
}

export async function startServer(dependencies: StartServerDependencies = {}): Promise<void> {
  const server = dependencies.createServer ? await dependencies.createServer() : await createMcpServer();
  const transport = dependencies.createTransport?.() ?? new StdioServerTransport();
  if (!dependencies.createTransport) {
    process.stdin.resume();
  }
  await server.connect(transport);
}

async function main(): Promise<void> {
  try {
    await startServer();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.stack ?? error.message : String(error);
    process.stderr.write(`Failed to start MCP server: ${message}\n`);
    process.exitCode = 1;
  }
}

export function isEntrypointInvocation(currentFilePath: string, argv1: string | undefined): boolean {
  if (!argv1) {
    return false;
  }

  const resolvedArgvPath = path.resolve(argv1);
  const realArgvPath = readRealPathSafe(resolvedArgvPath);
  const realCurrentPath = readRealPathSafe(currentFilePath);

  return realArgvPath === realCurrentPath;
}

function readRealPathSafe(filePath: string): string {
  try {
    return realpathSync(filePath);
  } catch {
    return filePath;
  }
}

const currentFilePath = fileURLToPath(import.meta.url);
if (isEntrypointInvocation(currentFilePath, process.argv[1])) {
  void main();
}
