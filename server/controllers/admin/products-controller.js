import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/productModel.js";

// Image Upload
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

// export const handleImageUpload = async (req, res) => {
//   try {
//     // Check if there are no files uploaded
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No files uploaded",
//       });
//     }

//     // Iterate over the array of files and upload each one
//     const uploadPromises = req.files.map(async (file) => {
//       const b64 = Buffer.from(file.buffer).toString("base64");
//       const url = `data:${file.mimetype};base64,${b64}`;
//       return await imageUploadUtil(url);
//     });

//     // Wait for all uploads to complete
//     const results = await Promise.all(uploadPromises);

//     res.status(200).json({
//       success: true,
//       message: "Images uploaded successfully",
//       results,
//     });
//   } catch (err) {
//     console.error("Upload Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Error occurred",
//       error: err.message,
//     });
//   }
// };

// Add a New Product

export const addProduct = async (req, res) => {
  try {
    const { image, name, description, category, types, price, stock, sales } =
      req.body;
    const newProduct = new Product({
      image,
      name,
      description,
      category,
      types,
      price,
      stock,
      sales,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    console.log("Add Product Error:", err);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding product",
    });
  }
};

// Fetch All Products with Optional Category Filter
export const fetchAllProduct = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const listOfProducts = await Product.find(filter);

    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (err) {
    console.log("Fetch Products Error:", err);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
    });
  }
};

// Edit Product by ID
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, description, category, price, stock, types, sales } =
      req.body;

    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.image = image || product.image;
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.types = types || product.types;
    product.price = price === "" ? 0 : price || product.price;
    product.stock = stock || product.stock;
    product.sales = sales === "" ? 0 : sales || product.sales;

    await product.save();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.log("Edit Product Error:", err);
    res.status(500).json({
      success: false,
      message: "Error occurred while editing product",
    });
  }
};

// Delete Product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log("Delete Product Error:", err);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting product",
    });
  }
};
