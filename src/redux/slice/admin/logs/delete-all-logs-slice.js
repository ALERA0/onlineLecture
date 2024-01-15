import { deleteAllLogs } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const deleteAllLogsSlice = createSlice({
  name: "deleteAllLogs",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetDeleteAllLogs: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(deleteAllLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetDeleteAllLogs } = deleteAllLogsSlice.actions;

export default deleteAllLogsSlice.reducer;
