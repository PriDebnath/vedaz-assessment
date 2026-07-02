import http from "http";
import { Server } from "socket.io";

import { env } from "./utils/load-env"; // should be at top
import app from "./app";
import { connectDB } from "./database/connection";

async function startServer() {
  const { PORT } = env;

  await connectDB();

  // Create HTTP server from Express app
  const httpServer = http.createServer(app);

  // Create Socket.IO server
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on(env.VITE_SOCKET_EVENT_NAME, (message) => {
      console.log(message);

      // Send the message to every connected client
      io.emit(env.VITE_SOCKET_EVENT_NAME, message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(PORT || 8000, () => {
    console.log(`🟩 Express + Socket.IO running on port ${PORT}`);
  });
}

startServer();