import { collectMiddlewareErrors } from "./collection.js";
import { sanitizeHeaders } from "./integrations/express.js";
import { levelConfig } from "./level.js";
import type { Request } from "express";
import { CreateIssueType } from "./types.js";
import { system } from "./handlers/system.js";
import { getConfig } from "./client.js";
import { sdkInfo } from "./sdk.js";
import { batchErrors } from "./batchErrors.js";

type CollectionMiddlewareType = Pick<
  CreateIssueType,
  "name" | "message" | "level"
> & { stack?: string };

export const captureException = async (req: Request, err: Error) => {
  const request = {
    method: req.method,
    url: req.url,
    path: req.path,

    query: req.query,
    body: req.body,
    headers: sanitizeHeaders(req.headers),
  };

  const obj = {
    name: err.name,
    message: err.message,
    stack: err.stack,
    ip: req.ip,
    request,
    route: req.path,
    level: levelConfig("error"),
  };

  collectMiddlewareErrors(obj);
};

export const captureMessage = async (data: CollectionMiddlewareType) => {
  const { name, message, level } = data;

  const systemConfig = system();

  const obj = {
    name,
    message,
    level,
    runtime: systemConfig,
    environment: getConfig().environment,
    sdk: sdkInfo(),
  };

  batchErrors(obj);
};
