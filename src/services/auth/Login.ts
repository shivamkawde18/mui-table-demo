import { sendRequest } from "../apiServices";

export const loginUser = async (username: any, password: any) => {
  return sendRequest("/auth/login", "POST", { username, password });
};
