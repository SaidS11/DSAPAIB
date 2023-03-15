/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { TableOptions, Column } from 'react-table';
import { useCustomDispatch } from '../../../redux/hooks';
import { setErrorDetails, setFailUpload, setIsLoading, setIsUploaded } from '../../../redux/slices/StatusSlice';
import CrearAlgoritmo from './CrearAlgoritmo';

const CrearImplementacionContainer = () => {
  const appDispatch = useCustomDispatch();

  async function insertData(modelo: string, descripcion: string, algoritmo: string, params: any) {
    window.Bridge.insertModelo(modelo, descripcion, algoritmo, params);
  }
  window.Bridge.insertMod((event: any, resp: any) => {
    console.log('Esta es mi resp', resp)
    if (resp[0] === 0) {
      console.log('Despacho error', resp[1]);
      appDispatch(setFailUpload(true));
      appDispatch(setIsLoading(false));
      appDispatch(setErrorDetails(resp[1]))
    } else {
      console.log('No despacho error');
      appDispatch(setIsLoading(false));
      appDispatch(setIsUploaded(true));
    }
  });
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    appDispatch(setIsLoading(true));
    e.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    console.log('la data', dataF);
    if (dataF.algoritmo === 'Arbol de Decisión') {
      const params = {
        profundidad: dataF.profundidad,
        estado: dataF.estado
      }
      console.log(params);
      insertData(dataF.nombreModelo as string, dataF.descripcion as string, dataF.algoritmo as string, params)
    }
    if (dataF.algoritmo === 'Red Neuronal') {
      const params = {
        vecinos: dataF.vecinos,
      }
      console.log(params);
      insertData(dataF.nombreModelo as string, dataF.descripcion as string, dataF.algoritmo as string, params)
    }
    if (dataF.algoritmo === 'Maquina de Soporte Vectorial') {
      const params = {
        kernel: dataF.kernel,
      }
      console.log(params);
      insertData(dataF.nombreModelo as string, dataF.descripcion as string, dataF.algoritmo as string, params)
    }


  };

  return <CrearAlgoritmo onClickNav={onClickNav}/>;
};

export default CrearImplementacionContainer;
