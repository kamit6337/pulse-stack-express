import { registerGlobalHandlers } from "./handlers/global.js";

export interface InitOptions {
  apiKey: string;
  endpoint: string;
  environment?: string;
}

let config: InitOptions;

export const init = (options: InitOptions) => {
  config = options;

  registerGlobalHandlers();
};

export const getConfig = () => config;
