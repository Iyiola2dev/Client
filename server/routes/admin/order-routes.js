import express from "express";

import { getAllOrdersByUser, getOrderDetailsForAdmin } from "../../controllers/admin/order-controller.js";


const router = express.Router();

// Route to initialize a transaction
// router.post('/initialize', initializeTransaction,authMiddleware);

// // Route to verify a transaction
// router.get('/verify/:reference', verifyTransaction, authMiddleware);


router.get("/get", getAllOrdersByUser);
router.get("/details/:id", getOrderDetailsForAdmin);


export default router;
