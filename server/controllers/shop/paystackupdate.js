import axios from "axios";
import dotenv from "dotenv";
import Order from "../../models/order.js";

dotenv.config();

// Initialize an order and create a Paystack payment
// export const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       totalAmount,
//     } = req.body;

//     if (!cartItems || cartItems.length === 0) {
//       return res
//         .status(400)
//         .json({ status: "error", message: "Cart items are required" });
//     }

//     if (!addressInfo || !addressInfo.email) {
//       return res
//         .status(400)
//         .json({ status: "error", message: "Email is required" });
//     }

//     if (!totalAmount || totalAmount <= 0) {
//       return res
//         .status(400)
//         .json({ status: "error", message: "Total amount is required" });
//     }
//     // Validate required fields
//     // if (!userId || !cartItems || !addressInfo || !totalAmount) {
//     //   return res.status(400).json({
//     //     status: "error",
//     //     message: "Missing required fields",
//     //   });
//     // }

//     // Create order object in your database (optional, for tracking orders)
//     const order = {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus: orderStatus || "pending", // Default status to 'pending'
//       paymentMethod: paymentMethod || "paystack", // Default to Paystack
//       totalAmount,
//       orderDate: new Date(),
//     };

//     // Save order to DB (optional)
//     const savedOrder = await Order.create(order);

//     // Initialize Paystack payment
//     const paystackResponse = await axios.post(
//       "https://api.paystack.co/transaction/initialize",
//       {
//         email: addressInfo.email, // User's email
//         amount: totalAmount * 100, // Amount in kobo (multiply by 100)
//         currency: "NGN",
//         callback_url: "http://localhost:5173/shop/paystack-return", // Replace with your frontend callback URL
//         metadata: {
//           cartItems,
//           addressInfo,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Your secret key
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Send the payment URL back to the frontend
//     return res.status(200).json({
//       status: "success",
//       message: "Payment initialized",
//       paymentUrl: paystackResponse.data.data.authorization_url,
//     });
//   } catch (e) {
//     console.error("Error initializing Paystack payment:", e.message);
//     return res.status(500).json({
//       status: "error",
//       message: "Failed to initialize payment",
//     });
//   }
// };

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
    } = req.body;

    // Validate required fields
    if (!cartItems || cartItems.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Cart items are required" });
    }

    if (!addressInfo || !addressInfo.email) {
      return res
        .status(400)
        .json({ status: "error", message: "Address information with a valid email is required" });
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
      return res.status(500).json({ status: "error", message: "Failed to save order" });
    }

    // Initialize Paystack payment
    try {
      const paystackResponse = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: addressInfo.email,
          amount: totalAmount * 100,
          currency: "NGN",
          callback_url: "http://localhost:5173/shop/paystack-return", // Replace with live URL in production
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
      console.error("Paystack initialization error:", error.response?.data || error.message);
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
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({
        status: "error",
        message: "Payment reference is required",
      });
    }

    // Verify transaction with Paystack
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Your secret key
        },
      }
    );

    const paymentData = verifyResponse.data.data;

    if (paymentData.status === "success") {
      // Update order status in DB to 'completed' or 'paid'
      // Example: await Order.update({ status: "paid" }, { where: { reference } });

      return res.status(200).json({
        status: "success",
        message: "Payment verified successfully",
        data: paymentData,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Payment verification failed",
      });
    }
  } catch (e) {
    console.error("Error verifying Paystack payment:", e.message);
    return res.status(500).json({
      status: "error",
      message: "Failed to verify payment",
    });
  }
};
