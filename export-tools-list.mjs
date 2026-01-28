import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = __dirname;

async function main() {
  const outputPath = process.argv[2]
    ? join(projectRoot, process.argv[2])
    : join(projectRoot, "tools-list.json");

  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/index.js"],
    cwd: projectRoot,
  });

  const client = new Client({
    name: "tools-list-exporter",
    version: "1.0.0",
  });

  await client.connect(transport);

  try {
    const result = await client.listTools();
    const payload = {
      generatedAt: new Date().toISOString(),
      ...result,
    };

    await writeFile(outputPath, JSON.stringify(payload, null, 2), "utf8");
  } finally {
    await transport.close();
  }
}

main().catch((error) => {
  console.error("Failed to export tools list:", error);
  process.exitCode = 1;
});
