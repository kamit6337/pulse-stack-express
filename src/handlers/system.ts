import os from "os";
import { getConfig } from "../client.js";

export const system = () => {
  const cpuUsage = process.cpuUsage();

  return {
    runtime: {
      nodeVersion: process.version,
      platform: process.platform as string,
      memoryUsage: process.memoryUsage().heapUsed,
      cpuUsage: cpuUsage.user + cpuUsage.system,
    },
    server: {
      hostname: os.hostname(),
      region: getConfig().region || "unknown",
    },
  };
};
