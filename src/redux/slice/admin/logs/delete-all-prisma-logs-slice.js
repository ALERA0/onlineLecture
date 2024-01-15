import { deleteAllPrismaLogs } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const deleteAllPrismaLogsSlice = createSlice({
  name: "deleteAllPrismaLogs",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetDeleteAllPrismaLogs: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllPrismaLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllPrismaLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(deleteAllPrismaLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetDeleteAllPrismaLogs } = deleteAllPrismaLogsSlice.actions;

export default deleteAllPrismaLogsSlice.reducer;
