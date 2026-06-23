import { flushErrors } from "./flushErrors";

let timer: NodeJS.Timeout | null = null;

export const startBatchProcessor = () => {
  if (timer) return;

  timer = setInterval(async () => {
    console.log("TIMER");
    await flushErrors();
  }, 10000); // 10 seconds
};
