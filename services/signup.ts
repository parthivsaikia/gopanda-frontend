import axios from "axios";
import { baseURL } from "utils/config";

export const signup = async ({
  username,
  password,
  name,
  mobileNumber,
  state,
  country,
  role,
  email,
}: {
  username: string;
  password: string;
  name: string;
  mobileNumber: string;
  state: string;
  country: string;
  role: string;
  email: string;
}) => {
  const response = await axios.post(
    `${baseURL}/auth/signup`,
    {
      username,
      password,
      name,
      mobileNumber,
      state,
      country,
      role,
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  const userData = response.data;
  return userData;
};
