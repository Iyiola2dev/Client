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

  // The shopProducts is coming from my redux store
  
  const { productList } = useSelector((state) => state.shopProducts);

  const [sort, setSort] = useState("price-low-high"); // Default sort value
  const [category, setCategory] = useState(""); // Optional: Set initial category if needed

  // Handle sort option changes and fetch sorted products
  const handleSort = (value) => {
    setSort(value);
    dispatch(fetchAllFilteredProducts({ category, sort: value })); // Fetch products with the new sort
  };

  // Fetch products on initial load with default sort and category
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ category, sort }));
  }, [dispatch, category, sort]);

  return (
    <div className="bg-black h-auto flex flex-col justify-center w-full">
      <div className="p-7 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-white">All Products</h1>
      </div>
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
              <ShoppingProductTile key={index} product={productItem} />
            ))
          : null}
      </div>
    </div>
  );
};

export default AllProducts;
