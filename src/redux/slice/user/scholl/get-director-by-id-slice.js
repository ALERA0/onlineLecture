import {  getDirectorById } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getDirectorByIdSlice = createSlice({
  name: "getDirectorById",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetDirectorById: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDirectorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDirectorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getDirectorById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetDirectorById } = getDirectorByIdSlice.actions;

export default getDirectorByIdSlice.reducer;
