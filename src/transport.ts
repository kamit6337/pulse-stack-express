// src/transport.ts

import axios from "axios";

export const sendError = async (payload: any) => {
  await axios.post("https://api.yourapp.com/issues", payload);
};
