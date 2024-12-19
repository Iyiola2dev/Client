import express from "express";
import {
  capturePayment,
  createOrder,
  getAllOrdersByUser,
  getOrdersDetails,
} from "../../controllers/shop/orderPaystackupdate.js";
// import { initializeTransaction, verifyTransaction } from '../../controllers/shop/paystackController.js';
// import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = express.Router();

// Route to initialize a transaction
// router.post('/initialize', initializeTransaction,authMiddleware);

// // Route to verify a transaction
// router.get('/verify/:reference', verifyTransaction, authMiddleware);

router.post("/create", createOrder); // Initialize payment
router.post("/verify", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrdersDetails);

export default router;
