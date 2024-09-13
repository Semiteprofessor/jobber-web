import { createSlice } from '@reduxjs/toolkit';
const initialValue = 'index';
const headerSlice = createSlice({
    name: 'header',
    initialState: initialValue,
    reducers: {
        updateHeader: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});
export const { updateHeader } = headerSlice.actions;
export default headerSlice.reducer;
