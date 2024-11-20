import React, { useEffect, useState } from "react";
import ShoppingProductTile from "@/pages/shopping-view/ProductTileShopping";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
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

const ForMen = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  ///lecivovopfofodidjfjfhhsjfkfksk

  const [sort, setSort] = useState("price-low-high"); // Set default sort option

  // Handle sorting change
  const handleSort = (value) => {
    setSort(value);
  };

  function handleGetProductDetails (getCurrentProductId){
    console.log(getCurrentProductId);
    }


  // Fetch products for the "men" category on initial load and on sort change
  useEffect(() => {
    console.log("Dispatching fetch with:", { category: "men", sort });
    dispatch(fetchAllFilteredProducts({ category: "men", sort }));
  }, [dispatch, sort]);

  return (
    <div className="bg-black h-auto flex flex-col justify-center w-full">
      <div className="p-7">
        <img
          src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1730560301/Mern-Ecommerce/Frame_1000004438_c0smkf.png"
          alt="For Men"
        />
      </div>

      {/* Sort and Product Count */}
      <div className="flex justify-between text-white items-center px-7">
        {/* Sort Dropdown */}
        <div className="flex justify-start text-white py-7 gap-2">
          <h3>Sort By</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-end gap-1 w-[6rem] bg-black text-white border">
                <RiArrowDropDownLine className="text-lg" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px]">
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

        {/* Product Count */}
        <div>{productList.length} Products</div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 px-7">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <ShoppingProductTile key={index} product={productItem} handleGetProductDetails={handleGetProductDetails} />
            ))
          : null}
      </div>
    </div>
  );
};

export default ForMen;
