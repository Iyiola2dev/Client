
import mongoose from "mongoose";

const questionnaireSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  brings: {
    type: String,
    required: true,
  },
  emotion: {
    type: String,
    required: true,
  },
  achieve: {
    type: String,
    required: true,
  },
  sought: {
    type: String,
    required: true,
  },
  other: {
    type: String,
    required: true,
  },
  // Add reference to the therapist
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },

  // Add reference to the user making the schedule
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);
export default Questionnaire;
