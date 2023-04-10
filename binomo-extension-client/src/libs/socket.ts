import { io } from "socket.io-client";

export const socket = io("https://binomotradebot-production.up.railway.app/");

socket.on("connect", () => {
  console.log("Connected to server");
});
