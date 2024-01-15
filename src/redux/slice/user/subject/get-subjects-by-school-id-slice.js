import {   getSubjectsBySchoolId } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getSubjectsBySchoolIdSlice = createSlice({
  name: "getSubjectsBySchoolId",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetSubjectsBySchoolId: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjectsBySchoolId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubjectsBySchoolId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getSubjectsBySchoolId.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetSubjectsBySchoolId } = getSubjectsBySchoolIdSlice.actions;

export default getSubjectsBySchoolIdSlice.reducer;
