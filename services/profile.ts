import axios from "axios";
import { baseURL } from "utils/config";

export const getCurrentUser = async () => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const response = await axios.get(`${baseURL}/user/current-user`, config);
  return response.data;
};
