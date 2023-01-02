import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
import LoginSlice from './slices/LoginSlice';

export const store = configureStore({
  reducer: {
    login: LoginSlice,
  },
});

export type CustomDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
