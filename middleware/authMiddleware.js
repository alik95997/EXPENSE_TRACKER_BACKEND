import jwt from "jsonwebtoken";
import User from "../schema/User.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded.id).select("-password");
    if (!userData) {
      return res.status(401).json({ message: "User no longer exists" });
    }
    req.user = userData;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
