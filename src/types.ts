export type BatchErrorType = Omit<
  ErrorBucket,
  "occurrenceCount" | "firstSeen" | "lastSeen"
>;

export type ErrorBucket = {
  name: string;
  message: string;
  occurrenceCount: number;
  firstSeen: Date;
  lastSeen: Date;
  error: CreateIssueEventType;
};

export type CreateIssueEventType = {
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

  tags?: Record<string, string>;

  metadata?: any;

  sdk: {
    name: string;
    version: string;
  };
};
