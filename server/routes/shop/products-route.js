///This page is for the shopping view

import express from "express";

import { getFilteredProducts } from "../../controllers/shop/products-controller.js";

const router = express.Router()

router.get("/get", getFilteredProducts);

export default router;
