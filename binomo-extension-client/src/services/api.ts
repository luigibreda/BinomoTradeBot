import axios from "axios";
import { urls } from "../constants";

const api = axios.create({
  baseURL: `${urls.PROD}/api`,
});

export { api };
