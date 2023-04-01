/* eslint-disable @typescript-eslint/ban-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignalObj {
  length: number;
  x: number;
  y: number;
}
export interface ISeñales {
  ventanasArray: Array<any>;
  ventanasArray2: Array<any>;
  ventanasArrayGsr: Array<any>;
  ventanasArrayTemp: Array<any>;
  cantidadSensores: number;
  cantidadSujetos: number;
  cantidadSujetosRespaldo: number;
}

const initialState: ISeñales = {
  ventanasArray: [],
  ventanasArray2: [],
  ventanasArrayGsr: [],
  ventanasArrayTemp: [],
  cantidadSensores: 0,
  cantidadSujetos: 0,
  cantidadSujetosRespaldo: 0,
};

export const SeñalesSlice = createSlice({
  name: 'señales',
  initialState,
  reducers: {
    setVentanasArray: (
      state,
      action: PayloadAction<ISeñales['ventanasArray']>
    ) => {
      state.ventanasArray = action.payload;
    },
    setVentanasArray2: (
      state,
      action: PayloadAction<ISeñales['ventanasArray2']>
    ) => {
      state.ventanasArray2 = action.payload;
    },
    setVentanasArrayGsr: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayGsr']>
    ) => {
      state.ventanasArrayGsr = action.payload;
    },
    setVentanasArrayTemp: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayTemp']>
    ) => {
      state.ventanasArrayTemp = action.payload;
    },
    setCantidadSensores: (
      state,
      action: PayloadAction<ISeñales['cantidadSensores']>
    ) => {
      state.cantidadSensores = action.payload;
    },
    setCantidadSujetos: (
      state,
      action: PayloadAction<ISeñales['cantidadSujetos']>
    ) => {
      state.cantidadSujetos = action.payload;
    },
    setCantidadSujetosRespaldo: (
      state,
      action: PayloadAction<ISeñales['cantidadSujetosRespaldo']>
    ) => {
      state.cantidadSujetosRespaldo = action.payload;
    },
  },
});

export const {
  setVentanasArray,
  setVentanasArray2,
  setCantidadSensores,
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
  setVentanasArrayGsr,
  setVentanasArrayTemp,
} = SeñalesSlice.actions;
export default SeñalesSlice.reducer;
