import { getSchoolByOwnerId } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getSchoolByOwnerIdlice = createSlice({
  name: "getSchoolByOwnerId",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetSchoolByOwnerId: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolByOwnerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchoolByOwnerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.getSchoolByOwner;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getSchoolByOwnerId.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetSchoolByOwnerId } = getSchoolByOwnerIdlice.actions;

export default getSchoolByOwnerIdlice.reducer;
