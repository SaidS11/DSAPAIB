/* eslint-disable @typescript-eslint/ban-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface SignalObj {
  x: number;
  y: number;
}
export interface ISeñales {
  ventanasArray: Array<SignalObj>;
  ventanasArray2: Array<SignalObj>;
  cantidadSensores: number;
}

const initialState: ISeñales = {
  ventanasArray: [],
  ventanasArray2: [],
  cantidadSensores: 0,
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
    setCantidadSensores: (
      state,
      action: PayloadAction<ISeñales['cantidadSensores']>
    ) => {
      state.cantidadSensores = action.payload;
    },
  },
});

export const { setVentanasArray, setVentanasArray2, setCantidadSensores } =
  SeñalesSlice.actions;
export default SeñalesSlice.reducer;
