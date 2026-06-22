import { sendError } from "./transport.js";

export const captureException = async (error: Error) => {
  await sendError({
    message: error.message,
    name: error.name,
    stack: error.stack,
  });
};

export const captureMessage = async (message: string) => {
  await sendError({
    message,
    level: "info",
  });
};
