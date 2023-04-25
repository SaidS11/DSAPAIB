import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { DialogProps } from '@mui/material/Dialog';
import {
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
  setCleanDatosAnalisisIA,
  setVentanasArray,
  setVentanasArray2,
  setVentanasArrayGsr,
  setVentanasArrayTemp,
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
import {
  PacientesAnalisisMongo,
  datosDePrueba,
  datosDePrueba2,
  datosDePrueba3,
} from '../Utilities/Constants';

// Crear vermas datos y el vermas dejarlo como vermas final, en el datos no se podran ver la confusion o en el tree, regresar await a como estaba
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
    const found = dataAlgoritmo.find((el: Config) => el.modelo === modelo);
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

  const onClickStop = async () => {
    // startAnalysis('Tree', '{"profundidad":"3","estado":"1"}', 'test', '2', '40', datosDePrueba3);

    // const respStringTest = '{"colMediaABSEMG1":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaEMG1":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSEMG1":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"colMediaABSEMG2":{"0":8.5,"1":16.0,"2":8.5,"3":16.0,"4":4.5,"5":14.5,"6":4.5,"7":14.5},"colMedianaEMG2":{"0":8.5,"1":16.0,"2":8.5,"3":16.0,"4":4.5,"5":14.5,"6":4.5,"7":14.5},"colRMSEMG2":{"0":8.57,"1":16.06,"2":8.57,"3":16.06,"4":4.81,"5":14.6,"6":4.81,"7":14.6},"colMediaABSGsr":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaGsr":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSGsr":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"colMediaABSTemp":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaTemp":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSTemp":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"etiqueta":{"0":"sano","1":"diabetico","2":"sano","3":"diabetico","4":"sano","5":"sano","6":"sano","7":"sano"},"nombre":{"0":"Karla","1":"Karla","2":"Martha Garcia Lopez","3":"Martha Garcia Lopez","4":"Sujeto Prueba 1","5":"Sujeto Prueba 1","6":"Sujeto Prueba 2","7":"Sujeto Prueba 2"}}'
    // const parsedRespObj = JSON.parse(respStringTest);
    // console.log("this is parsed", parsedRespObj)

    // const insert = await window.electron.ipcRenderer.insertModIA('test2','Arbol de Decisión',true, 'Completo')
    await window.electron.ipcRenderer.insertModeloIA(
      'test2',
      'Arbol de Decisión',
      true,
      'Completo'
    );

    const resp = await window.electron.ipcRenderer.selectModIA();
    console.log('Dab', resp);
    // navigate("/resTable");
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
  // Testinggg
  async function startAnalysis(
    tipoArg: string,
    params: string,
    nombre: string,
    iteraciones: string,
    reducedPercentage: string,
    datos: string
  ) {
    // appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.analisisPython(
      'Train',
      tipo,
      params,
      nombre,
      iteraciones,
      reducedPercentage,
      datos
    );
  }
  window.electron.ipcRenderer.analisisP((event: any, resp: any) => {
    console.log('Esta es', resp);
    appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));

    // navigate('/resultadoEntrenar');
  });
  // Testinggg
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    // startAnalysis('Tree', '{"profundidad":"3","estado":"1"}', 'test', '2', '40', datosDePrueba2);

    e.preventDefault();
    if (selectedPatients.length <= 0) {
      alert('Seleccione al menos un paciente');
    } else {
      const form = document.querySelector('form') as
        | HTMLFormElement
        | undefined;
      const dataF = Object.fromEntries(new FormData(form).entries());
      console.log('la data', dataF);
      appDispatch(setAnalisisParams(dataF));
      appDispatch(setSignalsIteration(0));
      appDispatch(setCantidadSujetos(selectedPatients.length));
      appDispatch(setCantidadSujetosRespaldo(selectedPatients.length));
      navigate('/caracterizar');
    }
  };
  useEffect(() => {
    appDispatch(setVentanasArray([]));
    appDispatch(setVentanasArray2([]));
    appDispatch(setVentanasArrayGsr([]));
    appDispatch(setVentanasArrayTemp([]));
    appDispatch(setCleanDatosAnalisisIA([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
