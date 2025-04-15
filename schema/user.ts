import { type } from "arktype";

export const userSignupDTO = type({
  name: "string > 5",
  username: "string",
  password: "string > 7",
  email: "string.email",
  mobileNumber: "10 <= string.integer <= 10",
  state: "string",
  country: "string",
  role: "string",
});

type userSignupDTO = typeof userSignupDTO.infer;

export const userLoginDTO = type({
  username: "string",
  password: "string > 7",
});

type userLoginDTO = typeof userLoginDTO.infer;
