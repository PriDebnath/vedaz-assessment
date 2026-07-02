import jwt from "jsonwebtoken";
import { Server } from "socket.io";
// import { JWT_KEY } from "../utils/jwt";
 import http from "http";
import { JWT_KEY } from "../../utils/jwt";
import { log } from "console";

type HttpServer = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>


export const onlineUsers = new Map<number, string>();



export const connectSocket = (server: HttpServer)=>{
let io = new Server(server, {
    cors: {
      origin: "*",
    },
  });


io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        const user = jwt.verify(token, JWT_KEY);

        socket.data.user = user;
log({user})
        next();
    } catch {
        next(new Error("Unauthorized"));
    }
});

io.on("connection", (socket) => {

    const user = socket.data.user;

    onlineUsers.set(user.id, socket.id);

    io.emit("online-users", [...onlineUsers.keys()]);

    socket.on("private-message", async ({ receiverId, text }) => {

        const senderId = user.id;

        //-----------------------------------
        // Save into database
        //-----------------------------------

        const message = {
            senderId,
            receiverId,
            text,
        }

        //-----------------------------------
        // Send to receiver
        //-----------------------------------

        const receiverSocket = onlineUsers.get(receiverId);

        if (receiverSocket) {
            io.to(receiverSocket).emit("private-message", message);
        }

        //-----------------------------------
        // Send back to sender
        //-----------------------------------

        socket.emit("private-message", message);

    });

    socket.on("disconnect", () => {

        onlineUsers.delete(user.id);

        io.emit("online-users", [...onlineUsers.keys()]);

    });

})
}