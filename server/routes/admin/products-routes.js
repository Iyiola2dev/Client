import express from "express";

import { upload } from "../../helpers/cloudinary.js";
import { addProduct, deleteProduct, editProduct, fetchAllProduct, handleImageUpload,  } from "../../controllers/admin/products-controller.js";

 const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", fetchAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;