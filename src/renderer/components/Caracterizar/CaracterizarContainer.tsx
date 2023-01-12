import React from 'react';
import { TableOptions, Column } from 'react-table';
import Caracterizar from './Caracterizar';

// import { useNavigate } from "react-router-dom";

const CaracterizarContainer = () => {
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
        Header: 'Señales',
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
  return <Caracterizar options={options} />;
};

export default CaracterizarContainer;
