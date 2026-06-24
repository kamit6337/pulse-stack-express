import { Request } from "express";
import { levelConfig } from "./level";
import { system } from "./handlers/system";
import { batchErrors } from "./batchErrors";
import { getConfig } from "./client";
import { BatchErrorType } from "./types";
import { UAParser } from "ua-parser-js";
import { sdkInfo } from "./sdk";

function sanitizeHeaders(headers: Record<string, any>) {
  const copy = { ...headers };

  delete copy.authorization;
  delete copy.cookie;
  delete copy["set-cookie"];

  return copy;
}

export const middleware = (req: Request, err: Error) => {
  const ua = new UAParser(req.headers["user-agent"]);

  const systemConfig = system();

  const request = {
    method: req.method,
    url: req.originalUrl,
    path: req.path,
    query: req.query,
    body: req.body,
    headers: sanitizeHeaders(req.headers),
  };

  const obj: BatchErrorType = {
    name: err.name || "Unknown Error",
    message: err.message,
    error: {
      environment: getConfig().environment,
      stack: err.stack,
      level: levelConfig("error"),
      server: systemConfig.server,
      route: req.path,
      request,
      runtime: { ip: req.ip, ...systemConfig.runtime },
      release: getConfig().release,
      browser: {
        name: ua.getBrowser().name ?? "unknown",
        version: ua.getBrowser().version ?? "unknown",
      },
      device: ua.getDevice().type ?? "desktop",
      sdk: sdkInfo(),
    },
  };

  console.log("MIDDLEWARE EXCEPTION", obj);

  batchErrors(obj);
};
