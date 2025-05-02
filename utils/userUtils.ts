import axios from "axios";
import { baseURL } from "./config";

const getCurrentUser = async () => {
  const response = await axios.get(`${baseURL}/user/current-user`, {
    headers: {
      "Content-Type": "application/json",
      "X-"
    },
    withCredentials: true,

  });
};
