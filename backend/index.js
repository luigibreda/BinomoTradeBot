import { connectDb } from "./db/index.js";
import { app, httpServer } from "./app.js";

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  connectDb();
  console.log(`Server listening on port ${port}`);
});
