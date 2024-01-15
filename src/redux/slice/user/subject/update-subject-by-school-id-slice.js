import { updateSubject } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateSubjectSlice = createSlice({
  name: "updateSubject",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetUpdateSubject: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetUpdateSubject } =
updateSubjectSlice.actions;

export default updateSubjectSlice.reducer;
