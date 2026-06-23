import type { CreateIssueType, ErrorBucket } from "./types.js";

export const errorMap = new Map<string, ErrorBucket>();

export const batchErrors = (error: CreateIssueType) => {
  const key = `${error.name}:${error.message}`;

  console.log("BATCH ERRORS", errorMap);

  const existing = errorMap.get(key);

  if (existing) {
    existing.count++;
    existing.lastSeen = Date.now();
    return;
  }

  errorMap.set(key, {
    error,
    count: 1,
    firstSeen: Date.now(),
    lastSeen: Date.now(),
  });

  console.log("ERROR MAP FROM BATCH ERROR", errorMap);
};
