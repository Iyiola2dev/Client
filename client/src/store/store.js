//Firstly i need to install redux toolkit and react-redux
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

// This store will be created on global reducer and it will hold all the application state
// And I will be using redux toolkit to create the store and all the slices which will entail a lot of slices e.g AuthSlice, AdminSlice, ShoppingSlice, etc
// So basically this is my doc for the store and all the slices

const store = configureStore({
  reducer: {
    // This is where i will add all the slices
    auth: authReducer,
  },
});

export default store;
// This is the store that i will be using in the main.jsx file