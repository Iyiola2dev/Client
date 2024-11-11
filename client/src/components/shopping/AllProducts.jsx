import ShoppingProductTile from "@/pages/shopping-view/ProductTileShopping";

import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { RiArrowDropDownLine } from "react-icons/ri";

import { sortOptions } from "@/config/Index";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);

  const [sort, setSort] = useState(null);

  //This is to handle the sortOptions
  const handleSort = (value) => {
    setSort(value);
  };

  //This select price-low-high on page load
  useEffect(() => {
    setSort("price-low-high");
  }, []);

  //fetch list of product
  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  return (
    <div className="bg-black h-auto mt-4 flex flex-col justify-center  w-full">
      <div className="p-7 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-white">All Products</h1>
      </div>
      <div className="flex justify-between text-white items-center px-7">
        {/* This is the sort */}
        <div className="flex justify-start text-white py-7 gap-2">
          <h3> Sort By</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="flex items-center justify-end gap-1 w-[6rem] bg-black text-white border
          "
              >
                <RiArrowDropDownLine className=" text-lg" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px] ">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* The length of product on the page */}
        <div>{productList.length} Products</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 px-7">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <ShoppingProductTile key={index} product={productItem} />
            ))
          : null}
      </div>
    </div>
  );
};

export default AllProducts;
