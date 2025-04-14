import axios from "axios";
const loginURL = "http";
export const login = async (username: string, password: string) => {
  try {
    if (loginURL) {
      const request = axios.post(`http://localhost:3005/login`, {
        username,
        password,
      });
      const response = await request;
      const user = response.data;
      return user;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in logging user: ${error.message}`
        : `unknown error in logging user.`;
    throw new Error(errorMessage);
  }
};
