import {  getStudentsByClassId } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getStudentsByClassIdSlice = createSlice({
  name: "getStudentsByClassId",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetStudentsByClassId: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentsByClassId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentsByClassId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.classWithStudents;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getStudentsByClassId.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },

});

export const { resetGetStudentsByClassId } = getStudentsByClassIdSlice.actions;

export default getStudentsByClassIdSlice.reducer;
