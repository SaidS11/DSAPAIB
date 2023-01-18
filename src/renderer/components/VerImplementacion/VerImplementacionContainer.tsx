/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { TableOptions, Column } from 'react-table';
import VerImplementacion from './VerImplementacion';

const VerImplementacionContainer = () => {
    interface Cols {
        col1: string;
      }
      const data = React.useMemo(
        (): Cols[] => [
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
    
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
    
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
          {
            col1: 'Protocolo 1',
          },
          {
            col1: 'Protocolo 2',
          },
        ],
        []
      );
      const columns: Array<Column<{ col1: string }>> = React.useMemo(
        () => [
          {
            Header: 'Protocolos',
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

  return <VerImplementacion options={options}/>;
};

export default VerImplementacionContainer;
