import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//This is my redux file for adding products, deleting products, editing products and fetching all products
const initialState = {
  productList: [],
  isLoading: false,
  error: null,
};

//This to add a new product
export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
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

//This is to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (formData) => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get",
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

//This is to edit a product
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async (formData) => {
    const result = await axios.put(
      "http://localhost:5000/api/admin/products/edit/:id",
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

//This is to delete a product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (formData) => {
    const result = await axios.delete(
      "http://localhost:5000/api/admin/products/delete/:id",
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

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
