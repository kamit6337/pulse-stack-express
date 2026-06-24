const SENSITIVE_HEADERS = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "api-key",
  "token",
  "refresh-token",
  "x-auth-token",
]);

const SENSITIVE_FIELDS = new Set([
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "secret",
  "apiKey",
  "creditCard",
]);

export function sanitizeHeaders(headers: Record<string, any>) {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers)) {
    const lower = key.toLowerCase();

    if (SENSITIVE_HEADERS.has(lower)) {
      result[key] = "[REDACTED]";
      continue;
    }

    const str = String(value);

    result[key] = str.length > 500 ? str.slice(0, 500) + "...[TRUNCATED]" : str;
  }

  return result;
}

export function scrubObject(obj: Record<string, any>) {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_FIELDS.has(key)) {
      result[key] = "[REDACTED]";
      continue;
    }

    result[key] = value;
  }

  return result;
}

export function sanitizeBody(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeBody);
  }

  const result: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    if (SENSITIVE_FIELDS.has(key)) {
      result[key] = "[REDACTED]";
      continue;
    }

    result[key] = sanitizeBody(val);
  }

  return result;
}

function truncateString(value: string, max = 5000) {
  return value.length > max ? value.slice(0, max) + "...[TRUNCATED]" : value;
}

function safeSerialize(data: unknown, maxBytes = 10000) {
  const json = JSON.stringify(data);

  if (json.length <= maxBytes) {
    return data;
  }

  return {
    _truncated: true,
    preview: json.slice(0, maxBytes),
  };
}
