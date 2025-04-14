import axios from "axios";
import { baseURL } from "utils/config";

export const getProfile = async (id: string, token: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseURL}/profile/${id}`, config);
  return response.data;
};
