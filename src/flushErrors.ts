import { errorMap } from "./batchErrors.js";
import { sendError } from "./transport.js";
import { ErrorBucket } from "./types.js";

const failedPayload: ErrorBucket[] = [];

export const flushErrors = async () => {
  if (errorMap.size === 0) return;

  const payload = Array.from(errorMap.values());

  errorMap.clear();
  try {
    await sendError(payload);

    if (failedPayload.length > 0) {
      await sendError(failedPayload);
    }
  } catch {
    failedPayload.push(...payload);

    // Re-add failed payloads
  }
};
