import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

  // Check for authorization header
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

    try {
      // Splits in array and extract only token part
      token = req.headers.authorization.split(" ")[1]; 

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request excluding password
      req.user = await User.findById(decoded.id).select("-password"); 

      next();

    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// For role-bases access
export const isAdminOrEditor = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "editor") {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};
