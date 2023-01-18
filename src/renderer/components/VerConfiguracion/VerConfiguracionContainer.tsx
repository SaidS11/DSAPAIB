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
    // appDispatch(setIsLoading(true));
    // window.Bridge.selectConfiguracion();
    window.electron.ipcRenderer.selectConfiguracion();
  }
  window.electron.ipcRenderer.selectC((event: any, resp: any) => {
    console.log('llamada dentro');
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
  });
  console.log('estoy rendereando antes de detalle');
  useEffect(() => {
    console.log('updated lista config');
    loadData();
    /* const fetch = async () => {
      const respP = await loadData();
      return respP;
    }
    const resP2 = fetch()
    console.log('Esta es la reso', resP2); */
  }, []);
  /* useEffect(() => {
    console.log('updated');
    async function loadData() {
      appDispatch(setIsLoading(true));
      window.Bridge.selectConfiguracion();
    }
    window.Bridge.selectC((event: any, resp: any) => {
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
    });
    loadData();
  }, []) */
  // Load Data from the row clicked
  // Load Data from the row clicked (multimedia Data)
  async function loadDataMultimedia(nameConf: string) {
    window.Bridge.selectMultimediaConfig(nameConf);
  }
  window.Bridge.selectMC((event: any, resp: any) => {
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
    window.Bridge.selectConfiguracionDetalle(nameConf);
  }
  window.Bridge.selectCD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Este es el datelle click', resp);
      appDispatch(setConfigDetalle(resp));
    } else {
      console.log('nada en detalle');
    }
    loadDataMultimedia(resp[0].nombre);
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
