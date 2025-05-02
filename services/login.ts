import axios from "axios";
import { baseURL } from "utils/config";
export const login = async (username: string, password: string) => {
  try {
    if (baseURL) {
      const request = axios.post(`${baseURL}/auth/login`, {
        username,
        password,
      });
      const response = await request;
      const receivedData = response.data;
      return receivedData;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in logging user: ${error.message}`
        : `unknown error in logging user.`;
    throw new Error(errorMessage);
  }
};
