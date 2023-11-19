import axios from 'axios';
import config from '../config/config.json';

const API = axios.create({ baseURL: config.baseUrl });

export const getAllChats = (email) => API.get(`/chat/getAllChats/${email}`)

export const loginUser = (formData) => API.post('/auth/login', formData);
export const registerUser = (formData) => API.post("/auth/register", formData);