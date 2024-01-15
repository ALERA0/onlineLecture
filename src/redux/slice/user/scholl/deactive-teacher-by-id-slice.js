import { deactiveTeacherById } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const deactiveTeacherByIdSlice = createSlice({
  name: "deactiveTeacherById",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetDeactiveTeacherById: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(deactiveTeacherById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deactiveTeacherById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(deactiveTeacherById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetDeactiveTeacherById } = deactiveTeacherByIdSlice.actions;

export default deactiveTeacherByIdSlice.reducer;
