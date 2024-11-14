// //My shopping slice

// import axios from "axios";

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//   isLoading: false,
//   productList: [],
// };

// //This is to fetch all products
// export const fetchAllFilteredProducts = createAsyncThunk(
//   "/products/fetchAllProducts",
//   async (formData) => {
//     const result = await axios.get(
//       "http://localhost:5000/api/shop/products/get",
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return result?.data;
//   }
// );

// const shoppingProductSlice = createSlice({
//   name: "shoppingProduct",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllFilteredProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         console.log(action.payload);
//         state.productList = action.payload.data;
//       })
//       .addCase(fetchAllFilteredProducts.rejected, (state) => {
//         state.isLoading = false;

//         state.productList = [];
//       });
//   },
// });

// export default shoppingProductSlice.reducer;



import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  error: null, // Add error state to track potential errors
};

// This is to fetch all products or filtered by category
// export const fetchAllFilteredProducts = createAsyncThunk(
//   "/products/fetchAllProducts",
//   async (category = "") => {
//     const result = await axios.get("http://localhost:5000/api/shop/products/get", {
//       params: { category }, // Send the category as a query parameter
//     });
//     return result?.data; // Return the data to be stored in the state
//   }
// );

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ category = "", sort = "" }) => {
    const result = await axios.get("http://localhost:5000/api/shop/products/get", {
      params: { category, sort }, // Send both category and sort as query parameters
    });
    return result?.data; // Return the data to be stored in the state
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
        state.productList = action.payload.data; // Store the fetched products
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message; // Capture any errors
      });
  },
});

export default shoppingProductSlice.reducer;
