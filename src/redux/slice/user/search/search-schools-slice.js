import { searchSchools } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

export const searchSchoolsSlice = createSlice({
  name: "searchSchools",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetSearchSchools: (state) => {
      state.status = undefined;
      state.message = {};
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSchools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchSchools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.data.data.schools;
        state.status = action.payload.data.successCode;
        state.message = action.payload.data.successMessage;
      })
      .addCase(searchSchools.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.errorCode;
        state.message = action.payload?.message;
      });
  },
});

export const { resetSearchSchools } = searchSchoolsSlice.actions;

export default searchSchoolsSlice.reducer;
