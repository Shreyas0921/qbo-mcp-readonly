import { normalizeError } from "./normalize-error.js";

/**
 * Formats an error into a standardized error message
 * @param error Any error object to format
 * @returns A formatted error message as a string
 */
export function formatError(error: unknown): string {
  const normalized = normalizeError(error);
  return normalized.detail ? `${normalized.message}. ${normalized.detail}` : normalized.message;
}
