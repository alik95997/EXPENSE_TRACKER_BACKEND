import User from "../schema/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//check rolled
const JWT_SECRET = process.env.JWT_SECRET || "EXPENSETRACKER";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hashed });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    return res.json({
      message: "Login successful",
      token,
      name: user.fullName,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
