import { authAdminRegister } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const authAdminRegisterSlice = createSlice({
  name: "auth-admin-register",
  initialState: {
    data: null,
    status: undefined,
    message: {},
    isLoading: false,
  },
  reducers: {
    resetAuthAdminRegister: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAdminRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAdminRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(authAdminRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAuthAdminRegister } = authAdminRegisterSlice.actions;

export default authAdminRegisterSlice.reducer;
