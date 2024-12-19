import axios from "axios";
import dotenv from "dotenv";
import Order from "../../models/order.js";
import Cart from "../../models/cartModel.js";

dotenv.config();

// Initialize an order and create a Paystack payment
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Validate required fields
    if (!cartItems || cartItems.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Cart items are required" });
    }

    if (!addressInfo || !addressInfo.email) {
      return res.status(400).json({
        status: "error",
        message: "Address information with a valid email is required",
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Total amount must be greater than zero",
      });
    }

    // Create order object
    const order = {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentMethod: paymentMethod || "paystack",
      paymentStatus: paymentStatus || "pending",
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: paymentId || null,
      payerId: payerId || null,
    };

    // Save order to database
    let savedOrder;
    try {
      savedOrder = await Order.create(order);
    } catch (error) {
      console.error("Error saving order:", error.message);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save order" });
    }

    // Initialize Paystack payment
    try {
      const paystackResponse = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: addressInfo.email,
          amount: totalAmount * 100,
          currency: "NGN",
          callback_url: "http://localhost:5173/shop/paystack-confirmation", // Replace with live URL in production
          metadata: {
            orderId: savedOrder._id,
            cartItems,
            addressInfo,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Return the payment URL to the frontend
      return res.status(200).json({
        status: "success",
        message: "Payment initialized successfully",
        paymentUrl: paystackResponse.data.data.authorization_url,
        orderId: savedOrder._id,
      });
    } catch (error) {
      console.error(
        "Paystack initialization error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        status: "error",
        message: "Failed to initialize payment",
      });
    }
  } catch (e) {
    console.error("Unexpected error:", e.message);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

// Verify payment
export const capturePayment = async (req, res) => {
  try {
    const { reference, orderId } = req.body;

    // Step 1: Verify the transaction with Paystack
    const paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Use your Paystack secret key
        },
      }
    );

    const paymentData = paystackResponse.data;

    if (paymentData.status !== true || paymentData.data.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Step 2: Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Step 3: Update the order
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentData.data.id; // Paystack's transaction ID
    order.payerId = paymentData.data.customer.id; // Paystack customer ID (optional)

    // If you have a cart to delete
    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and order confirmed",
      data: order,
    });
  } catch (e) {
    console.error("Error verifying Paystack payment:", e.message);
    return res.status(500).json({
      status: "error",
      message: "Failed to verify payment",
    });
  }
};

export const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export const getOrdersDetails = async (req, res) => {
  try {
    const {id } = req.params;
   
    const order = await Order.findById(id); 

    if (!order) {
      return res.status(404).json({
        success: false,
        message: " Order not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
