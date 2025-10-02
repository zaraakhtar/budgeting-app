import express from 'express';
import { sql } from '../config/db.js';
import { deleteTransaction, getTransactionsByUserId, createTransaction, getSummaryByUserId } from '../controllers/transactionsController.js';

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummaryByUserId);

export default router;