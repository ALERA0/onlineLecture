import { getClassById } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getClassByIdSlice = createSlice({
  name: "getClassById",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetClassById: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getClassById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetClassById } = getClassByIdSlice.actions;

export default getClassByIdSlice.reducer;
