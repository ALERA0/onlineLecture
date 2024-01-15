import {  searchStudents } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const searchStudentsSlice = createSlice({
  name: "searchStudents",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetSearchStudents: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.students;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(searchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetSearchStudents } = searchStudentsSlice.actions;

export default searchStudentsSlice.reducer;
