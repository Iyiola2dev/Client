

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
  intendedRoute: null, // Added to store the intended route
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setIntendedRoute: (state, action) => {
      state.intendedRoute = action.payload; // Save the intended route
    },
  },
});

export const { setUser, setLoading, logoutUser, setIntendedRoute } =
  authSlice.actions;
export default authSlice.reducer;
