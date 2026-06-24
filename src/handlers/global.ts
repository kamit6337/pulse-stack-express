import { captureMessage } from "../capture.js";
import { flushErrors } from "../flushErrors.js";

export const registerGlobalHandlers = () => {
  console.log("RegisterGlobalHandlers");

  process.on("uncaughtException", async (error) => {
    console.log("UncaughtException", error);

    captureMessage({
      name: error.name,
      message: error.message,
      stack: error.stack,
      level: "info",
    });

    flushErrors()
      .catch(console.error)
      .finally(() => process.exit(1));
  });

  process.on("unhandledRejection", async (reason) => {
    console.log("UnhandledRejection");

    const error = reason instanceof Error ? reason : new Error(String(reason));
    captureMessage({
      name: error.name,
      message: error.message,
      stack: error.stack,
      level: "info",
    });

    await flushErrors();

    process.exit(1);
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
