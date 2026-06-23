import axios from "axios";
import { getConfig } from "./client.js";
import zlib from "node:zlib";
import { ErrorBucket } from "./types.js";
import { BASE_URL } from "./base_url.js";

const compressedPayload = (payload: ErrorBucket[]) => {
  return zlib.brotliCompressSync(Buffer.from(JSON.stringify(payload)));
};

export const sendError = async (payload: ErrorBucket[]) => {
  const key = getConfig().apiKey;

  const response = await axios.post(
    `${BASE_URL}/issues`,
    compressedPayload(payload),
    {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Encoding": "br",
        "Content-Type": "application/octet-stream",
      },
    },
  );

  console.log("RESPONSE SEND ERROR", response);
};
