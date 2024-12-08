import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShoppingProductTile from "./ProductTileShopping";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const ShoppingHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const [sort, setSort] = useState("price-low-high"); // Set default sort option

  // Handle sorting change

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    navigate(`/shop/product/${getCurrentProductId}`); // Navigate to the product detail page
    // console.log(`Navigating to: /product/${getCurrentProductId}`);
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // Fetch products for the "couples" category on initial load and on sort change
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ category: "", sort, limit: 4 }));
  }, [dispatch, sort]);
  return (
    <div className="bg-[#252525] ">
      <div>
        <img
          src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732261811/Mern-Ecommerce/giphy_3_pbdn51.png"
          alt=""
        />
      </div>
      <div className="flex gap-4 justify-center items-center mx-auto mt-5 px-2 md:px-7 xl:px-[40px]">
        <Link
          to="/shop/all-products "
          className="flex-1 xl:w-fit flex justify-end"
        >
          <button className="w-full lg:w-[60%] bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] text-white px-4 py-2 md:px-1 rounded-full text-xs md:text-lg xl:py-4 xl:text-2xl">
            ALL PRODUCT
          </button>
        </Link>
        <Link className="flex-1 xl:w-fit flex justify-start">
          <button className="w-full lg:w-[60%] bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] text-white px-4 py-2 md:px-1 rounded-full text-xs md:text-lg xl:py-4 xl:text-2xl">
            SELL A PRODUCT
          </button>
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <p className="text-white text-center p-5 md:w-[75%] lg:w-[60%] lg:text-xl xl:text-2xl">
          Welcome to ALLSEXTOY and THERAPY Your Destination for Intimacy and
          Exploration. Discover a world of high-quality, body-safe adult toys
          designed to elevate your pleasure and empower your desires.{" "}
        </p>
      </div>

      {/* popular products */}
      <div className="flex justify-center items-center flex-col mt-4">
        <h1 className="text-white text-center p-5 md:w-[75%] lg:w-[60%] lg:text-2xl xl:text-3xl">
          Popular Products
        </h1>

        <div>
          <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 px-4">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <ShoppingProductTile
                    key={index}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </div>

      {/* Second to the last section of the page */}
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col p-6 justify-center items-center text-center text-white md:w-[60%]">
          <h2 className="lg:text-2xl">
            World Class Pleasure: Adult Sex Toy Store
          </h2>
          <p className="lg:text-xl">
            Shop adult toys and discover world leading couples and solo pleasure
            products. We’re working hard to spread the joy of body-safe and
            eco-friendly [Company name] pleasure products around the globe. Our
            sex toy store offers a selection of sex toy, and All products found
            at our shop are designed to work in sync with the human body for
            deep intimacy and connection.
          </p>
        </div>
        <div className="mt-3">
          <img
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732620669/Mern-Ecommerce/close-up-sex-toys_1_aoofhz.png"
            alt=""
          />
        </div>
      </section>

      {/* last section */}
      <section className="mt-4 py-5">
        <div className="flex flex-wrap  justify-center items-center gap-3 text-white">
          <div className="bg-black w-[220px] h-[220px] p-3 flex flex-col justify-center items-center text-center rounded-xl">
            <img
              className="w-9 h-10"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732623090/Mern-Ecommerce/Vector_ozan37.png"
              alt=""
            />
            <h2>Premium Quanlity</h2>
            <p>
              All Products include authentic manufacturer’s warranty, so you can
              be assured of their quality.
            </p>
          </div>
          <div className="bg-black w-[220px] h-[220px] p-3 flex flex-col justify-center items-center text-center rounded-xl">
            <img
              className="w-9 h-10"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732623090/Mern-Ecommerce/Vector2_opygjf.png"
              alt=""
            />
            <h2>Private and Secure</h2>
            <p>
              [Company name] uses a secure connection to protect your
              privacy.Purchase as a guest or create an account.
            </p>
          </div>
          <div className="bg-black w-[220px] h-[220px] p-3 flex flex-col justify-center items-center text-center rounded-xl">
            <img
              className="w-9 h-10"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732623090/Mern-Ecommerce/Group_i3cdcq.png"
              alt=""
            />
            <h2>Body Safe</h2>
            <p>
              All Products are made from body-safe materials-free from
              phthalates and BPA and made without latex
            </p>
          </div>
          <div className="bg-black w-[220px] h-[220px] p-3 flex flex-col justify-center items-center text-center rounded-xl">
            <img
              className="w-9 h-10"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732623090/Mern-Ecommerce/Vector3_ghomdu.png"
              alt=""
            />
            <h2>Discreet Delivery</h2>
            <p>
              Packaged in plain boxes with a discreet label, orders are shipped
              and billed by our highly trusted dispatch riders
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
