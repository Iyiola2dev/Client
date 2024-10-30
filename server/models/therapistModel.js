import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      default: "https://via.placeholder.com/150", // Default image
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    openings: [
      {
        day: {
          type: String,
          required: true,
          match: /^\d{4}-\d{2}-\d{2}$/, // Validates format "YYYY-MM-DD"
        },
        times: {
          type: [String],
          validate: {
            validator: function (times) {
              return times.every((time) =>
                /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i.test(time)
              );
            },
            message: "Time must be in format 'hh:mm AM/PM'",
          },
        },
      },
    ],
    therapyType: {
      type: String,
    },
    clientAge: {
      type: String,
      enum: ["18-28", "28-38", "38-48", "48-58", "59+"], // Predefined options
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"], // Predefined options
    },
    yearsOfPractice: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Non-binary", "Other"],
      required: true,
    },
    ageRange: {
      type: String,
      enum: ["18-28", "28-38", "38-48", "48-58", "59+"], // Options to choose from
    },
    zodiacSign: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500, // Limit description length
    },
    institute: {
      type: String,
      trim: true,
      required: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    languages: {
      type: [String],
      default: [], // Array of languages
    },
    stateOfPractice: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Therapist", "Admin", "User"], // Options for the role
      default: "Therapist",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Therapist = mongoose.model("Therapist", therapistSchema);
export default Therapist;
