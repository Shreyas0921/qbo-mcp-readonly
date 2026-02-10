export interface ToolError {
  [key: string]: unknown;
  code: string;
  message: string;
  detail: string | null;
  retryable: boolean;
  provider: string;
  http_status: number | null;
  raw: unknown;
}

export interface ToolErrorEnvelope {
  [key: string]: unknown;
  ok: false;
  error: ToolError;
}
