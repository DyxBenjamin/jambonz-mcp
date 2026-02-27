# jambonz-mcp

Production-focused TypeScript MCP server for Jambonz.

It exposes two surfaces:

- Documentation intelligence from locally synced Jambonz docs.
- One MCP tool per REST API endpoint in the Jambonz API Reference.

## What It Exposes

### Documentation tools

- `jambonz_docs_search`
- `jambonz_docs_read`
- `jambonz_docs_schema`

### REST tools

- One tool per REST endpoint under Jambonz REST API Reference.
- Deterministic naming: `jambonz_<domain>_<endpoint_slug>`.
- Examples:
  - `jambonz_alerts_list_alerts_by_account`
  - `jambonz_recent_calls_list_recent_calls`
  - `jambonz_users_create_user`

### MCP resources and prompts

- `jambonz://docs/index`
- `jambonz://rest/catalog`
- `jambonz://rest/usage`
- `jambonz://runtime/defaults`
- `jambonz://doc/{path}`
- `jambonz://schema/{operationId}`
- Prompt: `jambonz_usage_guide`

## Setup

1. Install dependencies:
   - `npm install`
2. Sync local Jambonz docs:
   - `npm run jambonz:sync`
3. Regenerate the REST catalog from the synced docs:
   - `npm run rest:catalog:generate`
4. Validate the build:
   - `npm run typecheck`
   - `npm test`

## Runtime Configuration

- `JAMBONZ_DOCS_DIR` (default: `docs/jambonz`)
- `JAMBONZ_API_BASE_URL` (default: `https://jambonz.cloud/api`)
- `JAMBONZ_API_TOKEN`
- `JAMBONZ_ACCOUNT_SID`
- `JAMBONZ_API_PERMISSION_LEVEL` (`READ_ONLY`, `READ_WRITE`, `ADMIN`)
- `JAMBONZ_HTTP_TIMEOUT_MS` (default: `15000`)
- `JAMBONZ_ALLOW_TOKEN_OVERRIDE` (`true` or `false`)
- `JAMBONZ_ALLOW_BASE_URL_OVERRIDE` (`true` or `false`)

Operational behavior:

- If `JAMBONZ_ACCOUNT_SID` is set, AccountSid-scoped tools apply it automatically when `pathParams.AccountSid` is omitted.
- `jambonz://runtime/defaults` exposes the active permission level and whether a default `AccountSid` is configured.
- Permission failures return before endpoint-level argument validation for methods blocked by `JAMBONZ_API_PERMISSION_LEVEL`.

## Permission Model

- `READ_ONLY`: `GET`
- `READ_WRITE`: `GET`, `POST`, `PUT`, `PATCH`
- `ADMIN`: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

All tools remain listed. Execution is gated at runtime.

## Codex MCP Registration

This server is designed to run as a local `stdio` MCP server.

Example `~/.codex/config.toml` entry:

```toml
[mcp_servers.jambonz]
command = "npx"
args = ["-y", "tsx", "src/index.ts"]
cwd = "/Users/qrsof/Documents/benjamin/devclusters/workspaces/@dyxbenjamin/MCPs/jambonz-mcp"
startup_timeout_sec = 20
tool_timeout_sec = 120
enabled = true

[mcp_servers.jambonz.env]
JAMBONZ_API_TOKEN = "your-token"
JAMBONZ_ACCOUNT_SID = "your-account-sid"
JAMBONZ_API_PERMISSION_LEVEL = "READ_ONLY"
```

`cwd` is required because the server resolves `src/index.ts` and local docs relative to the repository root.

## Commands

- `npm run dev`: Start the MCP server with stdio transport.
- `npm run build`: Build the ESM bundle with declarations.
- `npm run typecheck`: Run TypeScript validation.
- `npm test`: Run deterministic unit tests.
- `npm run protocol:sync`: Refresh local MCP protocol docs in `docs/protocol`.
- `npm run jambonz:sync`: Refresh local Jambonz docs in `docs/jambonz`.
- `npm run rest:catalog:generate`: Regenerate `src/rest/catalog.generated.ts`.
- `npm run rest:catalog:check`: Verify the generated REST catalog is current.
- `npm run inspect`: Launch MCP Inspector against this server.
- `npm run inspect:help`: Show MCP Inspector CLI options.

## Release

This repository publishes the package to npm on Git tags that match `v*` using GitHub Actions.

Release flow:

1. Ensure `package.json` version matches the intended release.
2. Push a tag such as `v1.0.0`.
3. Configure the repository secret `NPM_TOKEN`.

The workflow installs dependencies with `npm ci`, runs `typecheck`, runs `test`, builds `dist/`, and publishes with provenance enabled.
