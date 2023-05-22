import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { DialogProps } from '@mui/material/Dialog';
import {
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
  setCleanAllSensors,
  setCleanDatosAnalisisIA,
  setPredictMode,
} from '../../../redux/slices/SeñalesSlice';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setIsLoading,
  setSignalsIteration,
} from '../../../redux/slices/StatusSlice';
import ComenzarAnalisisEntrenamiento from './ComenzarAnalisisEntrenamiento';
import ModalVerMas from '../Utilities/ModalVerMas';
import { PacientesAnalisisMongo } from '../Utilities/Constants';

interface Config {
  modelo: string;
  algoritmo: string;
}

const ComenzarAnalisisEntrenamientoContainer = () => {
  const [dataParam, setDataParam] = useState({});
  const [dataAlgoritmo, setDataAlgoritmo] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [modelo, setModelo] = useState('');
  const [protocolo, setProtocolo] = useState('');
  const [filtroSexo, setFiltroSexo] = useState('');
  const [tipo, setTipo] = useState('');
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const selectedPatients = useCustomSelector(
    (state) => state.config.selectedPatients
  );
  // async function preAn() {
  //   appDispatch(setIsLoading(true));
  //   console.log('Getting message');
  //   window.electron.ipcRenderer.preAnalisisPython();
  // }
  // window.electron.ipcRenderer.preAnalisisP((event: unknown, resp: string) => {
  //   console.log('Esta es', resp);
  //   // appDispatch(setPythonResponse(resp));
  //   appDispatch(setIsLoading(false));
  //   // navigate('/preAnalisis');
  // });
  const toggleModal = (scrollType: DialogProps['scroll']) => {
    console.log('Seleccionado', modelo);
    const found = dataAlgoritmo.find((el: Config) => el.modelo === modelo);
    console.log('Founded', found);
    // preAn();
    setTipo(found.algoritmo_ia);
    setOpen(!open);
    setScroll(scrollType);
  };
  interface Cols {
    col1: string;
    col2: string;
  }
  const [data, setData] = useState<Cols[]>([]);

  const datarRetrieved: Cols[] = [];

  async function loadPacientes() {
    appDispatch(setIsLoading(true));
    const document = { protocol: protocolo };
    const jsonDocument = JSON.stringify(document);
    try {
      const pacientes = (await window.electron.ipcRenderer.buscarElementoM(
        jsonDocument
      )) as Array<PacientesAnalisisMongo>;
      for (let i = 0; i < pacientes.length; i += 1) {
        datarRetrieved.push({
          col1: pacientes[i].name,
          col2: pacientes[i].etiqueta,
        });
      }
      setData(datarRetrieved);
    } catch (error: any) {
      alert('Error while retrieving data');
    }
    appDispatch(setIsLoading(false));
  }

  const columns: Array<Column<{ col1: string; col2: string }>> = React.useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'col1',
      },
      {
        Header: 'Etiqueta',
        accessor: 'col2',
      },
    ],
    []
  );
  const options: TableOptions<{
    col1: string;
    col2: string;
  }> = {
    data,
    columns,
  };

  const onClickStop = async () => {
    await window.electron.ipcRenderer.insertModeloIA(
      'test2',
      'Arbol de Decisión',
      true,
      'Completo',
      '{}'
    );

    const resp = await window.electron.ipcRenderer.selectModIA();
  };

  window.electron.ipcRenderer.insertModIA((event: any, resp: any) => {
    if (resp > 0) {
      console.log('insert', resp[0]);
      if (resp[0] === 0) {
        console.log('Failed', resp[1]);
      }
    } else {
      console.log(resp);
    }
  });
  async function loadData() {
    appDispatch(setIsLoading(true));
    const localResp = await window.electron.ipcRenderer.selectPrs();
    setDataParam(localResp);
    appDispatch(setIsLoading(false));
  }

  async function loadAlgos() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    // const resp: Config[] = (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    // const resp =
    //   (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    const resp = await window.electron.ipcRenderer.selectAlgos();
    console.log('Este es algo', resp);
    if (resp.length > 0) {
      // console.log('si es', resp);
      setDataAlgoritmo([...resp]);
    } else {
      // console.log('nada');
      // setOpen(true);
    }
    appDispatch(setIsLoading(false));
  }

  useEffect(() => {
    console.log('updated');
    loadData();
    loadAlgos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('updated', protocolo);
    loadPacientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocolo]);
  console.log('lennn', selectedPatients.length);
  console.log('LocalState', selectedPatients);

  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.querySelector('form') as
      | HTMLFormElement
      | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    const numIteraciones = parseInt(dataF.iteraciones.toString())
    if (selectedPatients.length <= 0) {
      alert('Seleccione al menos un paciente');
    } else if (selectedPatients.length > numIteraciones) {
      alert('Los K folds no pueden ser menores al numero de pacientes seleccionados');
    } else {
      
      console.log('la data', dataF);
      appDispatch(setPredictMode(false));
      appDispatch(setAnalisisParams(dataF));
      appDispatch(setSignalsIteration(0));
      appDispatch(setCantidadSujetos(selectedPatients.length));
      appDispatch(setCantidadSujetosRespaldo(selectedPatients.length));
      navigate('/caracterizar');
    }
  };
  useEffect(() => {
    appDispatch(setCleanAllSensors(true));
    appDispatch(setCleanDatosAnalisisIA([]));
  }, []);

  return (
    <div>
      <ComenzarAnalisisEntrenamiento
        tableData={data}
        columnsData={columns}
        data={dataParam}
        dataAlgoritmo={dataAlgoritmo}
        options={options}
        onClickNav={onClickNav}
        onClickStop={onClickStop}
        toggleModal={toggleModal}
        modelo={modelo}
        setModelo={setModelo}
        setProtocolo={setProtocolo}
        protocolo={protocolo}
        setFiltroSexo={setFiltroSexo}
        filtroSexo={filtroSexo}
        // setSelectedPatientsLocal={setSelectedPatientsLocal}
      />
      {open && (
        <ModalVerMas
          toggleModalVerMas={toggleModal}
          open={open}
          tipo={tipo}
          scroll={scroll}
        />
      )}
    </div>
  );
};

export default ComenzarAnalisisEntrenamientoContainer;
