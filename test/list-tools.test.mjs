/**
 * Test that the MCP server only exposes the read-only tool set.
 */
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

const expectedReadOnlyTools = new Set([
  "search_accounts",
  "get_bill_payment",
  "search_bill_payments",
  "get-bill",
  "search_bills",
  "get_customer",
  "search_customers",
  "get_employee",
  "search_employees",
  "get_estimate",
  "search_estimates",
  "read_invoice",
  "search_invoices",
  "read_item",
  "search_items",
  "get_journal_entry",
  "search_journal_entries",
  "get_purchase",
  "search_purchases",
  "get-vendor",
  "search_vendors",
]);

test("MCP server lists only read-only tools", async () => {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/index.js"],
    cwd: projectRoot,
  });

  const client = new Client({
    name: "list-tools-test",
    version: "1.0.0",
  });

  await client.connect(transport);

  try {
    const result = await client.listTools();
    assert(result != null, "tools/list result should be defined");
    assert(Array.isArray(result.tools), "result.tools should be an array");

    const listed = result.tools.map((t) => t.name);
    const listedSet = new Set(listed);

    assert.strictEqual(
      listed.length,
      listedSet.size,
      `Duplicate tool names: ${listed.filter((n, i) => listed.indexOf(n) !== i).join(", ") || "none"}`
    );

    assert.strictEqual(
      listedSet.size,
      expectedReadOnlyTools.size,
      `Expected ${expectedReadOnlyTools.size} tools, got ${listedSet.size}. Listed: ${[
        ...listedSet,
      ]
        .sort()
        .join(", ")}`
    );

    for (const name of expectedReadOnlyTools) {
      assert(listedSet.has(name), `Missing expected tool "${name}".`);
    }

    for (const name of listedSet) {
      assert(expectedReadOnlyTools.has(name), `Unexpected tool "${name}".`);
    }
  } finally {
    await transport.close();
  }
});
