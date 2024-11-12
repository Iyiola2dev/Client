import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import Therapist from "../models/therapistModel.js";

/**
 * Middleware to authenticate the therapist using JWT.
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get the token from the authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("No token provided");
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded); // Log the decoded token

    // Attach decoded user info to the request
    req.user = decoded;

    // Find the therapist using the ID in the decoded token
    req.therapist = await Therapist.findById(decoded.id).select("-password");

    if (!req.therapist) {
      console.log("No therapist found with this ID");
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error.message); // Log the error message
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Middleware to authorize admin users only.
 */
export const authorizeAdmin = (req, res, next) => {
  if (req.therapist && req.therapist.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: "Access denied. Admins only" });
  }
};

/**
 * Middleware to validate therapist input data.
 */
export const validateTherapist = [
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  // Add additional validation rules as needed

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
