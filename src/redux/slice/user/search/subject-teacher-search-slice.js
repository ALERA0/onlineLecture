import {  subjectTeacherSearch } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const subjectTeacherSearchSlice = createSlice({
  name: "subjectTeacherSearch",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetSubjectTeacherSearch: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subjectTeacherSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(subjectTeacherSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.directors;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(subjectTeacherSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetSubjectTeacherSearch } = subjectTeacherSearchSlice.actions;

export default subjectTeacherSearchSlice.reducer;
