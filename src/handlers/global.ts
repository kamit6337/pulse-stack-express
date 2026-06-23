import { captureMessage } from "../capture.js";
import { flushErrors } from "../flushErrors.js";

export const registerGlobalHandlers = () => {
  process.on("uncaughtException", (error) => {
    captureMessage({
      name: error.name,
      message: error.message,
      stack: error.stack,
      level: "info",
    });
  });

  process.on("unhandledRejection", (reason) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    captureMessage({
      name: error.name,
      message: error.message,
      stack: error.stack,
      level: "info",
    });
  });

  process.on("beforeExit", async () => {
    await flushErrors();
  });

  process.on("SIGINT", async () => {
    await flushErrors();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await flushErrors();
    process.exit(0);
  });
};
