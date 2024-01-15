import { authUserLogin } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const authUserLoginSlice = createSlice({
  name: "authUserLogin",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetAuthUserLogin: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUserLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successResponse.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(authUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAuthUserLogin } = authUserLoginSlice.actions;

export default authUserLoginSlice.reducer;
