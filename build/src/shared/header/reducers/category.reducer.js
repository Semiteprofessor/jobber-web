import { createSlice } from '@reduxjs/toolkit';
const initialValue = true;
const categoryContainerSlice = createSlice({
    name: 'showCategoryContainer',
    initialState: initialValue,
    reducers: {
        updateCategoryContainer: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});
export const { updateCategoryContainer } = categoryContainerSlice.actions;
export default categoryContainerSlice.reducer;
