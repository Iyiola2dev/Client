import Product from "../../models/productModel.js";



// This is to get filtered products by category
// export const getFilteredProducts = async (req, res) => {
//   try {
//     const { category } = req.query; // Get category from query params

//     // Filter products by category if provided, otherwise get all products
//     const filter = category ? { category } : {};
//     const products = await Product.find(filter);

//     res.status(200).json({
//       success: true,
//       data: products,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

export const getFilteredProducts = async (req, res) => {
  try {
    const { category, sort } = req.query; // Get category and sort from query params

    // Filter products by category if provided, otherwise get all products
    const filter = category ? { category } : {};

    // Base query to get filtered products
    let query = Product.find(filter);

    // Apply sorting based on the `sort` query parameter using `if` statements
    if (sort === "price-low-high") {
      query = query.sort({ price: 1 }); // Ascending price
    } else if (sort === "price-high-low") {
      query = query.sort({ price: -1 }); // Descending price
    } else if (sort === "title-a-z") {
      query = query.sort({ name: 1 }); // Ascending title (alphabetically)
    } else if (sort === "title-z-a") {
      query = query.sort({ name: -1 }); // Descending title (reverse alphabetical)
    }

    // Execute query
    const products = await query;

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


// This is to get product details by id
export const getProductDetails = async (req, res) => {
  try {
    const {id} = req.params;
    

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}