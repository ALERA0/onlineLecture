import {  createSchoolClass, createSchoolStaff } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const createSchoolClassSlice = createSlice({
  name: "createSchoolClass",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetCreateSchoolClass: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchoolClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSchoolClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(createSchoolClass.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },

});

export const { resetCreateSchoolClass } = createSchoolClassSlice.actions;

export default createSchoolClassSlice.reducer;
