import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { middleware } from "../middleware.js";

export const expressErrorHandler =
  (): ErrorRequestHandler =>
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    middleware(err);

    next(err);
  };
