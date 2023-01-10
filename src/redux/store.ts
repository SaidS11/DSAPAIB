/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from './slices/LoginSlice';
import PacienteSlice from './slices/PacienteSlice';
import StatusSlice from './slices/StatusSlice';

export const store = configureStore({
  reducer: {
    login: LoginSlice,
    datos: PacienteSlice,
    status: StatusSlice,
  },
});

export type CustomDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
