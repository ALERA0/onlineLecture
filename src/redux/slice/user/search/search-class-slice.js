import { searchClass } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const searchClassSlice = createSlice({
  name: "searchClass",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetSearchClass: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.directors;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(searchClass.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetSearchClass } = searchClassSlice.actions;

export default searchClassSlice.reducer;
