import { createSchool } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const createSchoolSlice = createSlice({
  name: "createSchool",
  initialState: { data: null, status: {}, message: {}, isLoading: null },
  reducers: {
    resetCreateSchool: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSchool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(createSchool.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },

});

export const { resetCreateSchool } = createSchoolSlice.actions;

export default createSchoolSlice.reducer;
