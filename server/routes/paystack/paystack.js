import express from 'express';
import { capturePayment, createOrder } from '../../controllers/shop/paystackupdate.js';
// import { initializeTransaction, verifyTransaction } from '../../controllers/shop/paystackController.js';
// import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = express.Router();

// Route to initialize a transaction
// router.post('/initialize', initializeTransaction,authMiddleware);

// // Route to verify a transaction
// router.get('/verify/:reference', verifyTransaction, authMiddleware);

router.post("/create", createOrder); // Initialize payment
router.get("/verify", capturePayment); 

export default router;
