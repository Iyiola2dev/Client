import Address from "@/components/shopping/address/Address";
import AddressAccount from "@/components/shopping/address/Address-account";

import { ArrowLeftIcon } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { createNewOrder } from "@/store/shop/order";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { paymentUrl } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const dispatch = useDispatch();

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

  // const handlePaystackPayment = async () => {
  //   try {
  //     // Validate cart items and total amount
  //     if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
  //       toast({
  //         title: "Your cart is empty.",
  //       });
  //       return;
  //     }

  //     if (totalCartAmount <= 0) {
  //       toast({
  //         title: "Invalid total amount.",
  //       });

  //       return;
  //     }

  //     // Prepare data for the backend
  //     const orderData = {
  //       cartItems: cartItems.items,
  //       addressInfo: {
  //         email: "user@example.com", // Replace with dynamic user email
  //       },
  //       totalAmount: parseInt(totalCartAmount.replace(/,/g, ""), 10), // Convert to number
  //     };

  //     // Make the API call to initialize payment
  //     const { data } = await axios.post(
  //       "http://localhost:5000/api/paystack/initialize", // Backend endpoint
  //       orderData
  //     );

  //     // Redirect user to Paystack payment page if successful
  //     if (data.status === "success") {
  //       window.location.href = data.paymentUrl;
  //     } else {
  //       alert("Failed to initialize payment: " + data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error initializing payment:", error);
  //     alert("An error occurred while initializing payment. Please try again.");
  //   }
  // };

  const handlePaystackPayment = async () => {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.id,
        name: singleCartItem.name,
        image: singleCartItem.image,
        price:
          singleCartItem?.sales > 0
            ? singleCartItem?.sales
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        fullName: currentSelectedAddress?.fullName,
        email: currentSelectedAddress?.email,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        phoneNumber: currentSelectedAddress?.phoneNumber,
        additionalNumber: currentSelectedAddress?.additionalNumber,
        notesInformation: currentSelectedAddress?.notesInformation,
        region: currentSelectedAddress?.region,
      },

      orderStatus: "pending",
      paymentMethod: "paystack",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log("orderData", orderData);
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "datalexicon");
      if (data?.payload?.success) {
        setIsPaymentLoading(true);
        // toast({
        //   title: "Order created successfully",
        // });
        // navigate("/shop/all-products");
      } else {
        setIsPaymentLoading(false);
        // toast({
        //   title: "Failed to create order",
        // });
      }
    });
  };
 
  return (
    <div className="p-2 lg:p-7 xl:px-[7rem] bg-[#252525]">
      <div
        onClick={handleNavigate}
        className="flex gap-1 p-3 h-fit items-center text-[#D72B7E] text-sm lg:text-lg lg:font-semibold"
      >
        <ArrowLeftIcon className="h-4 w-4 lg:h-6 lg:w-6" />
        <h3>Continue Shopping</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          {/* <AddressAccount /> */}
          <Address
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            currentSelectedAddress={currentSelectedAddress}
          />
        </div>
        <div className="flex-1">
          <div className="flex-1 text-white bg-black py-8 px-2 lg:px-6 h-fit">
            <div className="py-2">
              <span>Cart Summary</span>
            </div>
            <div className="border-y flex flex-col gap-2 py-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span> ₦ {totalCartAmount}</span>
              </div>
              <span>Shipping</span>
              <span>Discounts</span>
            </div>
            <div className="mt-5 flex justify-between">
              <span>Total </span>
              <span> ₦ {totalCartAmount}</span>
            </div>
            <div className="relative">
              <span>
                <input
                  className="w-full xl:w-[70%] px-3 py-3 bg-black border mt-6 rounded text-sm"
                  placeholder="Enter Coupon Code"
                />
              </span>
              <button className="px-4 py-1 rounded-xl absolute right-3 xl:right-[14rem] top-[1.9rem] bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]">
                Apply
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={handlePaystackPayment}
                disabled={isPaymentLoading}
                className="w-full bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] px-5 py-2 rounded-xl"
              >
                {isPaymentLoading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
