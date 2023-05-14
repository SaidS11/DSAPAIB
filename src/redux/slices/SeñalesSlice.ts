/* eslint-disable @typescript-eslint/ban-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MongoInsertObjectInterface } from 'renderer/components/Utilities/Constants';

export interface SignalObj {
  length: number;
  x: number;
  y: number;
}
export interface ISeñales {
  signalsXGraph: Array<any>;
  signalsYGraph: Array<any>;
  ventanasArrayEmg1: Array<any>;
  ventanasArrayEmg2: Array<any>;
  ventanasArrayEmg3: Array<any>;
  ventanasArrayEmg4: Array<any>;
  ventanasArrayGiroscopio: Array<any>;
  ventanasArrayAcelerometro: Array<any>;
  ventanasArrayFrecuencia: Array<any>;
  cantidadSensores: number;
  cantidadSujetos: number;
  cantidadSujetosRespaldo: number;
  datosAnalisisIA: Array<any>;
  cleanAllSensors: boolean;
  giroscopioIsChecked: boolean;
  acelerometroIsChecked: boolean;
  frecuenciaIsChecked: boolean;
  extraSensorsChecked: Array<boolean>;
  totalSensores: number;
  signalsToStore: object;
  mongoInsertObject: MongoInsertObjectInterface;
  dataArray: Array<any>;
  gridLayout: any;
}

const initialState: ISeñales = {
  signalsXGraph: [],
  signalsYGraph: [],
  ventanasArrayEmg1: [],
  ventanasArrayEmg2: [],
  ventanasArrayEmg3: [],
  ventanasArrayEmg4: [],
  ventanasArrayGiroscopio: [],
  ventanasArrayAcelerometro: [],
  ventanasArrayFrecuencia: [],
  cantidadSensores: 0,
  cantidadSujetos: 0,
  cantidadSujetosRespaldo: 0,
  datosAnalisisIA: [],
  cleanAllSensors: false,
  giroscopioIsChecked: false,
  acelerometroIsChecked: false,
  frecuenciaIsChecked: false,
  extraSensorsChecked: [],
  totalSensores: 0,
  signalsToStore: {},
  mongoInsertObject: {
    name: '',
    protocol: '',
    signals: {},
    etiqueta: '',
  },
  dataArray: [],
  gridLayout: [],
};

export const SeñalesSlice = createSlice({
  name: 'señales',
  initialState,
  reducers: {
    setSignalsXGraph: (
      state,
      action: PayloadAction<ISeñales['signalsXGraph']>
    ) => {
      state.signalsXGraph = action.payload;
    },
    setSignalsYGraph: (
      state,
      action: PayloadAction<ISeñales['signalsYGraph']>
    ) => {
      state.signalsYGraph = action.payload;
    },
    setVentanasArrayEmg1: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayEmg1']>
    ) => {
      state.ventanasArrayEmg1 = action.payload;
    },
    setVentanasArrayEmg2: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayEmg2']>
    ) => {
      state.ventanasArrayEmg2 = action.payload;
    },
    setVentanasArrayEmg3: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayEmg3']>
    ) => {
      state.ventanasArrayEmg3 = action.payload;
    },
    setVentanasArrayEmg4: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayEmg4']>
    ) => {
      state.ventanasArrayEmg4 = action.payload;
    },
    setVentanasArrayGiroscopio: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayGiroscopio']>
    ) => {
      state.ventanasArrayGiroscopio = action.payload;
    },
    setVentanasArrayAcelerometro: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayAcelerometro']>
    ) => {
      state.ventanasArrayAcelerometro = action.payload;
    },
    setVentanasArrayFrecuencia: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayFrecuencia']>
    ) => {
      state.ventanasArrayFrecuencia = action.payload;
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
    setDatosAnalisisIA: (
      state,
      action: PayloadAction<ISeñales['datosAnalisisIA']>
    ) => {
      const copy = state.datosAnalisisIA;
      const newArray = [...copy, action.payload];
      state.datosAnalisisIA = newArray;
    },
    setCleanDatosAnalisisIA: (
      state,
      action: PayloadAction<ISeñales['datosAnalisisIA']>
    ) => {
      state.datosAnalisisIA = action.payload;
    },
    setCleanAllSensors: (
      state,
      action: PayloadAction<ISeñales['cleanAllSensors']>
    ) => {
      state.cleanAllSensors = action.payload;
      state.ventanasArrayEmg1 = [];
      state.ventanasArrayEmg2 = [];
      state.ventanasArrayGiroscopio = [];
      state.ventanasArrayAcelerometro = [];
      state.ventanasArrayFrecuencia = [];
    },
    setGiroscopioIsChecked: (
      state,
      action: PayloadAction<ISeñales['giroscopioIsChecked']>
    ) => {
      state.giroscopioIsChecked = action.payload;
    },
    setAcelerometroIsChecked: (
      state,
      action: PayloadAction<ISeñales['acelerometroIsChecked']>
    ) => {
      state.acelerometroIsChecked = action.payload;
    },
    setFrecuenciaIsChecked: (
      state,
      action: PayloadAction<ISeñales['frecuenciaIsChecked']>
    ) => {
      state.frecuenciaIsChecked = action.payload;
    },
    setExtraSensorsChecked: (
      state,
      action: PayloadAction<ISeñales['extraSensorsChecked']>
    ) => {
      state.extraSensorsChecked = action.payload;
      console.log("this was payload", action.payload);
    },
    setTotalSensores: (
      state,
      action: PayloadAction<ISeñales['totalSensores']>
    ) => {
      state.totalSensores = action.payload;
    },
    setSignalsToStore: (
      state,
      action: PayloadAction<ISeñales['signalsToStore']>
    ) => {
      state.signalsToStore = action.payload;
    },
    setMongoInsertObject: (
      state,
      action: PayloadAction<ISeñales['mongoInsertObject']>
    ) => {
      state.mongoInsertObject = action.payload;
    },
    setDataArray: (
      state,
      action: PayloadAction<ISeñales['dataArray']>
    ) => {
      state.dataArray = action.payload;
    },
    setGridLayout: (
      state,
      action: PayloadAction<ISeñales['gridLayout']>
    ) => {
      state.gridLayout = action.payload;
    },
  },
});

export const {
  setSignalsXGraph,
  setSignalsYGraph,
  setVentanasArrayEmg1,
  setVentanasArrayEmg2,
  setVentanasArrayEmg3,
  setVentanasArrayEmg4,
  setCantidadSensores,
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
  setVentanasArrayGiroscopio,
  setVentanasArrayAcelerometro,
  setVentanasArrayFrecuencia,
  setDatosAnalisisIA,
  setCleanDatosAnalisisIA,
  setCleanAllSensors,
  setGiroscopioIsChecked,
  setAcelerometroIsChecked,
  setFrecuenciaIsChecked,
  setTotalSensores,
  setExtraSensorsChecked,
  setSignalsToStore,
  setMongoInsertObject,
  setDataArray,
  setGridLayout,
} = SeñalesSlice.actions;
export default SeñalesSlice.reducer;
