import express from "express";
import {
  addExpense,
  getExpense,
  deleteExpense,
} from "../controller/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addexpense", protect, addExpense);
router.get("/getexpense", protect, getExpense);
router.delete("/deleteexpense/:id", protect, deleteExpense);

export default router;
