import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/userModel.js";

//The register function is used to create a new user in the database. It uses the User model to create a new user and save it to the database. The password is hashed using bcrypt before saving it to the database. The function returns a success message if the user is created successfully.

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
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
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
