/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { TableOptions, Column } from 'react-table';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import VerProtocolo from './VerProtocolo';
import { setProtocoloDetalle } from '../../../redux/slices/ConfiguracionSlice';

const VerProtocoloContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  interface Cols {
      col1: string;
    }
  const [data, setData] = useState<Cols[]>([]);
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Protocolo',
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
    window.Bridge.selectProtocolos();
  }
  window.Bridge.selectPrs((event: any, resp: any) => {
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

  async function loadDataDetalle(nameConf: string) {
    appDispatch(setIsLoading(true));
    window.Bridge.selectProtocoloDetalle(nameConf);
  }
  window.Bridge.selectPD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Este es el detalle click', resp);
      appDispatch(setProtocoloDetalle(resp));
    } else {
      console.log('nada en detalle');
    }
    appDispatch(setIsLoading(false));
    navigate('/verProtocoloDetalle');
  });

  const onClickRow = useCallback((element: any) => {
    console.log(element);
    console.log(element.cells);
    // console.log(element.cells[0].value)
    /* appDispatch(setConfigName(element.cells[0].value)); */
    loadDataDetalle(element.cells[0].value);
  }, []);

  useEffect(() => {
    console.log('updated lista proto');
    loadData();
  }, []);
  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };
  return <VerProtocolo options={options} onClickRow={onClickRow} />;
};

export default VerProtocoloContainer;