import axios from "axios";
import { urls } from "../constants";

export const api = axios.create({
  baseURL: `${urls.DEV}/api`,
});
