import { startBatchProcessor } from "./flushTimer.js";
import { registerGlobalHandlers } from "./handlers/global.js";
import { validateKey } from "./validateKey.js";

export interface InitOptions {
  apiKey: string;
  environment: "development" | "staging" | "production";
  region?: string;
  release?: string;
}

let config: InitOptions;

export const init = async (options: InitOptions) => {
  try {
    const { environment = "production", ...rest } = options;

    config = { environment, ...rest };

    await validateKey(options.apiKey);

    console.log("Monitoring is started successfully");

    registerGlobalHandlers();

    startBatchProcessor();
  } catch (error) {
    console.error("Error in starting Monitoring", error);
  }
};

export const getConfig = () => config;
