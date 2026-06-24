import { AsyncLocalStorage } from "node:async_hooks";
import type { Request } from "express";
import { sanitizeBody, sanitizeHeaders, scrubObject } from "./request";
import safeStringify from "safe-stable-stringify";
import { UAParser } from "ua-parser-js";
import { system } from "../handlers/system";
import { sdkInfo } from "../sdk";

export const requestStorage = new AsyncLocalStorage<Request>();

export const getRequestStorageInfo = () => {
  const req = requestStorage.getStore();

  console.log("REQUEST", req);

  if (!req) {
    throw new Error("No request found in AsyncLocalStorage context");
  }

  const systemConfig = system();
  const ua = new UAParser(req.headers["user-agent"]);

  console.log("USER AGENT", req.headers["user-agent"]);
  console.log("UA", ua);
  console.log("UA BROWSER", ua.getBrowser());

  return {
    request: {
      method: req.method,
      url: req.originalUrl,
      path: req.path,
      query: scrubObject(req.query),
      body: safeStringify(sanitizeBody(req.body)),
      headers: sanitizeHeaders(req.headers),
    },
    browser: {
      name: ua.getBrowser().name ?? "unknown",
      version: ua.getBrowser().version ?? "unknown",
    },
    device: ua.getDevice().type ?? "desktop",
    route: req.route?.path as string | undefined,
    runtime: { ip: req.ip, ...systemConfig.runtime },
    server: systemConfig.server,
    sdk: sdkInfo(),
  };
};
