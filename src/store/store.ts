import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "../../src/features/auth/reducers/auth.reducer"
import buyerReducer from '../../src/features/buyer/reducers/buyer.reducer';

import { api } from './api';
import logoutReducer from 'src/features/auth/reducers/logout.reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['clientApi', '_persist']
};

export const combineReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    authUser: authReducer,
    logout: logoutReducer,
    buyer: buyerReducer,
})