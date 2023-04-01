/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import PreAnalisis from './PreAnalisis';

const PreAnalisisContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const paramsArg = useCustomSelector((state) => state.config.analisisParams);
  console.log('PARAMS', paramsArg);

  // async function startAnalysis(tipo: string) {
  //   appDispatch(setIsLoading(true));
  //   console.log('Getting message');
  //   window.electron.ipcRenderer.analisisPython(tipo);
  // }
  // window.electron.ipcRenderer.analisisP((event: any, resp: any) => {
  //   console.log('Esta es', resp);
  //   appDispatch(setPythonResponse(resp));
  //   appDispatch(setIsLoading(false));
  //   navigate('/resultadosAnalisis');
  // });
  // async function getParams() {
  //   appDispatch(setIsLoading(true));
  //   console.log('Getting message');
  //   window.electron.ipcRenderer.selectImplementacionPorNombre(params!.modelo);
  // }
  // window.electron.ipcRenderer.selectImplementacionPorN((event: any, resp: any) => {
  //   console.log('Esta es', resp);
  //   appDispatch(setIsLoading(false));
  //   console.log("Algo", resp[0].algoritmo_ia)
  //   if (resp[0].algoritmo_ia === "Arbol de Decisión") {
  //     startAnalysis('Tree');
  //   }
  //   if (resp[0].algoritmo_ia === "Red Neuronal") {
  //     startAnalysis('KNN');
  //   }
  //   if (resp[0].algoritmo_ia === "Maquina de Soporte Vectorial") {
  //     startAnalysis('SVM');
  //   }
  // });
  async function startAnalysis(
    tipo: string,
    params: string,
    nombre: string,
    iteraciones: string,
    reducedPercentage: string
  ) {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.analisisPython(
      'Train',
      tipo,
      params,
      nombre,
      iteraciones,
      reducedPercentage
    );
  }
  window.electron.ipcRenderer.analisisP((event: any, resp: any) => {
    console.log('Esta es', resp);
    appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
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
      const { iteraciones, porcentaje } = paramsArg as any;
      // const reducedPercentage = parseInt(porcentaje) / 100;
      // const strPercentage = reducedPercentage.toString();
      console.log('iteraciones y porc', iteraciones, porcentaje);
      const { nombre } = resp[0];
      if (resp[0].algoritmo_ia === 'Arbol de Decisión') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('Tree', params, nombre, iteraciones, porcentaje);
      }
      if (resp[0].algoritmo_ia === 'Red Neuronal') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('KNN', params, nombre, iteraciones, porcentaje);
      }
      if (resp[0].algoritmo_ia === 'Maquina de Soporte Vectorial') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('SVM', params, nombre, iteraciones, porcentaje);
      }
    }
  );
  const onClickNav = () => {
    getParams(paramsArg);
  };

  return (
    <div>
      <PreAnalisis onClickNav={onClickNav} />
    </div>
  );
};

export default PreAnalisisContainer;
