import Product from "../../models/productModel.js";

//This is to get all the products
export const getFilteredProducts = async (req, res) => {
  try {
    //   const { category } = req.body;
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
