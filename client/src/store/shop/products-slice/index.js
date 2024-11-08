//My shopping slice

import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

//This is to fetch all products
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (formData) => {
    const result = await axios.get(
      "http://localhost:5000/api/shop/products/get",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;

        state.productList = [];
      });
  },
});

export default shoppingProductSlice.reducer;