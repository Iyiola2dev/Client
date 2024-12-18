import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "therapist", "admin"], // Add roles as needed
    default: "user",
  },
  resetPasswordOtp: { type: Number },
  resetPasswordExpiry: { type: Date },
});

const User = mongoose.model("User", userSchema);
export default User;
