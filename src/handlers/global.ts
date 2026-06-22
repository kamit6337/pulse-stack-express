import { captureException } from "../capture.js";

export const registerGlobalHandlers = () => {
  process.on("uncaughtException", (error) => {
    captureException(error);
  });

  process.on("unhandledRejection", (reason) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    captureException(error);
  });
};
