import { captureException } from "../capture.js";

export const expressErrorHandler = () => {
  return (err: any, req: any, res: any, next: any) => {
    captureException(err);

    next(err);
  };
};
