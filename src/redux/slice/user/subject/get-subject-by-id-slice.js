import { createSlice } from '@reduxjs/toolkit';
import { getSubjectById } from "@/api";

export const getSubjectByIdSlice = createSlice({
  name: "getSubjectById",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetSubjectById: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getSubjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetGetSubjectById } = getSubjectByIdSlice.actions;

export default getSubjectByIdSlice.reducer;
