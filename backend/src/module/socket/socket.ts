import jwt from "jsonwebtoken";
import { Server } from "socket.io";
// import { JWT_KEY } from "../utils/jwt";
import http from "http";
import { JWT_KEY } from "../../utils/jwt";
import { env } from "../../utils/load-env";

type HttpServer = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

export const onlineUsers = new Map<number, string>();

export const connectSocket = (server: HttpServer) => {
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
            next();
        } catch {
            next(new Error("Unauthorized"));
        }
    });

    io.on("connection", (socket) => {

        const user = socket.data.user;
        onlineUsers.set(user.id, socket.id);
        
        setTimeout(() => { // send status after some time
            io.emit(env.VITE_SOCKET_STATUS_EVENT_NAME, [...onlineUsers.keys()]);
        }, 500);
        
        socket.on(env.VITE_SOCKET_MESSAGE_EVENT_NAME, async (data) => {
            const {receiverId, } = data            
            const receiverSocket = onlineUsers.get(receiverId);
            if (receiverSocket) {
                io.to(receiverSocket)
                .emit(
                    env.VITE_SOCKET_MESSAGE_EVENT_NAME, 
                    data
                );
            }
        });

        socket.on("disconnect", () => {
            onlineUsers.delete(user.id);
            io.emit(env.VITE_SOCKET_STATUS_EVENT_NAME, [...onlineUsers.keys()]);
        });

    })
}