/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import PreAnalisis from './PreAnalisis';
import PreAnalisisBlank from './PreAnalisisBlank';

const PreAnalisisContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const paramsArg = useCustomSelector((state) => state.config.analisisParams);
  const datos = useCustomSelector((state) => state.señales.datosAnalisisIA);
  const predictMode = useCustomSelector((state) => state.señales.predictMode);

  const nombresSeleccionados = useCustomSelector(
    (state) => state.config.selectedModels
  );

  console.log('DATOS PREVIOS', datos);
  const strData = JSON.stringify(datos);
  console.log('DATOS STR', strData);
  async function preAn() {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.preAnalisisPython(strData);
  }
  window.electron.ipcRenderer.preAnalisisP((event: unknown, resp: string) => {
    console.log('Esta es', resp);
    // appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    // navigate('/preAnalisis');
  });

  async function startAnalysis(tipo: string, params: string, nombre: string) {
    appDispatch(setIsLoading(true));
    console.log('Getting message');

    if (predictMode) {
      window.electron.ipcRenderer.analisisPython(
        'Class',
        tipo,
        params,
        nombre,
        '0',
        '0',
        strData
      );
    } else {
      const { iteraciones, porcentaje } = paramsArg as any;
      // const reducedPercentage = parseInt(porcentaje) / 100;
      const strPercentage = porcentaje.toString();
      console.log('THis is STR', strPercentage);
      window.electron.ipcRenderer.analisisPython(
        'Train',
        tipo,
        params,
        nombre,
        iteraciones,
        strPercentage,
        strData
      );
    }
  }
  window.electron.ipcRenderer.analisisP((event: any, resp: any) => {
    console.log('Esta es', resp);
    appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    const parsedResp = resp.split('|');
    const checkError = parsedResp[0];
    if (checkError === 'Error') {
      const errorTrace = parsedResp[1];
      alert(`Ha ocurrido un error ${errorTrace}`);
      navigate('/guardarModelo');
      return 0;
    }
    navigate('/resultadoEntrenar');
  });
  async function getParams(params: any) {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.selectImplementacionPorNombre(
      params!.algoritmo
    );
  }
  window.electron.ipcRenderer.selectImplementacionPorN(
    (event: any, resp: any) => {
      console.log('Esta es algo', resp);
      appDispatch(setIsLoading(false));
      console.log('Algo', resp[0].algoritmo_ia);
      // const { iteraciones, porcentaje } = paramsArg as any;
      // const reducedPercentage = parseInt(porcentaje) / 100;
      // const strPercentage = reducedPercentage.toString();
      // console.log('iteraciones y porc', iteraciones, porcentaje);
      // const { nombre } = resp[0];
      const nombre = nombresSeleccionados[0].col1;
      const params = JSON.stringify(resp[0].parametros);
      if (resp[0].algoritmo_ia === 'Arbol de Decisión') {
        startAnalysis('Tree', params, nombre);
      }
      if (resp[0].algoritmo_ia === 'Red Neuronal') {
        startAnalysis('KNN', params, nombre);
      }
      if (resp[0].algoritmo_ia === 'Maquina de Soporte Vectorial') {
        startAnalysis('SVM', params, nombre);
      }
    }
  );
  const onClickNav = () => {
    getParams(paramsArg);
  };
  useEffect(() => {
    getParams(paramsArg);
  }, []);
  return <PreAnalisisBlank />;
  // return (
  //   <div>
  //     <PreAnalisis onClickNav={onClickNav} />
  //   </div>
  // );
};

export default PreAnalisisContainer;
