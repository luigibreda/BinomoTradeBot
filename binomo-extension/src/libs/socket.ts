import { io } from "socket.io-client";

const urls = {
  DEV: "http://localhost:3000",
  PROD: "https://binomotradebot-production.up.railway.app/",
};

export const socket = io(urls.DEV);
