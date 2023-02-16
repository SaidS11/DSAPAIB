/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { TableOptions, Column } from 'react-table';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setConfigCompleta } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import VerAlgoritmo from './VerAlgoritmo';

interface Config {
  modelo: string;
}

const VerAlgoritmoContainer = () => {
  const nombre = useCustomSelector((state) => state.config.algoritmoIA);
  const appDispatch = useCustomDispatch();
  interface Cols {
      col1: string;
    }
    const [data, setData] = useState<Cols[]>([]);
    const datarRetrieved: Cols[] = [];
    async function loadData(name: string) {
      appDispatch(setIsLoading(true));
      window.electron.ipcRenderer.selectImplementacionNombreIA(name);
    }
    window.electron.ipcRenderer.selectImplemenIA((event: any, resp: any) => {
      console.log('Esta es', resp);
      if (resp.length > 0) {
        console.log('si es', resp);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < resp.length; i++) {
          datarRetrieved.push({
            col1: resp[i].modelo,
          });
        }
        setData(datarRetrieved);
      } else {
        console.log('nada');
      }
      appDispatch(setIsLoading(false));
    });
    useEffect(() => {
      console.log('updated');
      loadData(nombre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const columns: Array<Column<{ col1: string }>> = React.useMemo(
      () => [
        {
          Header: 'Modelo',
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

  return <VerAlgoritmo nombre={nombre} options={options}/>;
};

export default VerAlgoritmoContainer;
