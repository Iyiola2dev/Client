import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ShoppingLayout from "./Layout";
import ShoppingHome from "./Home";
import ShoppingListing from "./Listing";
import ShoppingCheckout from "./Checkout";
import ShoppingAccount from "./Account";
import ShoppingHeader from "./Header";

const Shopping = () => {
  return (
    <div>
       <div><ShoppingHeader/></div>
      <Routes>
       
        <Route path="/" element={<Navigate to="/shop/shopping-Layout" />} />
        <Route path="/shopping-Layout" element={<ShoppingLayout />} />
        <Route path="/home" element={<ShoppingHome/>} />
        <Route path="listing" element={<ShoppingListing/>}/>
        <Route path="checkout" element={<ShoppingCheckout/>}/>
        <Route path="account" element={<ShoppingAccount/>}/>
        <Route/>
        <Route/>
      </Routes>
    </div>
  );
};

export default Shopping;
