import { deleteDirectorByOwnerId } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const deleteDirectorByOwnerIdSlice = createSlice({
  name: "deleteDirectorByOwnerId",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetDeleteDirectorByOwnerId: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteDirectorByOwnerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDirectorByOwnerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(deleteDirectorByOwnerId.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetDeleteDirectorByOwnerId } = deleteDirectorByOwnerIdSlice.actions;

export default deleteDirectorByOwnerIdSlice.reducer;
