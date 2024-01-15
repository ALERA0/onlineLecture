import { createClassSchedule } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const createClassScheduleSlice = createSlice({
  name: "createClassSchedule",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetCreateClassSchedule: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClassSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClassSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(createClassSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetCreateClassSchedule } = createClassScheduleSlice.actions;

export default createClassScheduleSlice.reducer;
