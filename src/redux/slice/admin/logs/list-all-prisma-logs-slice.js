import { listAllPrismaLogs } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const listAllPrismaLogsSlice = createSlice({
  name: "listAllPrismaLogs",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetAllPrismaLogs: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listAllPrismaLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAllPrismaLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(listAllPrismaLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAllPrismaLogs } = listAllPrismaLogsSlice.actions;

export default listAllPrismaLogsSlice.reducer;
