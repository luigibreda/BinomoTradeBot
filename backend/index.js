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

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log("server online")
});

app.post("/webhook", (req, res) => {
  const { message } = req.body;

  io.emit("message", message);
  res.json({ message: "ok" });
});
