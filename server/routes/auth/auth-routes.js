import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  registerTherapist,
  loginTherapist,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../../controllers/auth/auth-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Therapist routes
router.post("/therapist/register", registerTherapist);
router.post("/therapist/login", loginTherapist);

// Forgot password route
router.post("/forgot-password", forgotPassword);

// OTP verification route
router.post("/verify-otp", verifyOtp);


// Reset password route
router.post("/reset-password", resetPassword);



// Check authentication route
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    user,
  });
});

export default router;
