import {  getTeacherBySchoolId } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getTeacherBySchoolIdSlice = createSlice({
  name: "getTeacherBySchoolId",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetTeacherBySchoolId: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherBySchoolId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeacherBySchoolId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getTeacherBySchoolId.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetTeacherBySchoolId } = getTeacherBySchoolIdSlice.actions;

export default getTeacherBySchoolIdSlice.reducer;
