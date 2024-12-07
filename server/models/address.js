import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    phoneNumber: String,
    addtionalNumber: String,
    notesInformation: String,
    region: String,
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
