import axios from "axios";
import { getConfig } from "./client.js";
import { CreateIssueType } from "./types.js";
import zlib from "node:zlib";

const BASE_URL = "https://pulse-stack-hm6s.onrender.com";

const compressedPayload = (payload: any) => {
  return zlib.gzipSync(JSON.stringify(payload));
};

export const sendError = async (payload: any) => {
  const key = getConfig().apiKey;

  await axios.post(`${BASE_URL}/issues`, compressedPayload(payload), {
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Encoding": "gzip",
      "Content-Type": "application/json",
    },
  });
};
