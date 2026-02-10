import { ToolError } from "../types/tool-error.js";

type ErrorContext = {
  operation?: string;
  provider?: string;
};

type AnyRecord = Record<string, unknown>;

const QBO_FAULT_CODE_MAP: Record<string, string> = {
  ValidationFault: "QBO_VALIDATION_FAULT",
  AuthenticationFault: "QBO_AUTHENTICATION_FAULT",
  AuthorizationFault: "QBO_AUTHORIZATION_FAULT",
  ServiceFault: "QBO_SERVICE_FAULT",
};

export function normalizeError(error: unknown, context: ErrorContext = {}): ToolError {
  const provider = context.provider ?? "quickbooks";
  const operationPrefix = context.operation ? `${context.operation}: ` : "";

  if (isRecord(error)) {
    const qboFault = parseQuickBooksFault(error, provider, operationPrefix);
    if (qboFault) {
      return qboFault;
    }

    const genericMessage = pickString(error.message, error.error, error.detail, error.error_description);
    if (genericMessage) {
      return {
        code: "INTERNAL_ERROR",
        message: `${operationPrefix}${genericMessage}`,
        detail: null,
        retryable: false,
        provider,
        http_status: null,
        raw: error,
      };
    }

    return {
      code: "INTERNAL_UNKNOWN",
      message: `${operationPrefix}Unexpected error payload`,
      detail: null,
      retryable: false,
      provider,
      http_status: null,
      raw: error,
    };
  }

  if (error instanceof Error) {
    return normalizeTextError(error.message, provider, operationPrefix, error);
  }

  if (typeof error === "string") {
    return normalizeTextError(error, provider, operationPrefix, error);
  }

  return {
    code: "INTERNAL_UNKNOWN",
    message: `${operationPrefix}Unexpected non-object error`,
    detail: null,
    retryable: false,
    provider,
    http_status: null,
    raw: error,
  };
}

function normalizeTextError(
  input: string,
  provider: string,
  operationPrefix: string,
  raw: unknown
): ToolError {
  const parsedOperation = extractOperationAndBody(input);
  const body = parsedOperation.body;
  const operation = parsedOperation.operation ?? operationPrefix.replace(/:\s*$/, "");
  const normalizedPrefix = operation ? `${operation}: ` : operationPrefix;

  const embeddedJson = extractEmbeddedJson(body);
  if (embeddedJson && isRecord(embeddedJson)) {
    const qboFault = parseQuickBooksFault(embeddedJson, provider, normalizedPrefix);
    if (qboFault) {
      return qboFault;
    }
  }

  const cleanBody = stripNoisePrefix(body);
  return {
    code: "INTERNAL_ERROR",
    message: `${normalizedPrefix}${cleanBody}`,
    detail: null,
    retryable: false,
    provider,
    http_status: null,
    raw,
  };
}

function parseQuickBooksFault(
  payload: AnyRecord,
  provider: string,
  operationPrefix: string
): ToolError | null {
  const faultValue = payload.Fault;
  if (!isRecord(faultValue)) {
    return null;
  }

  const faultType = typeof faultValue.type === "string" ? faultValue.type : "UnknownFault";
  const entries = Array.isArray(faultValue.Error) ? faultValue.Error.filter(isRecord) : [];

  if (entries.length === 0) {
    return {
      code: QBO_FAULT_CODE_MAP[faultType] ?? "QBO_FAULT",
      message: `${operationPrefix}QuickBooks ${faultType}`,
      detail: null,
      retryable: faultType === "ServiceFault",
      provider,
      http_status: null,
      raw: payload,
    };
  }

  const first = entries[0];
  const statusCode = toNumber(first.code);
  const message = pickString(first.Message, first.message) ?? `QuickBooks ${faultType}`;
  const detail = pickString(first.Detail, first.detail);

  return {
    code: QBO_FAULT_CODE_MAP[faultType] ?? "QBO_FAULT",
    message: `${operationPrefix}${message}`,
    detail: detail ?? null,
    retryable: isRetryableFault(faultType, statusCode),
    provider,
    http_status: statusCode ?? null,
    raw: payload,
  };
}

function isRetryableFault(faultType: string, statusCode: number | null): boolean {
  if (faultType === "ValidationFault") {
    return false;
  }
  if (faultType === "AuthenticationFault" || faultType === "AuthorizationFault") {
    return false;
  }
  if (statusCode !== null && statusCode >= 500) {
    return true;
  }
  return faultType === "ServiceFault";
}

function extractOperationAndBody(input: string): { operation: string | null; body: string } {
  const match = input.match(/^Error\s+(.+?):\s*([\s\S]+)$/);
  if (match) {
    return {
      operation: match[1].trim(),
      body: match[2].trim(),
    };
  }

  return { operation: null, body: input.trim() };
}

function stripNoisePrefix(input: string): string {
  return input.replace(/^(Error:\s*|Unknown error:\s*)+/i, "").trim();
}

function extractEmbeddedJson(input: string): unknown | null {
  const start = input.indexOf("{");
  if (start === -1) {
    return null;
  }

  const candidate = input.slice(start).trim();
  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}

function pickString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return null;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null;
}

