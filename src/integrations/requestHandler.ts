import { NextFunction, Request, Response } from "express";
import { requestStorage } from "./storage";

const requestHandler = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    requestStorage.run(req, () => {
      next();
    });
  };
};

export default requestHandler;
