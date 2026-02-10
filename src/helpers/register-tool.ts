import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";
import { normalizeError } from "./normalize-error.js";
import { ToolErrorEnvelope } from "../types/tool-error.js";

export function RegisterTool<T extends z.ZodType<any, any>>(
  server: McpServer,
  toolDefinition: ToolDefinition<T>
) {
  const wrappedHandler = (async (args: { [x: string]: unknown }, extra: unknown) => {
    try {
      const result = await toolDefinition.handler(args as never, extra as never);
      return normalizeToolResult(result, toolDefinition.name);
    } catch (error) {
      const normalized = normalizeError(error, { operation: toolDefinition.name });
      return buildMcpErrorResult({
        ok: false,
        error: normalized,
      });
    }
  }) as unknown as typeof toolDefinition.handler;

  server.tool(
    toolDefinition.name,
    toolDefinition.description,
    { params: toolDefinition.schema },
    wrappedHandler
  );
}

function normalizeToolResult(result: unknown, toolName: string): unknown {
  if (!isRecord(result)) {
    const normalized = normalizeError(result, { operation: toolName });
    return buildMcpErrorResult({ ok: false, error: normalized });
  }

  const explicitError = result.isError === true;
  const parsed = extractLegacyErrorFromContent(result);
  if (!explicitError && !parsed) {
    return result;
  }

  const source = parsed ? parsed.errorBody : result;
  const normalized = normalizeError(source, {
    operation: parsed?.operation ?? toolName,
  });

  return buildMcpErrorResult(
    { ok: false, error: normalized },
    parsed?.fullText ?? getFirstText(result.content)
  );
}

function extractLegacyErrorFromContent(result: Record<string, unknown>): {
  fullText: string;
  operation: string | null;
  errorBody: string;
} | null {
  const text = getFirstText(result.content);
  if (!text) {
    return null;
  }

  if (text.startsWith("Invalid criteria:")) {
    return {
      fullText: text,
      operation: null,
      errorBody: text,
    };
  }

  const errorMatch = text.match(/^Error\s+(.+?):\s*([\s\S]+)$/);
  if (!errorMatch) {
    return null;
  }

  return {
    fullText: text,
    operation: errorMatch[1].trim(),
    errorBody: errorMatch[2].trim(),
  };
}

function buildMcpErrorResult(
  envelope: ToolErrorEnvelope,
  humanMessage?: string | null
): {
  content: { type: "text"; text: string }[];
  isError: true;
  structuredContent: ToolErrorEnvelope;
} {
  const fallbackMessage = envelope.error.detail
    ? `${envelope.error.message}. ${envelope.error.detail}`
    : envelope.error.message;
  const text = humanMessage && humanMessage.trim().length > 0 ? humanMessage : fallbackMessage;

  return {
    content: [
      { type: "text", text },
      { type: "text", text: JSON.stringify(envelope) },
    ],
    isError: true,
    structuredContent: envelope,
  };
}

function getFirstText(content: unknown): string | null {
  if (!Array.isArray(content)) {
    return null;
  }
  for (const item of content) {
    if (isRecord(item) && item.type === "text" && typeof item.text === "string") {
      return item.text;
    }
  }
  return null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
