import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "./chormeSessionStorage";

type ExtensionStore = {
  operatorIsOnline: boolean;
  token: string;
  setOperatorIsOnline: (value: boolean) => void;
  setToken: (value: string) => void;
};

export const useExtensionStore = create<ExtensionStore>()(
  persist(
    (set, get) => ({
      token: "",
      operatorIsOnline: false,
      setOperatorIsOnline: (value: boolean) => set({ operatorIsOnline: value }),
      setToken: (value: string) => set({ token: value }),
    }),
    {
      name: "extensionStore-client",
      storage: createJSONStorage(() => storage),
    }
  )
);
