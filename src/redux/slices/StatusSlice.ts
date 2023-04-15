import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface IStatus {
  isLoading: boolean;
  isUploaded: boolean;
  isUploadedS3: boolean;
  failUpload: boolean;
  failUploadS3: boolean;
  errorDetails: string;
  signalsIteration: number;
}

const initialState: IStatus = {
  isLoading: false,
  isUploaded: false,
  isUploadedS3: false,
  failUpload: false,
  failUploadS3: false,
  errorDetails: '',
  signalsIteration: 0,
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
    setFailUploadS3: (
      state,
      action: PayloadAction<IStatus['failUploadS3']>
    ) => {
      state.failUploadS3 = action.payload;
    },
    setErrorDetails: (
      state,
      action: PayloadAction<IStatus['errorDetails']>
    ) => {
      state.errorDetails = action.payload;
    },
    setSignalsIteration: (
      state,
      action: PayloadAction<IStatus['signalsIteration']>
    ) => {
      state.signalsIteration = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsUploaded,
  setIsUploadedS3,
  setFailUpload,
  setFailUploadS3,
  setErrorDetails,
  setSignalsIteration,
} = StatusSlice.actions;
export const selectIsLoading = (state: RootState) => state.status.isLoading;
export const selectIsUploaded = (state: RootState) => state.status.isUploaded;
export const selectIsUploadedS3 = (state: RootState) =>
  state.status.isUploadedS3;
export const selectFailUpload = (state: RootState) => state.status.failUpload;
export const selectFailUploadS3 = (state: RootState) =>
  state.status.failUploadS3;
export const selectErrorDetails = (state: RootState) =>
  state.status.errorDetails;
export default StatusSlice.reducer;
