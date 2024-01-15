import { createSchoolStaff } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const createSchoolStaffSlice = createSlice({
  name: "createSchoolStaff",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetCreateSchoolStaff: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchoolStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSchoolStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(createSchoolStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetCreateSchoolStaff } = createSchoolStaffSlice.actions;

export default createSchoolStaffSlice.reducer;
