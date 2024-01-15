import { createSupportTicket } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const createSupportTicketSlice = createSlice({
  name: "createSupportTicket",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetCreateSupportTicket: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSupportTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSupportTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(createSupportTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetCreateSupportTicket } = createSupportTicketSlice.actions;

export default createSupportTicketSlice.reducer;
