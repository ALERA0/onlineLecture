import {  createSubject } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const createSubjectSlice = createSlice({
  name: "createSubject",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetCreateSubject: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetCreateSubject } = createSubjectSlice.actions;

export default createSubjectSlice.reducer;
