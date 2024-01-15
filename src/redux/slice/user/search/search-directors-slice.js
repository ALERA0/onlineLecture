import { searchDirectors } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const searchDirectorsSlice = createSlice({
  name: "searchDirectors",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetSearchDirectors: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDirectors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchDirectors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.directors;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(searchDirectors.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetSearchDirectors } = searchDirectorsSlice.actions;

export default searchDirectorsSlice.reducer;
