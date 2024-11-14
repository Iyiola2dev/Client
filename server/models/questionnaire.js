
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
  else: {
    type: String,
    required: true,
  },
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);
export default Questionnaire;
