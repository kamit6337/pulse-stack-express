import type { Request } from "express";
import { CreateIssueType } from "./types.js";
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
};

export const captureException = async (req: Request, err: Error) => {
  middleware(req, err);
};

export const captureMessage = async (data: CollectionMiddlewareType) => {
  const { name, message, level, stack, route } = data;

  const systemConfig = system();

  const obj: CreateIssueType = {
    name,
    message,
    environment: getConfig().environment,
    stack,
    level,
    server: systemConfig.server,
    route,
    runtime: systemConfig.runtime,
    release: getConfig().release,
    sdk: sdkInfo(),
  };

  batchErrors(obj);
};
