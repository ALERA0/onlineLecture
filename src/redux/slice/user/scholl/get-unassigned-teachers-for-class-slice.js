import { getUnassignedTeachersForClass } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getUnassignedTeachersForClassSlice = createSlice({
  name: "getUnassignedTeachersForClass",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetUnassignedTeachersForClass: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnassignedTeachersForClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnassignedTeachersForClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getUnassignedTeachersForClass.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetUnassignedTeachersForClass } = getUnassignedTeachersForClassSlice.actions;

export default getUnassignedTeachersForClassSlice.reducer;
