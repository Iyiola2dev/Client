import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  intendedRoute: "/",
};

// my Async thunk... this setup allows for a structured, reactive way to handle authentication in your application using Redux Toolkit.
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

//This is for the login user
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

//checkAuth
// export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
//   const response = await axios.get(
//     "http://localhost:5000/api/auth/check-auth",
//     {
//       withCredentials: true,
//       headers: {
//         "Cashe-Control":
//           "no-cache, no-store, must-revalidate, proxy-revalidate",
//         Expires: 0,
//       },
//     }
//   );
//   return response.data;
// });

// Frontend: Async thunk to check if the user is authenticated
export const checkAuth = createAsyncThunk("/auth/checkauth", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
      withCredentials: true, // Ensures the token cookie is sent with the request
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
        Expires: 0,
      },
    });
    return response.data; // Should contain user data if authenticated
  } catch (error) {
    console.log(error);
    return rejectWithValue("Unauthorized"); // Handle any errors or unauthorized responses
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setIntendedRoute: (state, action) => {
      state.intendedRoute = action.payload; // Update intendedRoute state with the payload
    },
  },

  // The slice uses extraReducers to handle different states of the registerUser async action (pending, fulfilled, and rejected).
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Start loading
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false; // End loading
        // Updates user with the data returned from the server (in action.payload).
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
        state.isLoading = true; // Start loading
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        // Updates user with the data returned from the server (in action.payload).
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success; //if the user is authenticated it will be true
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true; // Start loading
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;

        // Updates user with the data returned from the server (in action.payload).
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success; //if the user is authenticated it will be true
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, setIntendedRoute } = authSlice.actions;
export default authSlice.reducer;
