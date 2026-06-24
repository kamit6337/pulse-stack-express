import { NextFunction, Request, RequestHandler, Response } from "express";
import { requestStorage } from "./storage";

const requestHandler = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Handler", req.originalUrl);

    requestStorage.run(
      {
        method: req.method,
        originalUrl: req.originalUrl,
        url: req.url,
        path: req.path,
        query: req.query,
        body: req.body,
        headers: req.headers,
        route: req.route,
        ip: req.ip,
      },
      () => {
        next();
      },
    );
  };
};

export default requestHandler;
