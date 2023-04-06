import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import express from "express";

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

io.on("connection", (socket) => {
  io.emit("online-users", io.engine.clientsCount - 1);

  socket.on("disconnect", () => {
    io.emit("online-users", io.engine.clientsCount - 1);
  });
});

httpServer.listen(port, () => {
  console.log("listening on *:" + port);
});

app.post("/webhook", (req, res) => {
  const { message, tradingAsset } = req.body;

  io.emit("direction", `${message} ${tradingAsset}`);
  res.json({ message: "ok" });
});
