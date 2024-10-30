import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/productModel.js";
export const handleImageUpload = async (req, res) => {
  try {
    //This is to check if there is no file uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    //This is to convert to a based64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    // const url = "data:" + req.file.mimetype + ";base64," + b64;
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      result,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({
      success: false,
      message: "Error occured",
      error: err.message,
    });
  }
};

//add a new product
export const addProduct = async (req, res) => {
  try {
    const { image, name, description, category, price, stock, sales } =
      req.body;
    const newProduct = new Product({
      image,
      name,
      description,
      category,
      price,
      stock,
      sales,
    });

    await newProduct.save(); //This to save the new product to the database
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products from the database
export const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find({}); //This is to fetch all products from the database
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
export const editProduct = async (req, res) => {
  try {
    //I will be editing a product by id
    const { id } = req.params;
    const { image, name, description, category, price, stock, sales } =
      req.body;

      //I used let instead of const because I will be updating the product
   let findProduct = await Product.findById(id); //This is to find the product by id
    if (!findProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    //This is to update the product
    findProduct.name = name || findProduct.name;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;

    //This is to check if the price and sales is empty, if it is empty, it will be set to 0 and if not it change it to the new value
    findProduct.price = price === ''? 0 : price || findProduct.price;
    findProduct.image = image || findProduct.image;
    findProduct.stock = stock || findProduct.stock;
    findProduct.sales = sales === ''? 0 : sales || findProduct.sales;

    await findProduct.save(); //This is to save the updated product
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByAndDelete(id); //This is to find the product by id and delete it

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
