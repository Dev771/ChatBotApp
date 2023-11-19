import express from "express";
import connection from './config/connection.js';
import cors from 'cors';
import { createServer } from "http";
import { socketConnection } from "./socket.io/socketio-connection.js";

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const server = createServer(app);

//Socket.IO connection and Communication Settings
socketConnection(server);



const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Done!!!");
})

server.listen(PORT, () => {
    console.log("Application started At PORT : " + PORT);
})