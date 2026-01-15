import express from "express";
import {
  signup,
  login,
  profile,
  logout,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, profile);
router.post("/logout", protect, logout);
export default router;
