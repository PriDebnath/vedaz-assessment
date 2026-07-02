import http from "http";
import { Server } from "socket.io";

import { env } from "./utils/load-env"; // should be at top
import app from "./app";
import { connectDB } from "./database/connection";
import { connectSocket } from "./module/socket/socket";

async function startServer() {
  const { PORT } = env;

  await connectDB();

   const httpServer = http.createServer(app);

connectSocket(httpServer);


  httpServer.listen(PORT || 8000, () => {
    console.log(`🟩 Express + Socket.IO running on port ${PORT}`);
  });
}

startServer();