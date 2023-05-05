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
  const datos = useCustomSelector((state) => state.señales.datosAnalisisIA);
  const nombresSeleccionados = useCustomSelector(
    (state) => state.config.selectedModels
  );

  console.log('Estos son los datos', datos);
  console.log('Estos son los nombres', nombresSeleccionados);
  const strData = JSON.stringify(datos);
  const auxData =
    '[[{"colMediaABSEMG1":3,"colMedianaEMG1":"3","colRMSEMG1":"3.32","colMediaABSEMG2":4,"colMedianaEMG2":"4","colRMSEMG2":"4.24","colMediaABSGsr":3,"colMedianaGsr":"3","colRMSGsr":"3.32","colMediaABSTemp":3,"colMedianaTemp":"3","colRMSTemp":"3.32","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"},{"colMediaABSEMG1":"12.50","colMedianaEMG1":"12.5","colRMSEMG1":"12.55","colMediaABSEMG2":"14.50","colMedianaEMG2":"14.5","colRMSEMG2":"14.68","colMediaABSGsr":"12.50","colMedianaGsr":"12.5","colRMSGsr":"12.55","colMediaABSTemp":"12.50","colMedianaTemp":"12.5","colRMSTemp":"12.55","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"}],[{"colMediaABSEMG1":"4.50","colMedianaEMG1":"4.5","colRMSEMG1":"4.64","colMediaABSEMG2":"4.50","colMedianaEMG2":"4.5","colRMSEMG2":"4.64","colMediaABSGsr":"4.50","colMedianaGsr":"4.5","colRMSGsr":"4.64","colMediaABSTemp":"4.50","colMedianaTemp":"4.5","colRMSTemp":"4.64","etiqueta":"Diabetico","nombre":"Isaac Rayas Chacon"},{"colMediaABSEMG1":"15.83","colMedianaEMG1":"15.5","colRMSEMG1":"15.97","colMediaABSEMG2":16,"colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"15.83","colMedianaGsr":"15.5","colRMSGsr":"15.97","colMediaABSTemp":"15.83","colMedianaTemp":"15.5","colRMSTemp":"15.97","etiqueta":"Diabetico","nombre":"Isaac Rayas Chacon"}],[{"colMediaABSEMG1":3,"colMedianaEMG1":"3","colRMSEMG1":"3.32","colMediaABSEMG2":"4.60","colMedianaEMG2":"5","colRMSEMG2":"4.96","colMediaABSGsr":3,"colMedianaGsr":"3","colRMSGsr":"3.32","colMediaABSTemp":3,"colMedianaTemp":"3","colRMSTemp":"3.32","etiqueta":"Sano","nombre":"Probando pr pr"},{"colMediaABSEMG1":11,"colMedianaEMG1":"11","colRMSEMG1":"11.11","colMediaABSEMG2":"15.50","colMedianaEMG2":"15.5","colRMSEMG2":"15.59","colMediaABSGsr":11,"colMedianaGsr":"11","colRMSGsr":"11.11","colMediaABSTemp":11,"colMedianaTemp":"11","colRMSTemp":"11.11","etiqueta":"Sano","nombre":"Probando pr pr"}]]';
  console.log('Estos son los datos str', strData);
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
  useEffect(() => {
    // preAn();
  }, []);
  async function startAnalysis(
    tipo: string,
    params: string,
    nombre: string,
    iteraciones: string,
    reducedPercentage: string,
    datosArg: string
  ) {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.analisisPython(
      'Train',
      tipo,
      params,
      nombre,
      iteraciones,
      reducedPercentage,
      strData
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
      // const { nombre } = resp[0];
      const nombre = nombresSeleccionados[0].col1;
      if (resp[0].algoritmo_ia === 'Arbol de Decisión') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('Tree', params, nombre, iteraciones, porcentaje, strData);
      }
      if (resp[0].algoritmo_ia === 'Red Neuronal') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('KNN', params, nombre, iteraciones, porcentaje, strData);
      }
      if (resp[0].algoritmo_ia === 'Maquina de Soporte Vectorial') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('SVM', params, nombre, iteraciones, porcentaje, strData);
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
