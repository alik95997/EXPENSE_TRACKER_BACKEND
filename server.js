import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { dbConnection } from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  dbConnection();
  console.log("✅ Database connected successfully");
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
}

app.get("/", (req, res) => {
  res.send("Hello Ustad 👋");
});

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at: http://localhost:${PORT}`);
  });
}

export default app;
