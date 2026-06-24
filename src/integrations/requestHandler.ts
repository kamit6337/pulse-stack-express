import { NextFunction, Request, RequestHandler, Response } from "express";
import { requestStorage } from "./storage";

const requestHandler = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Handler", req.originalUrl);

    requestStorage.run(req, () => {
      next();
    });
  };
};

export default requestHandler;
