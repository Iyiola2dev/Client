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

    //This to check the file size
    if (req.file.size > 10 * 1024 * 1024) {
      return res
        .status(400)
        .send({ status: "error", message: "File size exceeds 10 MB" });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/we"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .send({ status: "error", message: "Unsupported file type" });
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

export const handleImageUploads = async (req, res) => {
  try {
    // Check if there are no files uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const results = [];

    // Handle multiple file uploads
    const uploadPromises = req.files.map(async (file) => {
      try {
        // Validate file size (limit to 10 MB)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File size exceeds 10 MB for ${file.originalname}`);
        }

        // Validate file type
        if (!allowedTypes.includes(file.mimetype)) {
          throw new Error(`Unsupported file type for ${file.originalname}`);
        }

        // Upload the file directly to Cloudinary (no need for base64 encoding)
        const result = await imageUploadUtil(file);
        results.push(result);
      } catch (err) {
        // Handle individual file errors, continue with other files
        results.push({
          file: file.originalname,
          error: err.message,
        });
      }
    });

    // Wait for all file uploads to complete
    await Promise.all(uploadPromises);

    // Send the response with the results
    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      results,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({
      success: false,
      message: "Error occurred",
      error: err.message,
    });
  }
};


// Add a New Product

export const addProduct = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const { image, name, description, category, types, price, stock, sales } =
      req.body;


      // Validate required fields
    if (!image || !name || !description || !category || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }



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
