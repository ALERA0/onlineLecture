import {  getAllSchools } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getAllSchoolsSlice = createSlice({
  name: "getAllSchools",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetAllSchools: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSchools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSchools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getAllSchools.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetAllSchools } = getAllSchoolsSlice.actions;

export default getAllSchoolsSlice.reducer;
