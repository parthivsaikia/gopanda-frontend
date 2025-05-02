import axios from "axios";
import { baseURL } from "utils/config";

export const getCsrfToken = async () => {
  const response = await axios.get(`${baseURL}/user/current-user`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};
