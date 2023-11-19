import express from 'express';
import { userLogin, userRegister } from '../controller/AuthController.js';

const app = express.Router();

app.post("/login", userLogin);

app.post("/register", userRegister);

export default app;