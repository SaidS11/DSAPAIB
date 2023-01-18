import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { useCustomSelector } from '../../../redux/hooks';
import VerPaciente from './VerPaciente';

// import { useNavigate } from "react-router-dom";

const VerPacienteContainer = () => {
  const usuario = useCustomSelector((state) => state.datos.usuarioPaciente);
  const datosArray = useCustomSelector((state) => state.datos.datosPaciente);
  const navigate = useNavigate();
  console.log('user', usuario);
  console.log('DatosArray', datosArray[0]);
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
  const onClickCaptura = () => {
    navigate('/escogerConfiguracion');
  };
  return (
    <VerPaciente
      options={options}
      datosArray={datosArray}
      onClickCaptura={onClickCaptura}
    />
  );
};

export default VerPacienteContainer;
