import {  updateStudent } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateStudentSlice = createSlice({
  name: "updateStudent",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetUpdateStudent: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUpdateStudent } = updateStudentSlice.actions;

export default updateStudentSlice.reducer;
