import { BatchErrorType } from "./types.js";
import { system } from "./handlers/system.js";
import { getConfig } from "./client.js";
import { sdkInfo } from "./sdk.js";
import { batchErrors } from "./batchErrors.js";
import { middleware } from "./middleware.js";

type CollectionMiddlewareType = {
  name: string;
  message: string;
  level: "fatal" | "error" | "warning" | "info";
  stack?: string;
  route?: string;
  tags?: Record<string, string>;
};

export const captureException = async (err: Error) => {
  middleware(err);
};

export const captureMessage = async (data: CollectionMiddlewareType) => {
  const { name, message, level, stack, route, tags } = data;

  const systemConfig = system();

  const obj: BatchErrorType = {
    name,
    message,
    error: {
      environment: getConfig().environment,
      stack,
      level,
      server: systemConfig.server,
      route,
      runtime: systemConfig.runtime,
      release: getConfig().release,
      tags,
      sdk: sdkInfo(),
    },
  };

  batchErrors(obj);
};
