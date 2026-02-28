# jambonz-mcp

A Model Context Protocol (MCP) server for Jambonz documentation intelligence and REST API control. This package exposes Jambonz API reference as one MCP tool per REST endpoint and provides local documentation lookup for schemas, docs, and operational guidance.

### jambonz-mcp vs direct REST usage

This package provides an MCP interface into Jambonz. If you are wiring Jambonz into an agentic environment, this gives you structured tool discovery, endpoint-level schemas, permission gating, and reusable documentation context.

- **Direct REST**: Better when you are writing a fixed application integration and already control the HTTP client, auth lifecycle, retries, and validation yourself.
- **MCP**: Better when you want an agent to discover tools dynamically, inspect endpoint schemas, use docs as context, and execute Jambonz operations through a consistent tool surface.

### Key Features

- **One tool per endpoint**. Jambonz REST API reference is exposed as deterministic tools like `jambonz_alerts_list_alerts_by_account`.
- **Docs-aware**. Exposes documentation tools, resources, and schema lookups for endpoint discovery.
- **Permission-gated**. Enforces `READ_ONLY`, `READ_WRITE`, and `ADMIN` execution rules before endpoint-specific validation.
- **Credential-safe defaults**. Sensitive endpoints that return secrets or tokens are automatically restricted to `ADMIN`.
- **Runtime defaults**. Supports automatic `AccountSid` injection when `JAMBONZ_ACCOUNT_SID` is configured.

### Requirements

- Node.js 18 or newer
- Codex, Claude Desktop, Cursor, Cline, VS Code, or any other MCP client

### Getting started

First, install the Jambonz MCP server with your client.

**Standard config** works in most MCP clients:

```json
{
  "mcpServers": {
    "jambonz": {
      "command": "npx",
      "args": [
        "-y",
        "jambonz-mcp"
      ],
      "env": {
        "JAMBONZ_API_TOKEN": "your-token",
        "JAMBONZ_ACCOUNT_SID": "your-account-sid",
        "JAMBONZ_API_PERMISSION_LEVEL": "READ_ONLY"
      }
    }
  }
}
```

### Client setup

<details>
<summary>Codex</summary>

Use the Codex CLI:

```bash
codex mcp add jambonz --env JAMBONZ_API_TOKEN=your-token --env JAMBONZ_ACCOUNT_SID=your-account-sid --env JAMBONZ_API_PERMISSION_LEVEL=READ_ONLY -- npx -y jambonz-mcp
```

Or configure `~/.codex/config.toml`:

```toml
[mcp_servers.jambonz]
command = "npx"
args = ["-y", "jambonz-mcp"]
startup_timeout_sec = 20
tool_timeout_sec = 120

[mcp_servers.jambonz.env]
JAMBONZ_API_TOKEN = "your-token"
JAMBONZ_ACCOUNT_SID = "your-account-sid"
JAMBONZ_API_PERMISSION_LEVEL = "READ_ONLY"
```

</details>

<details>
<summary>Claude Desktop</summary>

