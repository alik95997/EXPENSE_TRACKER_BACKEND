import express from "express";
import { addIncome, getIncome, deleteIncome } from "../controller/incomeController.js";
import { verifyToken } from "../middlewear/authMiddlewear.js";

const router = express.Router();

router.post("/addincome", verifyToken addIncome)
router.get("/getincome", verifyToken, getIncome)
// FIX: Added the URL parameter :id to match the frontend request format
router.delete("/deleteincome/:id", verifyToken, deleteIncome)

export default router
