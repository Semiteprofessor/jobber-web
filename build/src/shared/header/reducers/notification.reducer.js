import { createSlice } from '@reduxjs/toolkit';
const initialValue = {
    hasUnreadMessage: false,
    hasUnreadNotification: false
};
const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialValue,
    reducers: {
        updateNotification: (state, action) => {
            state = { ...state, ...action.payload };
            return state;
        }
    }
});
export const { updateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
