import {   getTeacherAssignedToSubject } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getTeacherAssignedToSubjectSlice = createSlice({
  name: "getTeacherAssignedToSubject",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetTeacherAssignedToSubject: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherAssignedToSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeacherAssignedToSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getTeacherAssignedToSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetTeacherAssignedToSubject } = getTeacherAssignedToSubjectSlice.actions;

export default getTeacherAssignedToSubjectSlice.reducer;
