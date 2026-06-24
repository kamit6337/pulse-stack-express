import { levelConfig } from "./level";
import { batchErrors } from "./batchErrors";
import { getConfig } from "./client";
import { BatchErrorType } from "./types";
import { getRequestStorageInfo } from "./integrations/storage";

export const middleware = (err: Error) => {
  const requestStorageInfo = getRequestStorageInfo();

  const obj: BatchErrorType = {
    name: err.name || "Unknown Error",
    message: err.message,
    error: {
      environment: getConfig().environment,
      stack: err.stack,
      level: levelConfig("error"),
      release: getConfig().release,
      ...requestStorageInfo,
    },
  };

  console.log("MIDDLEWARE EXCEPTION", obj);

  batchErrors(obj);
};
