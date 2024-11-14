
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  loading: false,
  success: false,
  error: null,
};

// Async thunk to post the questionnaire data
export const postQuestionnaire = createAsyncThunk(
  "questionnaire/post",
  async (questionnaireData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/question",
        questionnaireData
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

// Slice
const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    resetQuestionnaireState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postQuestionnaire.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(postQuestionnaire.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(postQuestionnaire.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuestionnaireState } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
