import express from "express";
import { addIncome, getIncome ,deleteIncome} from "../controller/incomeController.js";

const router = express.Router();

router.post("/addincome", addIncome)
router.get("/getincome", getIncome)
// FIX: Added the URL parameter :id to match the frontend request format
router.delete("/deleteincome/:id", deleteIncome) 

export default router
