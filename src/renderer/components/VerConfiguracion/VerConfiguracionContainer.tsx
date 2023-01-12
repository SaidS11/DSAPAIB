import React from 'react';
import { TableOptions, Column } from 'react-table';
import VerConfiguracion from './VerConfiguracion';

// import { useNavigate } from "react-router-dom";

const VerConfiguracionContainer = () => {
  interface Cols {
    col1: string;
  }
  const data = React.useMemo(
    (): Cols[] => [
      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },
      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },
      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },
      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },
      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },

      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },
      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },
      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },

      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },
      {
        col1: 'Registro 1',
      },
      {
        col1: 'Registro 2',
      },
    ],
    []
  );
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Configuraciones',
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
  return <VerConfiguracion options={options} />;
};

export default VerConfiguracionContainer;
