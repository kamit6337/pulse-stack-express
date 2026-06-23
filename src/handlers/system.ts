import os from "os";

export const system = () => {
  const cpuUsage = process.cpuUsage();

  return {
    nodeVersion: process.version,
    platform: process.platform as string,
    memoryUsage: process.memoryUsage().heapUsed,
    cpuUsage: cpuUsage.user + cpuUsage.system,
    // hostname: os.hostname(),
  };
};
