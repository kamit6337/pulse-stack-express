import { collectMiddlewareErrors } from "../collection.js";
import { levelConfig } from "../level.js";
import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

export function sanitizeHeaders(headers: Record<string, any>) {
  const copy = { ...headers };

  delete copy.authorization;
  delete copy.cookie;
  delete copy["set-cookie"];

  return copy;
}

export const expressErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const {
  //   baseUrl,
  //   route,
  //   body,
  //   headers,
  //   hostname,
  //   ip,
  //   originalUrl,
  //   params,
  //   path, //route
  //   query,
  // } = req;

  const request = {
    method: req.method,
    url: req.url,
    path: req.path,

    query: req.query,
    body: req.body,
    headers: sanitizeHeaders(req.headers),
  };

  const obj = {
    name: err.name || "Unknown Error",
    message: err.message,
    stack: err.stack,
    ip: req.ip,
    request,
    route: req.path,
    level: levelConfig("error"),
  };

  console.log("OBJECT FROM EXPRESS ERROR HANDLER", obj);

  collectMiddlewareErrors(obj);

  next(err);
};
