
import { createSlice } from "@reduxjs/toolkit";
import { getAllTherapists } from "./auth-slice";


const initialState = {
  therapists: [],
  loading: false,
  error: null,
};

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
        state.therapists = action.payload.therapists || []; // Store the nested therapists array
      })
      .addCase(getAllTherapists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default therapistsSlice.reducer;
