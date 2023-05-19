import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';
import {
  setIsLoading,
  setSignalsIteration,
} from '../../../redux/slices/StatusSlice';
import VerPaciente from './VerPaciente';
import { PacientesAnalisisMongo } from '../Utilities/Constants';

// import { useNavigate } from "react-router-dom";
interface Cols {
  col1: string;
}

const VerPacienteContainer = () => {
  const usuario = useCustomSelector((state) => state.datos.usuarioPaciente);
  const datosArray = useCustomSelector((state) => state.datos.datosPaciente);
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  console.log('user', usuario);
  console.log('DatosArray', datosArray[0]);
  const [data, setData] = useState<Cols[]>([]);

  const datarRetrieved: Cols[] = [];
  async function loadPacientes() {
    appDispatch(setIsLoading(true));
    const document = {
      name: `${datosArray[0].col1} ${datosArray[0].col2} ${datosArray[0].col3}`,
    };
    const jsonDocument = JSON.stringify(document);
    try {
      const pacientes = (await window.electron.ipcRenderer.buscarElementoM(
        jsonDocument
      )) as Array<PacientesAnalisisMongo>;
      for (let i = 0; i < pacientes.length; i += 1) {
        datarRetrieved.push({
          col1: `${pacientes[i].name} Protocolo: ${pacientes[i].protocol} Etiqueta: ${pacientes[i].etiqueta}`,
        });
      }
      console.log('Retrieved', datarRetrieved);
      setData(datarRetrieved);
    } catch (error: any) {
      alert('Error while retrieving data');
    }
    appDispatch(setIsLoading(false));
  }

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
  const onClickIrInicio = () => {
    navigate('/');
  };

  useEffect(() => {
    console.log('updated');
    loadPacientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <VerPaciente
      options={options}
      datosArray={datosArray}
      onClickCaptura={onClickCaptura}
      onClickIrInicio={onClickIrInicio}
    />
  );
};

export default VerPacienteContainer;
