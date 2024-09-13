import { createSlice } from '@reduxjs/toolkit';
import { emptySellerData } from 'src/shared/utils/static-data';
const initialValue = emptySellerData;
const sellerSlice = createSlice({
    name: 'seller',
    initialState: initialValue,
    reducers: {
        addSeller: (state, action) => {
            if (!action.payload) {
                return state;
            }
            state = { ...action.payload };
            return state;
        },
        emptySeller: () => {
            return emptySellerData;
        }
    }
});
export const { addSeller, emptySeller } = sellerSlice.actions;
export default sellerSlice.reducer;
