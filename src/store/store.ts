import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../src/features/auth/reducers/auth.reducer';
import buyerReducer from '../../src/features/buyer/reducers/buyer.reducer';
import sellerReducer from '../../src/features/seller/reducers/seller.reducer';
import categoryReducer from '../../src/features/header/reducers/category.reducer';
import headerReducer from '../../src/features/header/reducers/header.reducer';
import notificationReducer from '../../src/features/header/reducers/notification.reducer';

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
  seller: sellerReducer,
  header: headerReducer,
  showCategoryContainer: categoryReducer,
  notification: notificationReducer
});
