import { createSlice } from "@reduxjs/toolkit";
import { initialAuthUserValues } from "../../../shared/utils/static-data";
const initialValue = initialAuthUserValues;
const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        addAuthUser: (state, action) => {
            const { authInfo } = action.payload;
            state = { ...authInfo };
            return state;
        },
        clearAuthUser: () => {
            return initialAuthUserValues;
        },
    },
});
export const { addAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
