/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import {
  setMongoInsertObject,
  setTotalSensores,
} from '../../../redux/slices/SeñalesSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import ProcesamientoPrevioBlank from './ProcesamientoPrevioBlank';

const ProcesamientoPrevioBlankContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const sensoresSelected = useCustomSelector(
    (state) => state.señales.cantidadSensores
  );
  const giroscopioChecked = useCustomSelector(
    (state) => state.señales.giroscopioIsChecked
  );
  const acelerometroChecked = useCustomSelector(
    (state) => state.señales.acelerometroIsChecked
  );
  const frecuenciaChecked = useCustomSelector(
    (state) => state.señales.frecuenciaIsChecked
  );

  const signals = useCustomSelector((state) => state.señales.signalsToStore);
  const paciente = useCustomSelector((state) => state.datos.datosPaciente);
  const protocoloNombre = useCustomSelector(
    (state) => state.config.protocoloNombre
  );

  console.log('Señal x', signals);

  useEffect(() => {
    let cantidadTotal = sensoresSelected;
    if (giroscopioChecked) {
      cantidadTotal += 1;
    }
    if (acelerometroChecked) {
      cantidadTotal += 1;
    }
    if (frecuenciaChecked) {
      cantidadTotal += 1;
    }

    const dataMongo = {
      name: `${paciente[0].col1} ${paciente[0].col2} ${paciente[0].col3}`,
      protocol: protocoloNombre,
    };
    Object.assign(dataMongo, {
      signals: { ...signals },
    });
    console.log('Signal Ready', dataMongo);

    appDispatch(setMongoInsertObject(dataMongo));

    appDispatch(setTotalSensores(cantidadTotal));
  }, []);
  return <ProcesamientoPrevioBlank />;
};

export default ProcesamientoPrevioBlankContainer;

// const localArrayEmg1 = [];
//     if (sensoresSelected >= 1) {
//       ventanaReduxEmg1.map((e) => localArrayEmg1.push(e));
//       localArrayEmg1.push(ventanasSeñal1Emg1);
//     }

//     const localArrayEmg2 = [];
//     if (sensoresSelected >= 2) {
//       ventanaReduxEmg2.map((e) => localArrayEmg2.push(e));
//       localArrayEmg2.push(ventanasSeñal2Emg2);
//     }

//     const localArrayEmg3 = [];
//     if (sensoresSelected >= 3) {
//       ventanaReduxEmg3.map((e) => localArrayEmg3.push(e));
//       localArrayEmg3.push(ventanasSeñal3Emg3);
//     }

//     const localArrayEmg4 = [];
//     if (sensoresSelected >= 4) {
//       ventanaReduxEmg4.map((e) => localArrayEmg4.push(e));
//       localArrayEmg4.push(ventanasSeñal4Emg4);
//     }

//     const localArrayGiroscopio = [];
//     if (giroscopioChecked) {
//       ventanaReduxGiroscopio.map((e) => localArrayGiroscopio.push(e));
//       localArrayGiroscopio.push(ventanasSeñalGiroscopio);
//     }

//     const localArrayAcelerometro = [];
//     if(acelerometroChecked) {
//       ventanaReduxAcelerometro.map((e) => localArrayAcelerometro.push(e));
//       localArrayAcelerometro.push(ventanasSeñalAcelerometro);
//     }

//     const localArrayFrecuencia = [];
//     if (frecuenciaChecked) {
//       console.log("frecuencia check5");
//       ventanaReduxFrecuencia.map((e) => localArrayFrecuencia.push(e));
//       console.log("frecuencia about to be stored", ventanasSeñalFrecuencia);
//       localArrayFrecuencia.push(ventanasSeñalFrecuencia);
//     }

//     // console.log('Esto tiene el estado', ventanasSeñalGiroscopio);
//     // console.log('Esto voy a guardar', localArrayGiroscopio);

//     appDispatch(setVentanasArrayEmg1(localArrayEmg1));
//     appDispatch(setVentanasArrayEmg2(localArrayEmg2));
//     appDispatch(setVentanasArrayEmg3(localArrayEmg3));
//     appDispatch(setVentanasArrayEmg4(localArrayEmg4));
//     appDispatch(setVentanasArrayGiroscopio(localArrayGiroscopio));
//     appDispatch(setVentanasArrayAcelerometro(localArrayAcelerometro));
//     appDispatch(setVentanasArrayFrecuencia(localArrayFrecuencia));
