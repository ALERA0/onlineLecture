import { createUserByAdmin } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const createUserByAdminSlice = createSlice({
  name: "createUserByAdmin",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetCreateUserByAdmin: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(createUserByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetCreateUserByAdmin } = createUserByAdminSlice.actions;

export default createUserByAdminSlice.reducer;
