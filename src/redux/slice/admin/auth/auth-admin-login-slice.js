import { authAdminLogin } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const authAdminLoginSlice = createSlice({
  name: "auth-admin-login",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetAuth: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAdminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAdminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(authAdminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAuth } = authAdminLoginSlice.actions;

export default authAdminLoginSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
