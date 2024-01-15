import { adminLogout } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const authAdminLogoutSlice = createSlice({
  name: "auth-admin-logout",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetAuthAdminLogout: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAuthAdminLogout } = authAdminLogoutSlice.actions;

export default authAdminLogoutSlice.reducer;
