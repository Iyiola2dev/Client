import { Button } from "@/components/ui/button";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1)

  const { productDetails } = useSelector((state) => state.shopProducts);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);


  const increaseQuantity = ()=>{
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = ()=>{
    if(quantity > 1){
      setQuantity(quantity - 1)
    }
  }


  return (
    <main className="list-item-text-3 bg-[#252525] text-white">
      <div>
        <div className="flex gap-1 p-3 ">
          <ArrowLeftIcon className="h-6 w-6 text-[#D72B7E]" />
        </div>
        <div className="flex  py-6 px-2 gap-3">
          <div className="flex flex-col w-fit gap-3">
            {/* Basically these spans are just placeholder */}
            <span className="h-[3.5rem] w-[3.5rem] bg-white"></span>
            <span className="h-[3.5rem] w-[3.5rem] bg-white"></span>
            <span className="h-[3.5rem] w-[3.5rem] bg-white"></span>
            <span className="h-[3.5rem] w-[3.5rem] bg-white"></span>
          </div>

          <div>
            <img
              className="h-[260px] w-[326px] "
              src={productDetails?.image}
              alt=""
            />
          </div>
        </div>

        {/* The div with the details page */}
        <div className="space-y-2 p-3">
          <div className="text-white">{productDetails?.name}</div>
          <div className="flex gap-1 text-white">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          {/* Stock availabilty */}
          <div>
            <span>
              <h4>
                Availabilty: {productDetails?.stock} products are currently
                available
              </h4>
            </span>
          </div>
          {/* Quantity */}
          
            <div className="flex items-center gap-4">
      {/* Quantity Controls */}
      <div className="flex items-center border border-gray-500 rounded-md px-2 py-2">
        <button
          onClick={decreaseQuantity}
          className="px-3 py-1 text-white bg-black hover:bg-gray-700 rounded-l-md"
        >
          -
        </button>
        <span className="px-4 py-1 text-white">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="px-3 py-1 text-white bg-black hover:bg-gray-700 rounded-r-md"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button className="px-6 py-2 bg-black text-white border border-pink-500 rounded-md hover:bg-pink-500 hover:text-black">
        Add to cart
      </button>
    </div>

          {/* buy now */}
          <div>
          <button className="p-2  rounded bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]">Buy Now</button>
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
