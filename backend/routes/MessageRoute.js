import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
const router = express.Router();

router.post('/send/:id',jwtAuth,sendMessage)
router.get('/get/:id',jwtAuth,getMessage)

export default router;
