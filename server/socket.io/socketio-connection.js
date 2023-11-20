import { Server } from 'socket.io';
import { chat } from '../controller/chatController.js';

export const socketConnection = (server) => {
    
    //Establishing Socket.Io server
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3001",
            methods: ["GET", "POST"]
        }
    });

    //When Socket is Connected with The client
    io.on("connection", (socket) => {
        console.log(socket.id);

        // Recieving a Query from the Client
        socket.on("UserMessage", async (data) => {
            const response = await chat(data);
            //Sending The Bot's Response to the Client
            socket.emit("bot_Response", response);        
        })

    })

}