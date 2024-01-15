import {  searchSubject } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const searchSubjectSlice = createSlice({
  name: "searchSubject",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetSearchSubject: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.directors;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(searchSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetSearchSubject } = searchSubjectSlice.actions;

export default searchSubjectSlice.reducer;
