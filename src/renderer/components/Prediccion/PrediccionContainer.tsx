/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { TableOptions, Column } from 'react-table';
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import Prediccion from './Prediccion';

const PrediccionContainer = () => {
  const [open, setOpen] = useState(false);
  const [dataParam, setDataParam] = useState({});
  const appDispatch = useCustomDispatch();
  async function loadData() {
    appDispatch(setIsLoading(true));
    window.Bridge.selectProtocolos();
  }
  window.Bridge.selectPrs((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp);
      setDataParam(resp);
    } else {
      console.log('nada');
      setOpen(true);
    }
    appDispatch(setIsLoading(false));
  });
  useEffect(() => {
    console.log('updated');
    loadData();
  }, []);
    interface Cols {
        col1: string;
      }
      const data = React.useMemo(
        (): Cols[] => [
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
    
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
    
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
        ],
        []
      );
      const columns: Array<Column<{ col1: string }>> = React.useMemo(
        () => [
          {
            Header: 'Registros',
            accessor: 'col1',
          },
        ],
        []
      );
      const options: TableOptions<{
        col1: string;
      }> = {
        data,
        columns,
      };


  return <Prediccion options={options} data={dataParam}/>;
};

export default PrediccionContainer;
