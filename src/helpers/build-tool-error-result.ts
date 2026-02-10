import { normalizeError } from "./normalize-error.js";
import { ToolError, ToolErrorEnvelope } from "../types/tool-error.js";

function buildEnvelope(error: ToolError): ToolErrorEnvelope {
  return {
    ok: false,
    error,
  };
}

function defaultMessage(error: ToolError): string {
  return error.detail ? `${error.message}. ${error.detail}` : error.message;
}

export function buildToolErrorResult(
  toolName: string,
  error: unknown,
  humanMessage?: string
): {
  content: { type: "text"; text: string }[];
  isError: true;
  structuredContent: ToolErrorEnvelope;
} {
  const normalized = normalizeError(error, { operation: toolName });
  const envelope = buildEnvelope(normalized);

  return {
    content: [
      { type: "text", text: humanMessage ?? defaultMessage(normalized) },
      { type: "text", text: JSON.stringify(envelope) },
    ],
    isError: true,
    structuredContent: envelope,
  };
}

export function buildToolInputErrorResult(
  toolName: string,
  message: string,
  raw: unknown
): {
  content: { type: "text"; text: string }[];
  isError: true;
  structuredContent: ToolErrorEnvelope;
} {
  const normalized: ToolError = {
    code: "INPUT_VALIDATION_ERROR",
    message: `${toolName}: Invalid input`,
    detail: message,
    retryable: false,
    provider: "quickbooks",
    http_status: 400,
    raw,
  };

  const envelope = buildEnvelope(normalized);
  return {
    content: [
      { type: "text", text: `${normalized.message}. ${normalized.detail}` },
      { type: "text", text: JSON.stringify(envelope) },
    ],
    isError: true,
    structuredContent: envelope,
  };
}

