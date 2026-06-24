import { init } from "./client.js";
import { captureException, captureMessage } from "./capture.js";
import { expressErrorHandler } from "./integrations/express.js";
import requestHandler from "./integrations/requestHandler.js";
export type { InitOptions } from "./client.js";

const Monitor = {
  init,
  captureException,
  captureMessage,
  expressErrorHandler,
  requestHandler,
};

export default Monitor;
