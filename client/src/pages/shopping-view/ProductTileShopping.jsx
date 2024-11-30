import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

const ShoppingProductTile = ({ product, handleGetProductDetails }) => {
 
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto h-auto bg-[#333333] text-white">
  
        <div onClick={() => handleGetProductDetails(product?.id || product?._id)}>
          
          <div className="relative">
            <img
              src={product?.image}
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-t lg"
            />

            {product?.sale > 0 ? (
              <Badge className="absolute top- left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            ) : null}
          </div>
          <CardContent className="p-4 flex flex-col justify-center items-center  ">
            <h2 className="text-[10px] text-center font-bold mb-2">{product?.name}</h2>
            <div className="flex justify-between items-center ">
              <span className="text-sm ">{product?.category}</span>
            </div>
            <div>
            <span className="text-sm ">{product?.types}</span>
            </div>
            <div className="flex flex-col justify-center items-center mb-2">
              <span
                // {/* Show original price with line-through if sale price is available */}

                className={`${
                  product?.sales > 0 ? "line-through" : ""
                } text-lg font-semibold  `}
              >
                ₦{product?.price.toLocaleString()}
              </span>

              {/* Show sale price only if product.sale is available and greater than 0 */}
              {product?.sales > 0 ? (
                <span className="text-lg font-bold">₦{product?.sales}</span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            {/* <Button className="w-full rounded-full border-2 border-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)]"> Add to Cart</Button> */}
            <button className="p-[2px] w-full rounded-full bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]">
              <span className="block w-full p-3 rounded-full bg-[#333333] hover:bg-transparent">
                Add to Cart
              </span>
            </button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ShoppingProductTile;
