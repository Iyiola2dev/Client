import mongoose from "mongoose";

// Schedule schema definition
const scheduleSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },

  // Add reference to the therapist
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },

  // Add reference to the user making the schedule
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
