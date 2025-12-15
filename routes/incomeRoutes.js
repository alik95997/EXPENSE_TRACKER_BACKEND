import express from "express";
import { addIncome, getIncome, deleteIncome } from "../controller/incomeController.js";
import { protect } from "../middlewear/authMiddlewear.js";

const router = express.Router();

router.post("/addincome", protect ,addIncome)
router.get("/getincome", protect, getIncome)
// FIX: Added the URL parameter :id to match the frontend request format
router.delete("/deleteincome/:id", protect, deleteIncome)

export default router
