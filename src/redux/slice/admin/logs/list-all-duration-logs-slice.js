import {  listAllDurationLogs } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const listAllDurationLogsSlice = createSlice({
  name: "listAllDurationLogs",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetAllDurationLogs: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listAllDurationLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAllDurationLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(listAllDurationLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAllDurationLogs } = listAllDurationLogsSlice.actions;

export default listAllDurationLogsSlice.reducer;
