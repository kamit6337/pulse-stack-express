import { init } from "./client.js";

import { captureException, captureMessage } from "./capture.js";

import { expressErrorHandler } from "./integrations/express.js";

export type { InitOptions } from "./client.js";

const Monitor = {
  init,
  captureException,
  captureMessage,
  expressErrorHandler,
};

export default Monitor;
