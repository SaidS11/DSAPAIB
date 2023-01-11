import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface IStatus {
  isLogged: boolean;
  loggedUser: string;
}

const initialState: IStatus = {
  isLogged: false,
  loggedUser: '',
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<IStatus['isLogged']>) => {
      state.isLogged = action.payload;
    },
    setLoggedUser: (state, action: PayloadAction<IStatus['loggedUser']>) => {
      state.loggedUser = action.payload;
    },
  },
});

export const { setIsLogged, setLoggedUser } = LoginSlice.actions;
export const selectIsLogged = (state: RootState) => state.login.isLogged;
export const selectLoggedUser = (state: RootState) => state.login.loggedUser;
export default LoginSlice.reducer;
