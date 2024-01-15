import { createSlice } from '@reduxjs/toolkit';
import { getSubjectById, getUnassignedTeachers } from "@/api";

export const getUnassignedTeachersSlice = createSlice({
  name: "getUnassignedTeachers",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetUnassignedTeachers: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnassignedTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnassignedTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getUnassignedTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetUnassignedTeachers } = getUnassignedTeachersSlice.actions;

export default getUnassignedTeachersSlice.reducer;
