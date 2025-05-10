import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, Reducer } from '@reduxjs/toolkit';
import authReducer from '../../src/features/auth/reducers/auth.reducer';
import buyerReducer from '../../src/features/buyer/reducers/buyer.reducer';
import sellerReducer from '../../src/features/sellers/reducers/seller.reducer';
import categoryReducer from '../../src/shared/header/reducers/category.reducer';
import headerReducer from '../../src/shared/header/reducers/header.reducer';
import notificationReducer from '../../src/shared/header/reducers/notification.reducer';

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

export const rootReducers: Reducer<ReturnType<typeof combineReducer>> = (state, action) => {
  if (action.type === 'logout/logout') {
    state = {} as ReturnType<typeof combineReducer>;
  }
  return combineReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
