import {  searchTeacherClass } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const searchTeacherClassSlice = createSlice({
  name: "searchTeacherClass",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetSearchTeacherClass: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTeacherClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchTeacherClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.teachers;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(searchTeacherClass.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetSearchTeacherClass } = searchTeacherClassSlice.actions;

export default searchTeacherClassSlice.reducer;
