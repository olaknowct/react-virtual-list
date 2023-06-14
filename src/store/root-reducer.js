import { combineReducers } from '@reduxjs/toolkit';
import { listReducer } from './list/list.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
  list: listReducer,
  user: userReducer,
});
