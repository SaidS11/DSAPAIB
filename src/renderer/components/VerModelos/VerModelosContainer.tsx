/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import VerModelos from './VerModelos';
import { setModeloDetalle } from '../../../redux/slices/ConfiguracionSlice';

// import { useNavigate } from "react-router-dom";
interface Config {
  nombre: string;
}

const VerModelosContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  interface Cols {
    col1: string;
  }
  const [data, setData] = useState<Cols[]>([]);
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Modelos',
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
      (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };
  
  async function loadDataDetalle(nameConf: string) {
    appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.selectImplementacionPorNombre(nameConf);
  }
  window.electron.ipcRenderer.selectImplementacionPorN((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Este es el detalle click', resp);
      appDispatch(setModeloDetalle(resp[0]));
    } else {
      console.log('nada en detalle');
    }
    appDispatch(setIsLoading(false));
    navigate('/verModelo');
  });

  const onClickRow = (element: any) => {
    console.log(element);
    console.log(element.cells);
    loadDataDetalle(element.cells[0].value);
  };

  return <VerModelos options={options} onClickRow={onClickRow} />;
};

export default VerModelosContainer;
