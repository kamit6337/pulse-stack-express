import axios from "axios";

const BASE_URL = "https://pulse-stack-hm6s.onrender.com";

export const validateKey = async (key: string) => {
  try {
    await axios.get(`${BASE_URL}/issues`, {
      headers: { Authorization: `Bearer ${key}` },
    });
  } catch (error) {
    throw new Error("Please give right secret key");
  }
};
