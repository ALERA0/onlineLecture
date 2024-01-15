import {  assignSubjectsToTeacher } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const assignSubjectsToTeacherSlice = createSlice({
  name: "assignSubjectsToTeacher",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetAssignSubjectsToTeacher: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignSubjectsToTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignSubjectsToTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(assignSubjectsToTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAssignSubjectsToTeacher } = assignSubjectsToTeacherSlice.actions;

export default assignSubjectsToTeacherSlice.reducer;
