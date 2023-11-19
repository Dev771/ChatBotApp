import { Server } from 'socket.io';
import { chat } from '../controller/chatController.js';

export const socketConnection = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3001",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(socket.id);

        socket.on("UserMessage", async (data) => {
            const response = await chat(data);
            socket.emit("bot_Response", response);        
        })

    })

}