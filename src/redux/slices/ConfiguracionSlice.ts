/* eslint-disable @typescript-eslint/ban-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface IStatus {
  configName: string;
  configDetalle: Object;
  configMultimedia: Object;
  configPrimerPaso: Object;
  configCompleta: Object;
  protocoloDetalle: Object;
  protocoloNombre: string;
  analisisParams: Object;
}

const initialState: IStatus = {
  configName: '',
  configDetalle: {},
  configMultimedia: {},
  configPrimerPaso: {},
  configCompleta: {},
  protocoloDetalle: {},
  protocoloNombre: '',
  analisisParams: {},
};

export const ConfiguracionSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigName: (state, action: PayloadAction<IStatus['configName']>) => {
      state.configName = action.payload;
    },
    setConfigDetalle: (
      state,
      action: PayloadAction<IStatus['configDetalle']>
    ) => {
      state.configDetalle = action.payload;
    },
    setConfigMultimedia: (
      state,
      action: PayloadAction<IStatus['configMultimedia']>
    ) => {
      state.configMultimedia = action.payload;
    },
    setConfigPrimerPaso: (
      state,
      action: PayloadAction<IStatus['configPrimerPaso']>
    ) => {
      state.configPrimerPaso = action.payload;
    },
    setConfigCompleta: (
      state,
      action: PayloadAction<IStatus['configCompleta']>
    ) => {
      state.configCompleta = action.payload;
    },
    setProtocoloDetalle: (
      state,
      action: PayloadAction<IStatus['protocoloDetalle']>
    ) => {
      state.protocoloDetalle = action.payload;
    },
    setProtocoloNombre: (
      state,
      action: PayloadAction<IStatus['protocoloNombre']>
    ) => {
      state.protocoloNombre = action.payload;
    },
    setAnalisisParams: (
      state,
      action: PayloadAction<IStatus['analisisParams']>
    ) => {
      state.analisisParams = action.payload;
    },
  },
});

export const {
  setConfigName,
  setConfigDetalle,
  setConfigMultimedia,
  setConfigPrimerPaso,
  setConfigCompleta,
  setProtocoloDetalle,
  setProtocoloNombre,
  setAnalisisParams,
} = ConfiguracionSlice.actions;
export const selectConfigName = (state: RootState) => state.config.configName;
export const selectConfigDetalle = (state: RootState) =>
  state.config.configDetalle;
export const selectConfigMultimedia = (state: RootState) =>
  state.config.configMultimedia;
export const selectConfigPrimerPaso = (state: RootState) =>
  state.config.configPrimerPaso;
export const selectConfigCompleta = (state: RootState) =>
  state.config.configCompleta;
export const selectProtocoloDetalle = (state: RootState) =>
  state.config.protocoloDetalle;
export const selectProtocoloNombre = (state: RootState) =>
  state.config.protocoloNombre;
export const selectAnalisisParams = (state: RootState) =>
  state.config.analisisParams;
export default ConfiguracionSlice.reducer;
