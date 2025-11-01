import express from "express";
import { addExpense,getExpense,deleteExpense } from "../controller/expenseController.js";
import {verifyToken} from "../middlewear/authMiddlewear.js"

const router = express.Router();

router.post("/addexpense", verifyToken, addExpense);
router.get("/getexpense", verifyToken, getExpense);
router.delete("/deleteexpense/:id", verifyToken, deleteExpense);

export default router;
