import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
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

let operatorOnline;

io.on("connection", (socket) => {
  socket.emit("online-users", io.engine.clientsCount - 1);

  socket.emit("operator-online", {
    online: operatorOnline,
  });

  socket.on("disconnect", () => {
    io.emit("online-users", io.engine.clientsCount - 1);
  });
});

httpServer.listen(port, () => {
  console.log("listening on *:" + port);
});

app.post("/webhook", (req, res) => {
  const { emit, data } = req.body;

  io.emit(emit, data);
  res.json({ message: "ok" });
});

app.post("/operator-online", (req, res) => {
  const { online } = req.body;
  operatorOnline = online;
  io.emit("operator-online", { online });
  res.json({ message: "ok" });
});
