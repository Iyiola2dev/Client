import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  therapists: [], // List of all therapists
  therapist: null, // Single therapist details
  loading: false,
  error: null,
};

// Async thunk to get all therapists
export const getAllTherapists = createAsyncThunk(
  "/therapists/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/therapists", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : "An error occurred"
      );
    }
  }
);

// Async thunk to get a single therapist by ID
export const getTherapistById = createAsyncThunk(
  "/therapists/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/therapists/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : "An error occurred"
      );
    }
  }
);

const therapistsSlice = createSlice({
  name: "therapists",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTherapists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTherapists.fulfilled, (state, action) => {
        state.loading = false;
        state.therapists = action.payload.therapists || []; // Access nested therapists array
      })
      .addCase(getAllTherapists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTherapistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTherapistById.fulfilled, (state, action) => {
        state.loading = false;
        state.therapist = action.payload.therapist; // Store the single therapist details
      })
      .addCase(getTherapistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default therapistsSlice.reducer;
