import {  updateClass } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateClassSlice = createSlice({
  name: "updateClass",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetUpdateClass: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUpdateClass } = updateClassSlice.actions;

export default updateClassSlice.reducer;
