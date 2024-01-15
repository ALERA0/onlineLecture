import { getSchoolById } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const getSchoolByIdlice = createSlice({
  name: "getSchoolById",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetSchoolById: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchoolById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.getSchoolById;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(getSchoolById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },

});

export const { resetGetSchoolById } = getSchoolByIdlice.actions;

export default getSchoolByIdlice.reducer;
