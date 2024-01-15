import { addStudentToClass } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const addStudentToClassSlice = createSlice({
  name: "addStudentToClass",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetAddStudentToClass: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStudentToClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudentToClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(addStudentToClass.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAddStudentToClass } = addStudentToClassSlice.actions;

export default addStudentToClassSlice.reducer;
