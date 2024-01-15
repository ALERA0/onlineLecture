import { getStudentById } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getStudentByIdSlice = createSlice({
  name: "getStudentById",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetStudentById: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetStudentById } = getStudentByIdSlice.actions;

export default getStudentByIdSlice.reducer;
