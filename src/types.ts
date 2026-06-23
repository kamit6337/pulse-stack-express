export type ErrorBucket = {
  error: CreateIssueType;
  count: number;
  firstSeen: number;
  lastSeen: number;
};

export type CreateIssueType = {
  name: string;
  message: string;
  environment: "development" | "staging" | "production";
  stack?: string;
  code?: string;
  level: "fatal" | "error" | "warning" | "info";
  server?: {
    hostname: string;
    region: string;
  };
  route?: string;

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

  release?: string;

  browser?: {
    name: string;
    version: string;
  };
  device?: string;

  tags?: Map<string, string> | null | undefined;

  metadata?: any;

  sdk: {
    name: string;
    version: string;
  };
};
