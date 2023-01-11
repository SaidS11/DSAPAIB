import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface IStatus {
  isLoading: boolean;
}

const initialState: IStatus = {
  isLoading: false,
};

export const StatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<IStatus['isLoading']>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = StatusSlice.actions;
export const selectIsLoading = (state: RootState) => state.status.isLoading;
export default StatusSlice.reducer;
