import {  getDirectorsBySchoolId, getTeacherBySchoolId } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getDirectorsBySchoolIdSlice = createSlice({
  name: "getDirectorsBySchoolId",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetDirectorsBySchoolId: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDirectorsBySchoolId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDirectorsBySchoolId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getDirectorsBySchoolId.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },

});

export const { resetGetDirectorsBySchoolId } = getDirectorsBySchoolIdSlice.actions;

export default getDirectorsBySchoolIdSlice.reducer;
