/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import {
  setConfigName,
  setConfigDetalle,
  setConfigMultimedia,
} from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import VerConfiguracion from './VerConfiguracion';

// import { useNavigate } from "react-router-dom";
interface Config {
  nombre: string;
}

const VerConfiguracionContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  interface Cols {
    col1: string;
  }
  const [data, setData] = useState<Cols[]>([]);
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Configuraciones',
        accessor: 'col1',
      },
    ],
    []
  );
  const datarRetrieved: Cols[] = [];

  // Load Data for the rows
  async function loadData() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    const resp: Config[] =
      (await window.electron.ipcRenderer.selectC()) as Array<Config>;
    console.log('Esta es', resp);
    if (resp.length > 0) {
      console.log('si es', resp);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < resp.length; i++) {
        datarRetrieved.push({
          col1: resp[i].nombre,
        });
      }
      setData(datarRetrieved);
    } else {
      console.log('nada');
    }
    appDispatch(setIsLoading(false));
  }
  console.log('estoy rendereando antes de detalle');
  useEffect(() => {
    console.log('updated lista config');
    loadData();
  }, []);
  async function loadDataMultimedia(nameConf: string, resp: any) {
    appDispatch(setConfigDetalle(resp));
    window.electron.ipcRenderer.selectMultimediaConfig(nameConf);
  }
  window.electron.ipcRenderer.selectMC((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('esta es la multimedia', resp);
      appDispatch(setConfigMultimedia(resp));
      navigate('/verConfiguracionDetalle');
    } else {
      console.log('nada en multimedia');
    }
    appDispatch(setIsLoading(false));
  });
  async function loadDataDetalle(nameConf: string) {
    appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.selectConfiguracionDetalle(nameConf);
  }
  window.electron.ipcRenderer.selectCD(async (event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Este es el datelle click', resp);
      appDispatch(setConfigDetalle(resp));
    } else {
      console.log('nada en detalle');
    }
    // appDispatch(setIsLoading(false));
    loadDataMultimedia(resp[0].nombre, resp);
  });

  const onClickRow = useCallback((element: any) => {
    console.log(element);
    console.log(element.cells);
    // console.log(element.cells[0].value)
    appDispatch(setConfigName(element.cells[0].value));
    loadDataDetalle(element.cells[0].value);
  }, []);
  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };
  return <VerConfiguracion options={options} onClickRow={onClickRow} />;
};

export default VerConfiguracionContainer;
