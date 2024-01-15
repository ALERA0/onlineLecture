import { createSlice } from "@reduxjs/toolkit";

export const setUserDataSlice = createSlice({
    name: "setUserData",
    initialState: { id: null, role: null },
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        setUserRole: (state, action) => {
            state.role = action.payload;
        },
    },

});

export const { setUserId, setUserRole } = setUserDataSlice.actions;

export default setUserDataSlice.reducer;
