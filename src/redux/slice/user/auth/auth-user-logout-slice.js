import { authUserLogout } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const authUserLogoutSlice = createSlice({
  name: "authUserLogout",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetAuthUserLogout: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authUserLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUserLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(authUserLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAuthUserLogin } = authUserLogoutSlice.actions;

export default authUserLogoutSlice.reducer;
