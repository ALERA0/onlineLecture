import {  getTeachersByClassId } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getTeachersByClassIdSlice = createSlice({
  name: "getTeachersByClassId",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetTeachersByClassId: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachersByClassId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeachersByClassId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getTeachersByClassId.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetTeachersByClassId } = getTeachersByClassIdSlice.actions;

export default getTeachersByClassIdSlice.reducer;
