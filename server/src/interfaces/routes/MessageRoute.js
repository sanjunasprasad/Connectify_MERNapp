import express from 'express';
const messageRoute = express.Router();
import { addMessage, getMessages } from '../controllers/messageControllers.js';



messageRoute.post('/', addMessage);
messageRoute.get('/:chatId', getMessages);






export default messageRoute