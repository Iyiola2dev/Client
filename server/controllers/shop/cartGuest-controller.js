import Cart from "../../models/cartModel.js";
import Product from "../../models/productModel.js";
import { v4 as uuidv4 } from "uuid"; // For generating unique guest IDs




export const addToCarts = async (req, res) => {
  try {
    const { userId, productId, quantity, guestId } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or quantity!",
      });
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    let cart;

    // If the user is logged in, use their userId
    if (userId) {
      cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
    } else if (guestId) {
      // If the user is a guest, use their guestId
      cart = await Cart.findOne({ guestId });
      if (!cart) {
        cart = new Cart({ guestId, items: [] });
      }
    } else {
      // If no userId or guestId, create a new guestId
      const newGuestId = uuidv4(); // Generate a new unique guestId
      cart = new Cart({ guestId: newGuestId, items: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      // If the product is not in the cart, add it
      cart.items.push({ productId, quantity });
    } else {
      // If the product exists, update the quantity
      cart.items[productIndex].quantity += quantity;
    }

    // Save the cart
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
      guestId: cart.guestId, // Return the guestId if the user is not logged in
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// fetch data
export const fetchCartsItems = async (req, res) => {
    try {
      const { userId, guestId } = req.query;
  
      // Validate input
      if (!userId && !guestId) {
        return res.status(400).json({
          success: false,
          message: "User ID or Guest ID is required!",
        });
      }
  
      // Fetch the cart based on userId or guestId
      const cart = await Cart.findOne(userId ? { userId } : { guestId }).populate({
        path: "items.productId",
        select: "name price image",
      });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  


//update product
export const updateCartsItemQty = async (req, res) => {
  try {
    const { userId, guestId, productId, quantity } = req.body;

    if ((!userId && !guestId) || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne(userId ? { userId } : { guestId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart!",
      });
    }

    cart.items[productIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully!",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


//delete
export const deleteCartsItem = async (req, res) => {
  try {
    const { userId, guestId, productId } = req.body;

    if ((!userId && !guestId) || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne(userId ? { userId } : { guestId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Filter out the product to be deleted
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully!",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
