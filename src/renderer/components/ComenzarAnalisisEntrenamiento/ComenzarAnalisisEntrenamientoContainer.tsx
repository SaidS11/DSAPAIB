import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { DialogProps } from '@mui/material/Dialog';
import {
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
  setVentanasArray,
  setVentanasArray2,
  setVentanasArrayGsr,
  setVentanasArrayTemp,
} from 'redux/slices/SeñalesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import ComenzarAnalisisEntrenamiento from './ComenzarAnalisisEntrenamiento';
import ModalVerMas from '../ResultadosAnalisis/ModalVerMas';
import { PacientesAnalisisMongo } from '../Utilities/Constants';

// Crear vermas datos y el vermas dejarlo como vermas final, en el datos no se podran ver la confusion o en el tree, regresar await a como estaba
interface Config {
  modelo: string;
  algoritmo: string;
}

const ComenzarAnalisisEntrenamientoContainer = () => {
  const [dataParam, setDataParam] = useState({});
  const [dataM, setDataM] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [modelo, setModelo] = useState('');
  const [protocolo, setProtocolo] = useState('');
  const [filtroSexo, setFiltroSexo] = useState('');
  const [tipo, setTipo] = useState('');
  const [selectedPatientsLocal, setSelectedPatientsLocal] = useState([{}]);
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  // const selectedPatients = useCustomSelector(
  //   (state) => state.config.selectedPatients
  // );
  async function preAn() {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.preAnalisisPython();
  }
  window.electron.ipcRenderer.preAnalisisP((event: unknown, resp: string) => {
    console.log('Esta es', resp);
    // appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    // navigate('/preAnalisis');
  });
  const toggleModal = (scrollType: DialogProps['scroll']) => {
    console.log('Seleccionado', modelo);
    const found = dataM.find((el: Config) => el.modelo === modelo);
    console.log('Founded', found);
    preAn();
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
  appDispatch(setVentanasArray([]));
  appDispatch(setVentanasArray2([]));
  appDispatch(setVentanasArrayGsr([]));
  appDispatch(setVentanasArrayTemp([]));
  appDispatch(setCantidadSujetos(2));
  appDispatch(setCantidadSujetosRespaldo(2));
  const onClickStop = () => {
    // stopSensores()
  };
  async function loadData() {
    appDispatch(setIsLoading(true));
    const localResp = await window.electron.ipcRenderer.selectPrs();
    setDataParam(localResp);
    appDispatch(setIsLoading(false));
  }

  async function loadModels() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    // const resp: Config[] = (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    const resp =
      (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    console.log('Esta es', resp);
    if (resp.length > 0) {
      // console.log('si es', resp);
      setDataM([...resp]);
    } else {
      // console.log('nada');
      // setOpen(true);
    }
    appDispatch(setIsLoading(false));
  }

  useEffect(() => {
    console.log('updated');
    loadData();
    loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('updated', protocolo);
    loadPacientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocolo]);
  console.log('LocalState', selectedPatientsLocal);
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(selectedPatientsLocal.length < 0) {
    //   alert("Seleccione al menos un paciente")
    // }
    // else {
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    console.log('la data', dataF);
    appDispatch(setAnalisisParams(dataF));
    navigate('/caracterizar');
    // }
    // navigate('/preAnalisis');
    // preAn()
  };
  return (
    <div>
      <ComenzarAnalisisEntrenamiento
        tableData={data}
        columnsData={columns}
        data={dataParam}
        dataM={dataM}
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
          toggleModal={toggleModal}
          open={open}
          tipo={tipo}
          scroll={scroll}
        />
      )}
    </div>
  );
};

export default ComenzarAnalisisEntrenamientoContainer;
