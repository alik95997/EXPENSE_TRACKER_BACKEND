// Import dotenv at the very top
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { dbConnection } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
// app.use(cors({
//   origin: [
//     'https://expense-tracker-frontend-psi-dusky.vercel.app',
//     'http://localhost:5173',
//     'http://localhost:5000'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
try {
  dbConnection();
  console.log("DB connected");
} catch (err) {
  console.error("DB connection failed", err.message);
}

// Routes
app.get("/", (req, res) => {
  res.send("Hello Ustad");
});

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);

// Fixed: proper template literal syntax
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Vercel deployment
export default app;