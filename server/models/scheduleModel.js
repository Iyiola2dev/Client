
import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
