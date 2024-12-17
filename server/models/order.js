import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productId: String,
      name: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    fullName: String,
    email: String,
    address: String,
    city: String,
    phoneNumber: String,
    additionalNumber: String,
    notesInformation: String,
    region: String,
   
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
