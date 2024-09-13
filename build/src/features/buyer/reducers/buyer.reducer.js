import { emptyBuyerData } from 'src/shared/utils/static-data';
import { createSlice } from '@reduxjs/toolkit';
const initialValue = emptyBuyerData;
const buyerSlice = createSlice({
    name: 'buyer',
    initialState: initialValue,
    reducers: {
        addBuyer: (state, action) => {
            state = { ...action.payload };
            return state;
        },
        emptyBuyer: () => {
            return emptyBuyerData;
        }
    }
});
export const { addBuyer, emptyBuyer } = buyerSlice.actions;
export default buyerSlice.reducer;
