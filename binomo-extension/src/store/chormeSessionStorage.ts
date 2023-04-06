import { StateStorage } from "zustand/middleware";

export const storage: StateStorage = {
  getItem: async (name) => {
    const result = await chrome.storage.session.get(name);
    console.log("result", result);
    return result[name];
  },
  setItem: async (name, value) => {
    await chrome.storage.session.set({ [name]: value });
    console.log("setItem", name, value);
  },
  removeItem: async (name) => {
    await chrome.storage.session.remove(name);
    console.log("removeItem", name);
  },
};
