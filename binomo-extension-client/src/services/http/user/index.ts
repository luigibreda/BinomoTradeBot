import { api } from "../../api";

export const UserServices = {
  login: async (credentials: any) => {
    try {
      const { data } = await api.post("/user/login", credentials);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
