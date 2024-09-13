import { createSlice } from "@reduxjs/toolkit";
const initialValue = true;
const logoutSlice = createSlice({
    name: "logout",
    initialState: initialValue,
    reducers: {
        updateLogout: (state, action) => {
            state = action.payload;
            return state;
        },
        logout: (state) => {
            return state;
        },
    },
});
export const { updateLogout, logout } = logoutSlice.actions;
export default logoutSlice.reducer;
