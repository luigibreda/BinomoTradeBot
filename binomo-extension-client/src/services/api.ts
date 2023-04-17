import axios from "axios";
import { urls } from "../constants";
import { useExtensionStore } from "../store/extensionStore";

const api = axios.create({
  baseURL: `${urls.PROD}/api`,
});

api.defaults.headers["Authorization"] = `Bearer ${
  useExtensionStore.getState().token
}`;

export { api };
