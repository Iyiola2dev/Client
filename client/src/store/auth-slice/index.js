import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./api";
// import * as jwt_decode from "jwt-decode";


// Initial state
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  intendedRoute: "/",
};

// // Helper function to check token expiration
// const isTokenExpired = (token) => {
//   if (!token) return true;
//   const { exp } = jwt_decode(token);
//   return Date.now() >= exp * 1000; // Convert expiration to milliseconds
// };

// // Interceptor to automatically log out if token is expired
// axios.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem("token");
//     if (isTokenExpired(token)) {
//       await store.dispatch(logoutUser());
//       return Promise.reject("Token expired, logging out.");
//     } else {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Register user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during registration"
      );
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token); // Store token on login
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during login"
      );
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token"); // Clear token on logout
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during logout"
      );
    }
  }
);

// Check if user is authenticated
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Expires: 0,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Unauthorized");
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setIntendedRoute: (state, action) => {
      state.intendedRoute = action.payload;
    },
    clearIntendedRoute: (state) => {
      state.intendedRoute = "/";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Logout user cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, setIntendedRoute, clearIntendedRoute } =
  authSlice.actions;

export default authSlice.reducer;
