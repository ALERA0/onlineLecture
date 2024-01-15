import {  deleteStudent } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const deleteStudentSlice = createSlice({
  name: "deleteStudent",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetDeleteStudent: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetDeleteStudent } = deleteStudentSlice.actions;

export default deleteStudentSlice.reducer;
