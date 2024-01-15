import { updateDirector } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateDirectorSlice = createSlice({
  name: "updateDirector",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetUpdateDirector: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDirector.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDirector.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(updateDirector.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUpdateDirector } = updateDirectorSlice.actions;

export default updateDirectorSlice.reducer;
