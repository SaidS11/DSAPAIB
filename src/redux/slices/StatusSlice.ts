import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface IStatus {
  isLoading: boolean;
  isUploaded: boolean;
  isUploadedS3: boolean;
  failUpload: boolean;
  errorDetails: string;
}

const initialState: IStatus = {
  isLoading: false,
  isUploaded: false,
  isUploadedS3: false,
  failUpload: false,
  errorDetails: '',
};

export const StatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<IStatus['isLoading']>) => {
      state.isLoading = action.payload;
    },
    setIsUploaded: (state, action: PayloadAction<IStatus['isUploaded']>) => {
      state.isUploaded = action.payload;
    },
    setIsUploadedS3: (
      state,
      action: PayloadAction<IStatus['isUploadedS3']>
    ) => {
      state.isUploadedS3 = action.payload;
    },
    setFailUpload: (state, action: PayloadAction<IStatus['failUpload']>) => {
      state.failUpload = action.payload;
    },
    setErrorDetails: (
      state,
      action: PayloadAction<IStatus['errorDetails']>
    ) => {
      state.errorDetails = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsUploaded,
  setIsUploadedS3,
  setFailUpload,
  setErrorDetails,
} = StatusSlice.actions;
export const selectIsLoading = (state: RootState) => state.status.isLoading;
export const selectIsUploaded = (state: RootState) => state.status.isUploaded;
export const selectIsUploadedS3 = (state: RootState) =>
  state.status.isUploadedS3;
export const selectFailUpload = (state: RootState) => state.status.failUpload;
export const selectErrorDetails = (state: RootState) =>
  state.status.errorDetails;
export default StatusSlice.reducer;
