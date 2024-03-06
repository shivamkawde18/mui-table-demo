import { sendRequest } from "../apiServices";

export const getData = async (token: any) => {
  return sendRequest("/store/listAllStones", "POST", { auth: token });
};