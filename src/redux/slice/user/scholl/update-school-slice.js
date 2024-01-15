import { addStudentToClass, updateSchool } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateSchoolSlice = createSlice({
  name: "updateSchool",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetUpdateSchool: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSchool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUpdateSchool } = updateSchoolSlice.actions;

export default updateSchoolSlice.reducer;
