import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderId: null, // Stores the order details
  paymentUrl: null, // Stores the Paystack payment URL
  isLoading: false,
};

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/create",
      orderData
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducer: (builder) => {
    builder.addCase(createNewOrder.pending,(state)=>{
        state.isLoading = true
    }).addCase(createNewOrder.fulfilled,(state, action)=>{
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        state.paymentUrl = action.payload.paymentUrl;
    }).addCase(createNewOrder.rejected,(state)=>{
        state.isLoading = false
        state.paymentUrl = null
        state.orderId = null
    })
  },
});

export default shoppingOrderSlice.reducer;
