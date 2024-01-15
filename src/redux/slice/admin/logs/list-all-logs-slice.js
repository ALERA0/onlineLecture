import {  listAllLogs } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const listAllLogsSlice = createSlice({
  name: "list-all-logs",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetAllLogs: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listAllLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAllLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(listAllLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAllLogs } = listAllLogsSlice.actions;

export default listAllLogsSlice.reducer;
