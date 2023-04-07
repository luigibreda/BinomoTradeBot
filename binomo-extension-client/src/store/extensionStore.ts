import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "./chormeSessionStorage";

type ExtensionStore = {
  operatorIsOnline: boolean;
  setOperatorIsOnline: (value: boolean) => void;
};

export const useExtensionStore = create<ExtensionStore>()(
  persist(
    (set, get) => ({
      operatorIsOnline: false,
      setOperatorIsOnline: (value: boolean) => set({ operatorIsOnline: value }),
    }),
    {
      name: "extensionStore-client",
      storage: createJSONStorage(() => storage),
    }
  )
);
