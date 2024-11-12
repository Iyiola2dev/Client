import Product from "../../models/productModel.js";

//This is to get all the products
// export const getFilteredProducts = async (req, res) => {
//   try {
//     //   const { category } = req.body;
//     const products = await Product.find({});
//     res.status(200).json({
//       success: true,
//       data: products,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };


// This is to get filtered products by category
export const getFilteredProducts = async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params

    // Filter products by category if provided, otherwise get all products
    const filter = category ? { category } : {};
    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
