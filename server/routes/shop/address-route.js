import express from "express"

import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "../../controllers/shop/address-controller.js";


const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userid", fetchAllAddress);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress)

export default router;