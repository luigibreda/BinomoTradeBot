import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";
import registryRoutes from "./routes/registryRoutes.js";
import { Entry } from "./models/Entry.js";
import { delay } from "./utils/delay.js";

dotenv.config();

let operatorOnline;
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

app.use("/api/auth", authRoutes);
app.use("/api/entry", entryRoutes);
app.use("/api/registry", registryRoutes);

io.on("connection", (socket) => {
  socket.emit("online-users", io.engine.clientsCount - 1);

  socket.emit("operator-online", {
    online: operatorOnline,
  });

  socket.on("disconnect", () => {
    io.emit("online-users", io.engine.clientsCount - 1);
  });
});

app.post("/webhook", async (req, res) => {
  const { emit, data } = req.body;
  const timeInit = new Date().getTime();

  if (!emit || !data)
    return res.status(403).json({ message: "Invalid request" });

  if (emit.startsWith("direction")) {
    await Entry.create({
      direction: data.direction,
      type: emit.split("-")[1],
      tradingAsset: data.tradingAsset,
      time: data.time,
    });
  }

  await delay(700);

  const timeEnd = new Date().getTime();
  console.log("console-webhook: ", {
    data,
    timeInit,
    timeEnd,
    delay: timeEnd - timeInit,
  });
  io.emit(emit, data);
  res.json({ message: "ok", delay: timeEnd - timeInit });
});

app.post("/operator-online", (req, res) => {
  const { online } = req.body;
  operatorOnline = online;
  io.emit("operator-online", { online });
  res.json({ message: "ok" });
});

app.get("/api/currenttime", async (req, res) => {
  const hour = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  const timestamp = new Date().getTime();
  res.json({ hour, timestamp });
});

httpServer.listen(port, () => {
  connectDb();
  console.log("listening on *:" + port);
});
