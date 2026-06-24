import type { BatchErrorType, ErrorBucket } from "./types.js";

export const errorMap = new Map<string, ErrorBucket>();

export const batchErrors = (errorBucket: BatchErrorType) => {
  const key = `${errorBucket.name}:${errorBucket.message}`;

  console.log("BATCH ERRORS", errorMap);

  const existing = errorMap.get(key);

  const now = new Date(Date.now());

  if (existing) {
    existing.occurrenceCount++;
    existing.lastSeen = now;
    return;
  }

  errorMap.set(key, {
    name: errorBucket.name,
    message: errorBucket.message,
    occurrenceCount: 1,
    firstSeen: now,
    lastSeen: now,
    error: errorBucket.error,
  });

  console.log("ERROR MAP FROM BATCH ERROR", errorMap);
};
