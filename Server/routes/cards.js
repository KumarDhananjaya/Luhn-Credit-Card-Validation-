import express from 'express';
import {  getUserCards, deleteCard } from "../controllers/cards.js";
import  {verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:userId/cards", verifyToken, getUserCards);
router.delete("/:cardId", verifyToken, deleteCard)

export default router;