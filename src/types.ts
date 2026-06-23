export type ErrorBucket = {
  error: CreateIssueType;
  count: number;
  firstSeen: number;
  lastSeen: number;
};

export type CreateIssueType = {
  message: string;
  name?: string;
  stack?: string;
  code?: string;
  environment: "development" | "staging" | "production";
  level: "fatal" | "error" | "warning" | "info";
  route?: string;
  release?: string;
  device?: string;

  server?: {
    hostname: string;
    region: string;
  };

  browser?: {
    name: string;
    version: string;
  };

  request?: {
    method: string;
    url: string;
    path: string;

    query?: any;
    body?: any;
    headers: any;
  };

  runtime: {
    nodeVersion: string;
    platform: string;
    memoryUsage: number;
    cpuUsage: number;
    ip?: string;
  };

  tags?: Record<string, string>;

  metadata?: any;

  sdk: {
    name: string;
    version: string;
  };
};
