import { captureMessage } from "../capture.js";
import { close } from "../close.js";

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

    await close();

    process.exit(1);
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

    await close();

    process.exit(1);
  });

  process.on("beforeExit", async () => {
    await close();
  });

  process.on("SIGINT", async () => {
    await close();

    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await close();

    process.exit(0);
  });
};
