/**
 * Test that the MCP server lists every tool defined in src/tools.
 */
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { readdir, readFile } from "node:fs/promises";
import assert from "node:assert";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

async function getExpectedToolNamesFromSource() {
  const toolsDir = join(projectRoot, "src", "tools");
  const files = (await readdir(toolsDir)).filter((file) => file.endsWith(".tool.ts"));

  const names = new Set();

  for (const file of files) {
    const content = await readFile(join(toolsDir, file), "utf8");
    const match = content.match(/const\s+toolName\s*=\s*["'`]([^"'`]+)["'`]/);
    assert(match, `Could not find toolName in ${file}`);
    names.add(match[1]);
  }

  return names;
}

test("MCP server lists all defined tools", async () => {
  const expectedTools = await getExpectedToolNamesFromSource();

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
      expectedTools.size,
      `Expected ${expectedTools.size} tools, got ${listedSet.size}. Listed: ${[
        ...listedSet,
      ]
        .sort()
        .join(", ")}`
    );

    for (const name of expectedTools) {
      assert(listedSet.has(name), `Missing expected tool "${name}".`);
    }

    for (const name of listedSet) {
      assert(expectedTools.has(name), `Unexpected tool "${name}".`);
    }
  } finally {
    await transport.close();
  }
});
