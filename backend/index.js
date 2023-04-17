import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";
import { Entry } from "./models/Entry.js";

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

  if (!emit || !data)
    return res.status(403).json({ message: "Invalid request" });

  if (emit.startsWith("direction")) {
    const entry = await Entry.create({
      direction: data.direction,
      type: emit.split("-")[1],
      tradingAsset: data.tradingAsset,
      time: data.time,
    });
  }

  io.emit(emit, data);
  res.json({ message: "ok" });
});

app.post("/operator-online", (req, res) => {
  const { online } = req.body;
  operatorOnline = online;
  io.emit("operator-online", { online });
  res.json({ message: "ok" });
});

httpServer.listen(port, () => {
  connectDb();
  console.log("listening on *:" + port);
});
