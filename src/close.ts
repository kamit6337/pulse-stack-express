import { flushErrors } from "./flushErrors";

export const close = async () => {
  await Promise.race([
    flushErrors(),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]);
};
