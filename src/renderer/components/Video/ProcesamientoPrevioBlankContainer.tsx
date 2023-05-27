/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import {
  setMongoInsertObject,
  setSignalsToStore,
  setTotalSensores,
} from '../../../redux/slices/SeñalesSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import ProcesamientoPrevioBlank from './ProcesamientoPrevioBlank';

function parseSignalsIntoObjects(xAr: Array<number>, yAr: Array<number>) {
  const parsedArr = xAr.map((xValue, index) => {
    return { x: xValue, y: yAr[index] };
  });
  return parsedArr;
}

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
  const paciente = useCustomSelector((state) => state.datos.datosPaciente);
  const protocoloNombre = useCustomSelector(
    (state) => state.config.protocoloNombre
  );

  const storedSignals = useCustomSelector((state) => state.señales.realTimeSignal);

  const yEmg1Str = storedSignals.emg1;
  const xEmg1Str: any = [...Array(yEmg1Str.length).keys()];
  console.log("XEMG", xEmg1Str);
  console.log("YEMG", yEmg1Str);
  // Y se puede obtener de manera local con el largo de cada señal, no hay necesidad de almacenarla
  const xEmg1 = xEmg1Str.map((str: string) => parseInt(str, 10));
  const yEmg1 = yEmg1Str.map((str: string) => parseInt(str, 10));

  const procesamientoDeDatos = () => {
    const signals = {};
    if (sensoresSelected >= 1) {
      Object.assign(signals, {
        emg1: parseSignalsIntoObjects(xEmg1, yEmg1),
      });
      // signals.push({"emg1": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if (sensoresSelected >= 2) {
      Object.assign(signals, {
        emg2: parseSignalsIntoObjects(xEmg1, yEmg1),
      });
      // signals.push({"emg2": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if (sensoresSelected >= 3) {
      Object.assign(signals, {
        emg3: parseSignalsIntoObjects(xEmg1, yEmg1),
      });
      // signals.push({"emg3": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if (sensoresSelected >= 4) {
      Object.assign(signals, {
        emg4: parseSignalsIntoObjects(xEmg1, yEmg1),
      });
      // signals.push({"emg4": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if (giroscopioChecked) {
      Object.assign(signals, {
        giroscopio: parseSignalsIntoObjects(xEmg1, yEmg1),
      });
      // signals.push({"giroscopio": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if (acelerometroChecked) {
      Object.assign(signals, {
        acelerometro: parseSignalsIntoObjects(xEmg1, yEmg1),
      });
      // signals.push({"acelerometro": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if (frecuenciaChecked) {
      Object.assign(signals, {
        frecuencia: parseSignalsIntoObjects(xEmg1, yEmg1),
      });
      // signals.push({"frecuencia": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }
    const dataMongo = {
      name: `${paciente[0].col1} ${paciente[0].col2} ${paciente[0].col3}`,
      protocol: protocoloNombre,
    };
    Object.assign(dataMongo, {
      signals: { ...signals },
    });
    console.log('Signal Ready', dataMongo);
    
    appDispatch(setSignalsToStore(signals));
    appDispatch(setMongoInsertObject(dataMongo));
  }


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
    appDispatch(setTotalSensores(cantidadTotal));
    procesamientoDeDatos();
  }, []);
  return <ProcesamientoPrevioBlank />;
};

export default ProcesamientoPrevioBlankContainer;
