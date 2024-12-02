
import jwt from "jsonwebtoken";
import Therapist from "../models/therapistModel.js";

/**
 * Middleware to authenticate and authorize admin users using JWT.
 */
export const authenticateAdmin = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by ID and ensure they exist
    const adminUser = await Therapist.findById(decoded.id).select("-password");

    if (!adminUser) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Check if the user has an admin role
    if (adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only" });
    }

    // Attach admin user data to the request object for downstream use
    req.admin = adminUser;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authorization error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error. Authorization failed." });
  }
};