Follow the MCP install [guide](https://modelcontextprotocol.io/quickstart/user), using the standard config above.

</details>

<details>
<summary>Cline</summary>

Add the server to `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "jambonz": {
      "type": "stdio",
      "command": "npx",
      "timeout": 30,
      "args": [
        "-y",
        "jambonz-mcp"
      ],
      "env": {
        "JAMBONZ_API_TOKEN": "your-token",
        "JAMBONZ_ACCOUNT_SID": "your-account-sid",
        "JAMBONZ_API_PERMISSION_LEVEL": "READ_ONLY"
      }
    }
  }
}
```

</details>

<details>
<summary>Cursor</summary>

Go to `Cursor Settings` -> `MCP` -> `Add new MCP Server` and use:

- Command: `npx`
- Args: `-y jambonz-mcp`

Add the same `JAMBONZ_*` environment variables from the standard config.

</details>

<details>
<summary>VS Code</summary>

Follow the MCP install [guide](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server), using the standard config above.

</details>

### What it exposes

### Documentation tools

- `jambonz_docs_search`
- `jambonz_docs_read`
- `jambonz_docs_schema`

### REST tools

- One MCP tool per REST endpoint under the Jambonz API Reference
- Deterministic naming: `jambonz_<domain>_<endpoint_slug>`
- Examples:
  - `jambonz_alerts_list_alerts_by_account`
  - `jambonz_recent_calls_list_recent_calls`
  - `jambonz_users_create_user`

### Resources and prompts

- `jambonz://docs/index`
- `jambonz://rest/catalog`
- `jambonz://rest/usage`
- `jambonz://runtime/defaults`
- `jambonz://doc/{path}`
- `jambonz://schema/{operationId}`
- Prompt: `jambonz_usage_guide`

### Configuration

The server is configured through environment variables.

| Variable | Description |
|----------|-------------|
| `JAMBONZ_DOCS_DIR` | Local path to synced Jambonz docs. Default: `docs/jambonz` |
| `JAMBONZ_API_BASE_URL` | Base URL for the Jambonz API. Default: `https://jambonz.cloud/api` |
| `JAMBONZ_API_TOKEN` | Bearer token used for downstream Jambonz REST requests |
| `JAMBONZ_ACCOUNT_SID` | Default `AccountSid` applied automatically to Account-scoped endpoints |
| `JAMBONZ_API_PERMISSION_LEVEL` | Execution level: `READ_ONLY`, `READ_WRITE`, or `ADMIN` |
| `JAMBONZ_HTTP_TIMEOUT_MS` | HTTP timeout in milliseconds. Default: `15000` |
| `JAMBONZ_ALLOW_TOKEN_OVERRIDE` | Allow per-tool token override. Default: `false` |
| `JAMBONZ_ALLOW_BASE_URL_OVERRIDE` | Allow per-tool base URL override. Default: `false` |

### Permission model

- `READ_ONLY`: `GET`
- `READ_WRITE`: `GET`, `POST`, `PUT`, `PATCH`
- `ADMIN`: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

Additional rule:

- Endpoints that return secrets, tokens, passwords, webhook secrets, API keys, or similar credential material are forced to `ADMIN` even if the HTTP method is `GET`.

### Documentation behavior

The package can run without local docs, but the documentation tools depend on a synced docs directory.

If you want the full docs surface (`jambonz_docs_*`, `jambonz://doc/{path}`, `jambonz://schema/{operationId}`), set `JAMBONZ_DOCS_DIR` to a local synced copy of the Jambonz docs.

Runtime guidance for agents:

- `jambonz://runtime/defaults` tells the agent which permission level is active and whether a default `AccountSid` is already configured.
- If `JAMBONZ_ACCOUNT_SID` is set, agents can omit `pathParams.AccountSid` for Account-scoped routes.
- Permission failures return before endpoint-specific argument validation for blocked methods.

### Development

If you are working from source instead of using the published package:

1. Install dependencies:
   - `npm install`
2. Sync local Jambonz docs:
   - `npm run jambonz:sync`
3. Regenerate the REST catalog:
   - `npm run rest:catalog:generate`
4. Validate:
   - `npm run typecheck`
   - `npm test`

### Commands

- `npm run dev`: Start the MCP server with stdio transport from source
- `npm run build`: Build the published ESM bundle
- `npm run typecheck`: Run TypeScript validation
- `npm test`: Run deterministic unit tests
- `npm run protocol:sync`: Refresh local MCP protocol docs in `docs/protocol`
- `npm run jambonz:sync`: Refresh local Jambonz docs in `docs/jambonz`
- `npm run rest:catalog:generate`: Regenerate `src/rest/catalog.generated.ts`
- `npm run rest:catalog:check`: Verify the generated REST catalog is current
- `npm run inspect`: Launch MCP Inspector against the local source build
- `npm run inspect:help`: Show MCP Inspector CLI options

### Release

This repository publishes the package to npm on Git tags that match `v*` using GitHub Actions.

Release flow:

1. Ensure `package.json` version matches the intended release
2. Push a tag such as `v1.0.3`
3. Configure the repository secret `NPM_TOKEN`

The workflow installs dependencies, installs the Linux Rollup native binary explicitly, runs `typecheck`, runs `test`, builds `dist/`, and publishes with provenance enabled.
