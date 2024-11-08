import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/userModel.js";

dotenv.config();

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
      { id: checkUser._id, role: checkUser.role, email: checkUser.email },
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
