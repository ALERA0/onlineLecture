import { searchTeachers } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const searchTeachersSlice = createSlice({
  name: "searchTeachers",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetSearchTeachers: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.teachers;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(searchTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetSearchTeachers } = searchTeachersSlice.actions;

export default searchTeachersSlice.reducer;
