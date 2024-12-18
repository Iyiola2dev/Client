import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/userModel.js";
import nodemailer from "nodemailer";
import Otp from "../../models/otpModel.js";


// Load environment variables
dotenv.config();

// Temporary storage for OTPs
const otpStore = {};


//The register function is used to create a new user in the database. It uses the User model to create a new user and save it to the database. The password is hashed using bcrypt before saving it to the database. The function returns a success message if the user is created successfully.

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user using the User model
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "Registration successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({
      email,
    });

    // Check if the user exists
    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, checkUser.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    // Create a token
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    // Send the token in a HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Logout controller the saved user token is cleared from the cookie i.e the user is logged out from the application
export const logoutUser = async (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
};

// Register a Therapist
export const registerTherapist = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // Check if a therapist already exists with this email
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Therapist already exists!",
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new therapist using the User model with the role "therapist"
    const newTherapist = await User.create({
      userName,
      email,
      password: hashedPassword,
      role: "therapist",
    });

    await newTherapist.save();

    res
      .status(201)
      .json({ success: true, message: "Therapist registration successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Therapist Login
export const loginTherapist = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the therapist exists
    const checkTherapist = await User.findOne({ email, role: "therapist" });

    if (!checkTherapist) {
      return res
        .status(400)
        .json({ success: false, message: "Therapist not found" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(
      password,
      checkTherapist.password
    );
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    // Create a token
    const token = jwt.sign(
      {
        id: checkTherapist._id,
        role: checkTherapist.role,
        email: checkTherapist.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    console.log("Generated Token:", token); // Log the generated token

    // Send the token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Therapist login successful",
      token,
      user: {
        id: checkTherapist._id,
        email: checkTherapist.email,
        role: checkTherapist.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message); // Log the error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Please provide an email address" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    otpStore[email] = { otp, expiresAt };

    if (process.env.NODE_ENV !== "production") {
      console.log("Generated OTP (for dev):", otp); // Log only in development
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div>
          <h1>Password Reset OTP</h1>
          <p>Your OTP for resetting your password is: <strong>${otp}</strong>.</p>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email address!",
      ...(process.env.NODE_ENV !== "production" && { otp }), // Respond with OTP only in development
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required" });
  }

  try {
    const otpEntry = otpStore[email];

    if (!otpEntry) {
      // Log for debugging the OTP store
      console.log("OTP store does not contain an entry for this email:", email);
      return res
        .status(400)
        .json({ success: false, message: "OTP not found!" });
    }

    console.log("OTP entry:", otpEntry); // Log OTP entry
    console.log("OTP received:", otp); // Log OTP received from user

    // Check if the OTP is correct and if it's expired
    if (otpEntry.otp.toString() !== otp || Date.now() > otpEntry.expiresAt) {
      console.log("OTP is either invalid or expired!");
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP!" });
    }

    
    res.status(200).json({ success: true, message: "OTP verified!" });
  } catch (error) {
    console.error("Error verifying OTP:", error); // Log any errors
    res.status(500).json({ success: false, message: error.message });
  }
};



// Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    console.log("otpStore:", otpStore);  // Log otpStore to check its contents

    const otpEntry = otpStore[email];
    if (!otpEntry) {
      return res.status(400).json({ success: false, message: "OTP not found for this email." });
    }

    if (otpEntry.otp.toString() !== otp || Date.now() > otpEntry.expiresAt) {
      console.log("OTP is either invalid or expired!");
      return res.status(400).json({ success: false, message: "Invalid or expired OTP!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    delete otpStore[email];  // Remove OTP after successful reset

    res.status(200).json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error("Error during password reset:", error);  // Log error details for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};
