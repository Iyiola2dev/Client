import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {

    image: { type: String },
    // image: { type: [String], required: true }, //This allow me to store mutiple images

    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    types: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number },
    sales: { type: Number },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
