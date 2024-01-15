import { updateTeacher } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateTeacherSlice = createSlice({
  name: "updateTeacher",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetUpdateTeacher: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUpdateTeacher } = updateTeacherSlice.actions;

export default updateTeacherSlice.reducer;
