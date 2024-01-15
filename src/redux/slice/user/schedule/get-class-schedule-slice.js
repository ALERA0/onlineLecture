import { getClassSchedule } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getClassScheduleSlice = createSlice({
  name: "getClassSchedule",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetClassSchedule: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getClassSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.errorMessage;
      });
  },
});

export const { resetGetClassSchedule } = getClassScheduleSlice.actions;

export default getClassScheduleSlice.reducer;
