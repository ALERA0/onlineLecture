import { getAdminUserById } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getAdminUserByIdSlice = createSlice({
  name: "get-admin-user-by-id",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetAdminUserById: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.Profile;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getAdminUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetAdminUserById } = getAdminUserByIdSlice.actions;

export default getAdminUserByIdSlice.reducer;

