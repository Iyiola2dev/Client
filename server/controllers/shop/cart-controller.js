import Cart from "../../models/cartModel.js";
import Product from "../../models/productModel.js";

// Add a product to the user's cart
export const addToCart = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { userId, productId, quantity } = req.body;

    // Validate the input data
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Inform user about missing or invalid data
      });
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found", // Inform user if the product doesn't exist
      });
    }

    // Find if the user already has a cart in the database
    let cart = await Cart.findOne({ userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, items: [] }],
      });

      // Save the newly created cart
      await cart.save();
    }

    // Check if the product is already present in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (items) => items.productId.toString() === productId
    );

    // If the product is not in the cart, add it with the specified quantity
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      // If the product is already in the cart, update its quantity
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    // Save the updated cart
    await cart.save();

    // Return the updated cart as the response
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    // Handle any server errors
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Fetch all items in a user's cart
export const fetchCartItems = async (req, res) => {
  try {
    // Get the userId from the request parameters
    const { userId } = req.params;

    // Validate the userId
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is mandatory", // Inform user about missing userId
      });
    }

    // Find the user's cart and populate product details for each item
    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image name price sales", // Only select specific fields for better performance
    });

    // If the cart doesn't exist, return a 404 response
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found", // Inform user if no cart exists
      });
    }

    // Filter out any invalid products (e.g., products that no longer exist)
    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    // If there were invalid products, update the cart with only valid items
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save(); // Save the updated cart to remove invalid items
    }

    // Create a simplified structure for the response with detailed product info
    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      name: item.productId.name,
      price: item.productId.price,
      sales: item.productId.sales,
      quantity: item.quantity,
    }));

    // Send the cart data, including the populated product details, as the response
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems, // Replace items with detailed product information
      },
    });
  } catch (err) {
    // Handle any server errors
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//
export const updateCartItemQty = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { userId, productId, quantity } = req.body;

    // Validate the input data
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Inform user about missing or invalid data
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, items: [] }],
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (items) => items.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present", // Inform user if the product doesn't exist
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "item.productId",
      select: "image name price sales",
    });

    // Create a simplified structure for the response with detailed product info
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      name: item.productId? item.productId.name : "product not found",
      price: item.productId ? item.productId.price : null,
      sales: item.productId ? item.productId.sales : null,
      quantity: item.quantity,
    }));

    // Send the cart data, including the populated product details, as the response
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems, // Replace items with detailed product information
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(404).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image name price sales",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items.filter(item => item.productId._id.toString() !== productId)
     
    await cart.save();


    //This populate is to return the product available in the cart
    await Cart.populate({
      path: "items.productId",
      select: "image name price sales",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      name: item.productId ? item.productId.name : "product not found",
      price: item.productId ? item.productId.price : null,
      sales: item.productId ? item.productId.sales : null,
      quantity: item.quantity,
    }));

    // Send the cart data, including the populated product details, as the response
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems, // Replace items with detailed product information
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
