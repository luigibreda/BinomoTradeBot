import { io } from "socket.io-client";
import { urls } from "../constants";

export const socket = io(urls.PROD);

socket.on("connect", () => {
  console.log("Connected to server");
});
