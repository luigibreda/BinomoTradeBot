import { Credentials } from "../../../types";
import { api } from "../../api";

export const UserServices = {
  login: async (credentials: Credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      return data;
    } catch (error) {
      throw error;
    }
  },
  me: async () => {
    try {
      const { data } = await api.get("/auth/me");
      return data;
    } catch (error) {
      throw error;
    }
  },
};
