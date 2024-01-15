import {  getClassesBySchoolId } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getClassesBySchoolIdSlice = createSlice({
  name: "getClassesBySchoolId",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetClassesBySchoolId: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassesBySchoolId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassesBySchoolId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getClassesBySchoolId.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },

});

export const { resetGetClassesBySchoolId } = getClassesBySchoolIdSlice.actions;

export default getClassesBySchoolIdSlice.reducer;
