import {  assignTeacherToClasses } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const assignTeacherToClassesSlice = createSlice({
  name: "assignTeacherToClasses",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetAssignTeacherToClasses: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignTeacherToClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignTeacherToClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(assignTeacherToClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAssignTeacherToClasses } = assignTeacherToClassesSlice.actions;

export default assignTeacherToClassesSlice.reducer;
