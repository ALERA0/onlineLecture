import { getAllUsers } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetUsers: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data?.data?.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUsers } = getAllUsersSlice.actions;

export default getAllUsersSlice.reducer;
