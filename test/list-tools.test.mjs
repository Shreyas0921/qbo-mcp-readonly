/**
 * Test that the MCP server lists only the read-only tools (get/read/search).
 * See READ_ONLY_TOOLS.md for the canonical list.
 */
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

/** Read-only tool names from READ_ONLY_TOOLS.md (get, read, search only). */
const EXPECTED_READ_ONLY_TOOLS = new Set([
  "get-vendor",
  "get_estimate",
  "get_employee",
  "get-bill",
  "get_journal_entry",
  "get_customer",
  "get_bill_payment",
  "get_purchase",
  "read_item",
  "read_invoice",
  "search_journal_entries",
  "search_vendors",
  "search_items",
  "search_accounts",
  "search_bill_payments",
  "search_bills",
  "search_invoices",
  "search_estimates",
  "search_customers",
  "search_employees",
  "search_purchases",
]);

/** Mutation tools that must NOT be listed. */
const MUTATION_PREFIXES = ["create_", "create-", "update_", "update-", "delete_", "delete-"];

function isMutation(name) {
  return MUTATION_PREFIXES.some((p) => name.startsWith(p));
}

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

    // No duplicates
    assert.strictEqual(
      listed.length,
      listedSet.size,
      `Duplicate tool names: ${listed.filter((n, i) => listed.indexOf(n) !== i).join(", ") || "none"}`
    );

    // Exactly the expected read-only set
    assert.strictEqual(
      listedSet.size,
      EXPECTED_READ_ONLY_TOOLS.size,
      `Expected ${EXPECTED_READ_ONLY_TOOLS.size} tools, got ${listedSet.size}. Listed: ${[...listedSet].sort().join(", ")}`
    );

    for (const name of listedSet) {
      assert(
        EXPECTED_READ_ONLY_TOOLS.has(name),
        `Unexpected tool "${name}". Expected only read-only tools from READ_ONLY_TOOLS.md.`
      );
    }

    for (const name of EXPECTED_READ_ONLY_TOOLS) {
      assert(listedSet.has(name), `Missing expected read-only tool "${name}".`);
    }

    // No create/update/delete tools
    const mutations = listed.filter(isMutation);
    assert.strictEqual(
      mutations.length,
      0,
      `Mutation tools must not be listed: ${mutations.join(", ")}`
    );
  } finally {
    await transport.close();
  }
});
