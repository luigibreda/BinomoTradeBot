import { api } from "../../api";

export type RegisterType = {
  direction: string;
  tradingAsset: string;
  time: string;
  type: string;
  _id: string;
};

export const entryServices = {
  registerEntry: async (data: RegisterType) => {
    try {
      const res = await api.post("/entry", data);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getEntrys: async () => {
    try {
      const res = await api.get("/entry");
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
