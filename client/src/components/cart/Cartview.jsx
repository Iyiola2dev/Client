import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/pages/shopping-view/ProductTileShopping";

const Cartview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [sort, setSort] = useState("price-low-high"); // Set default sort option

  // Handle sorting change
  const handleSort = (value) => {
    setSort(value);
  };

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items
          .reduce(
            (sum, currentItem) =>
              sum +
              (currentItem?.sales > 0
                ? currentItem?.sales
                : currentItem?.price) *
                currentItem?.quantity,
            0
          )
          .toLocaleString()
      : 0;

  const handleNavigate = () => {
    navigate("/shop/all-products");
  };

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    navigate(`/shop/product/${getCurrentProductId}`); // Navigate to the product detail page
    console.log(`Navigating to: /product/${getCurrentProductId}`);
  }

  // Fetch products for the "couples" category on initial load and on sort change
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ category: "", sort, limit: 4 }));
  }, [dispatch, sort]);

  return (
    <div className="p-2 lg:p-7 xl:px-[7rem] bg-[#252525]">
      <div
        onClick={handleNavigate}
        className="flex gap-1 p-3  h-fit items-center  text-[#D72B7E] text-sm lg:text-lg lg:font-semibold"
      >
        <ArrowLeftIcon className="h-4 w-4  lg:h-6 lg:w-6 " />
        <h3>Continue Shopping</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-2 justify-center ">
        <div className="flex-1 flex gap-2   items-center ">
          <CartContent
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </div>
        <div className="flex-1 text-white bg-black py-8 px-2 h-fit">
          <div className="py-2">
            <span>Cart Summary</span>
          </div>

          <div className="border-y flex flex-col gap-2 py-8">
            <div className=" flex justify-between">
              <span>Subtotal</span>
              <span> ₦ {totalCartAmount}</span>
            </div>

            <span>Shipping</span>
            <span>DisCounts</span>
          </div>

          <div className="mt-5 flex justify-between">
            <span>Total </span>
            <span> ₦ {totalCartAmount}</span>
          </div>

          {/*  */}

          <div className="relative">
            <span>
              <input
                className="w-full xl:w-[70%] px-3 py-3 bg-black border mt-6 rounded text-sm "
                placeholder="Enter Coupon Code"
              />
            </span>

            <button className="px-4 py-1 rounded-xl absolute right-3 xl:right-[15rem] top-[1.9rem] bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]">
              Apply
            </button>
          </div>

          {/* checkout button */}
          <div className="mt-4">
            <button className="w-full bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] px-5 py-2 rounded-xl">
              Checkout
            </button>
          </div>
        </div>
      </div>


{/* This is the second section of the page */}
      <div className="mt-10 flex flex-col justify-center items-center text-white">
        <h2>YOU MAY ALSO LIKE</h2>
        <div>
          <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 ">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <ShoppingProductTile
                    key={index}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                ))
              : null}
          </div>
        </div>
      </div>

      {/* second */}
      <div className="mt-10 flex flex-col justify-center items-center text-white">
        <h2>YOU MAY ALSO LIKE</h2>
        <div>
          <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 ">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <ShoppingProductTile
                    key={index}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartview;