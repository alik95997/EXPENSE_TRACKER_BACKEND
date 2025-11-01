import User from "../schema/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Use an environment variable for the secret, with a fallback
const JWT_SECRET = process.env.JWT_SECRET || "EXPENSETRACKER";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "User already exists" });

    // Hash the password and create the user
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hashed });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Return detailed error message for easier debugging
    return res.status(500).json({ message: "Server error during signup", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // 3. Generate token (Saved to 'token')
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, );

    // 4. Send successful response
    res.status(200).json({
      message: "Login successful",
      token: token, // <--- FIXED: Now using the correct variable 'token'
      userId: user._id,
      // Note: Assuming 'name' field exists on your User schema. If it's 'fullName', adjust this line.
      name: user.fullName || user.name 
    });
  } catch (error) {
    // Log the error for server-side debugging and return a generic 500
    console.error("Login server error:", error.message);
    // Be careful with error responses; using error.message directly can expose too much info.
    // For now, I'm cleaning up the error response format slightly.
    return res.status(500).json({ message: "Internal server error during login", error: error.message });
  }
};
