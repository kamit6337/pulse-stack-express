// import { batchErrors } from "./batchErrors.js";
// import { getConfig } from "./client.js";
// import { system } from "./handlers/system.js";
// import { sdkInfo } from "./sdk.js";
// import { CreateIssueType } from "./types.js";

// type CollectionMiddlewareType = Pick<
//   CreateIssueType,
//   "name" | "message" | "request" | "stack" | "route" | "level"
// > & { ip: string | undefined };

// export const collectMiddlewareErrors = (data: CollectionMiddlewareType) => {
//   const systemConfig = system();

//   const { ip, ...rest } = data;

//   const modifyData = {
//     ...rest,
//     runtime: { ip, ...systemConfig },
//     environment: getConfig().environment,
//     sdk: sdkInfo(),
//   };

//   console.log("COLLECT MIDDLEWARE ERRORS", modifyData);

//   batchErrors(modifyData);
// };
