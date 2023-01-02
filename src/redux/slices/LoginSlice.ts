import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface IStatus {
  isLogged: boolean;
}

const initialState: IStatus = {
  isLogged: false,
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<IStatus['isLogged']>) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setIsLogged } = LoginSlice.actions;
export const selectIsLogged = (state: RootState) => state.login.isLogged;
export default LoginSlice.reducer;
