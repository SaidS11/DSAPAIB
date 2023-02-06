/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { TableOptions, Column } from 'react-table';
import VerProtocolo2 from './VerAlgoritmo';

const VerModeloContainer = () => {
    interface Cols {
        col1: string;
      }
      const data = React.useMemo(
        (): Cols[] => [
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
    
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
    
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
          {
            col1: 'Modelo 1',
          },
          {
            col1: 'Modelo 2',
          },
        ],
        []
      );
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

  return <VerProtocolo2 options={options}/>;
};

export default VerModeloContainer;
