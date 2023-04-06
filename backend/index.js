import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import express from "express";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

io.on("connection", (socket) => {
  socket.emit("message", "Hello there from server");
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});

app.post("/webhook", (req, res) => {
  const { message } = req.body;

  io.emit("message", message);
  res.json({ message: "ok" });
});
