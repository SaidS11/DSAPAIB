/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { TableOptions, Column } from 'react-table';
import Prediccion from './Prediccion';

const PrediccionContainer = () => {
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

  return <Prediccion options={options}/>;
};

export default PrediccionContainer;
