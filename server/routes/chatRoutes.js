import express from 'express';
import { chat, getAllChats } from '../controller/chatController.js';

const app = express.Router();

app.get("/getAllChats/:id", getAllChats);

export default app;