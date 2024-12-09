import express from "express";

import { upload } from "../../helpers/cloudinary.js";
import { addProduct, deleteProduct, editProduct, fetchAllProduct, handleImageUpload, handleImageUploads } from "../../controllers/admin/products-controller.js";

 const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/upload-images", upload.array("my_file", 10), handleImageUploads); // Allow up to 10 files



  
router.post("/add", addProduct);
router.get("/get", fetchAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;