import { startBatchProcessor } from "./flushTimer.js";
import { registerGlobalHandlers } from "./handlers/global.js";
import { validateKey } from "./validateKey.js";

export interface InitOptions {
  apiKey: string;
  environment: "development" | "staging" | "production";
}

let config: InitOptions;

export const init = async (options: InitOptions) => {
  const { environment = "production", ...rest } = options;

  config = { environment, ...rest };

  await validateKey(options.apiKey);

  registerGlobalHandlers();

  startBatchProcessor();
};

export const getConfig = () => config;
