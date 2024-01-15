import { updateUserProfile } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateUserProfileSlice = createSlice({
  name: "updateUserProfile",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetUpdateUserProfile: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUpdateUserProfile } = updateUserProfileSlice.actions;

export default updateUserProfileSlice.reducer;
