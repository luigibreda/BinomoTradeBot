import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "./chormeSessionStorage";

type ExtensionStore = {
  startedMirroring: boolean;
  timestampStarted: number;
  secondsPassed: number;
  onlineUsers: number;
  plays: number;
  setStartedMirroring: (startedMirroring: boolean) => void;
  resetCounter: () => void;
  startCount: () => void;
  setOnlineUsers: (onlineUsers: number) => void;
};

let counterInterval: any;

export const useExtensionStore = create<ExtensionStore>()(
  persist(
    (set, get) => ({
      startedMirroring: false,
      timestampStarted: 0,
      secondsPassed: 0,
      plays: 0,
      onlineUsers: 0,
      setOnlineUsers: (onlineUsers: number) => {
        set({ onlineUsers });
      },
      setStartedMirroring: (startedMirroring: boolean) => {
        set({ startedMirroring });
      },
      resetCounter: () => {
        set({ timestampStarted: 0, secondsPassed: 0, plays: 0 });
        clearInterval(counterInterval);
      },
      startCount: () => {
        if (get().timestampStarted == 0) {
          set({ timestampStarted: Date.now() });
        }
        const currentSecondsPassed = Math.floor(
          (Date.now() - get().timestampStarted) / 1000
        );
        set({ secondsPassed: currentSecondsPassed });
        counterInterval = setInterval(() => {
          set({ secondsPassed: get().secondsPassed + 1 });
        }, 1000);
      },
    }),
    {
      name: "extensionStore",
      storage: createJSONStorage(() => storage),
    }
  )
);
