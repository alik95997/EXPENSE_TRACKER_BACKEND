import express from "express";
import {
  addIncome,
  getIncome,
  deleteIncome,
} from "../controller/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addincome", protect, addIncome);
router.get("/getincome", protect, getIncome);
router.delete("/deleteincome/:id", protect, deleteIncome);

export default router;
