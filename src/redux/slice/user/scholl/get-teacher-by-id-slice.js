import {   getTeacherById } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getTeacherByIdSlice = createSlice({
  name: "getTeacherById",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetTeacherById: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeacherById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getTeacherById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },

});

export const { resetGetTeacherById } = getTeacherByIdSlice.actions;

export default getTeacherByIdSlice.reducer;
