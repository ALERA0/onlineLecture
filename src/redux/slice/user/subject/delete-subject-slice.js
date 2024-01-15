import { deleteSubject } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const deleteSubjectSlice = createSlice({
  name: "deleteSubject",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetDeleteSubject: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetDeleteSubject } = deleteSubjectSlice.actions;

export default deleteSubjectSlice.reducer;
