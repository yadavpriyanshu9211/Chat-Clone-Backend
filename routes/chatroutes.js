import {Router} from "express";
import { createChat, getChatByPhone, myChat } from "../controllers/chat.controller.js";

const router = Router();

router.post("/create",createChat);
router.get("/mychat",myChat);
router.get('/:otherUserPhone', getChatByPhone);

export default router;