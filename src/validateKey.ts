import axios from "axios";
import { BASE_URL } from "./base_url.js";

export const validateKey = async (key: string) => {
  try {
    await axios.get(`${BASE_URL}/issues`, {
      headers: { Authorization: `Bearer ${key}` },
    });
  } catch (error) {
    throw new Error("Please give right secret key");
  }
};
