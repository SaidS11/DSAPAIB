/* eslint-disable prettier/prettier */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import VerConfiguracion from './VerAlgoritmos';

// import { useNavigate } from "react-router-dom";

const VerModelosContainer = () => {
  const navigate = useNavigate();
  interface Cols {
    col1: string;
  }
  const data = React.useMemo(
    (): Cols[] => [
      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },
      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },
      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },
      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },
      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },

      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },
      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },
      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },

      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },
      {
        col1: 'Algoritmo 1',
      },
      {
        col1: 'Algoritmo 2',
      },
    ],
    []
  );
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Modelos',
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
  const onClickRow = (element: any) => {
    console.log(element);
    console.log(element.cells);
    navigate('/verConfiguracionDetalle');
  };

  return <VerConfiguracion options={options} onClickRow={onClickRow} />;
};

export default VerModelosContainer;
