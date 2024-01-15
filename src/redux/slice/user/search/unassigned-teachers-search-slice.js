import {  unassignedTeachersSearch } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const unassignedTeachersSearchSlice = createSlice({
  name: "unassignedTeachersSearch",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetUnassignedTeachersSearch: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(unassignedTeachersSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unassignedTeachersSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.directors;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(unassignedTeachersSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUnassignedTeachersSearch } = unassignedTeachersSearchSlice.actions;

export default unassignedTeachersSearchSlice.reducer;
