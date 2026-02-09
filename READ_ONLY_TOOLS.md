# Tool Access Note

This server no longer operates in read-only mode.

All implemented QuickBooks MCP tools are now registered in `src/index.ts`, including create, update, and delete operations where available.

For an authoritative, machine-readable list of currently exposed tools, run:

```bash
npm run export-tools
```

This generates `tools-list.json` from the live `tools/list` response.
