/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
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
import ModalVerMas from '../Utilities/ModalVerMas';
import {
  PacientesAnalisisMongo,
} from '../Utilities/Constants';
import Prediccion from './Prediccion';

interface Config {
  modelo: string;
  algoritmo: string;
}

const PrediccionContainer = () => {
  const [open, setOpen] = useState(false);
  const [dataParam, setDataParam] = useState({});
  const [dataM, setDataM] = useState({});
  const [protocolo, setProtocolo] = useState('');
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const selectedPatients = useCustomSelector(
    (state) => state.config.selectedPatients
  );


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
      alert("Error while retrieving data");
    }
    appDispatch(setIsLoading(false));
  }

  async function loadData() {
    appDispatch(setIsLoading(true));
    const localResp = await window.electron.ipcRenderer.selectPrs();
    setDataParam(localResp);
    appDispatch(setIsLoading(false));
    appDispatch(setIsLoading(false));
  }

  async function loadModels() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    const resp: Config[] = (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    console.log('Esta es', resp);
    if (resp.length > 0) {
      // console.log('si es', resp);
      setDataM(resp);
    } else {
      // console.log('nada');
      setOpen(true);
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
  // async function loadSensores() {
  //   console.log('Getting message');
  //   window.Bridge.sensores();
  // }
  // window.Bridge.senso((event: any, resp: any) => {
  //   console.log("Los sensores", resp);
  //   // let buffer = '';
  //   // let sum = 0;
  //   // let gsrAverage = 0;
  //   // let hr = 0;
  //   // for (let i = 0; i < 10; i++) {
  //   //   buffer = '';
  //   //   buffer += resp;
  //   //   console.log(buffer);
  //   //   sum += parseInt(buffer);
  //   // }
  //   // gsrAverage = sum / 10;
  //   // console.log('Gsr Average', gsrAverage);
  //   // hr = ((1024 + 2 * gsrAverage) * 1000) / (512 - gsrAverage);
  //   // console.log('GSR', hr);
  // });
  // async function stopSensores() {
  //   console.log('Getting message stop');
  //   window.Bridge.sensoresStop();
  // }
  // window.Bridge.sensoStop((event: any, resp: any) => {
  //   console.log(resp);
  // });




  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {

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
      appDispatch(setPredictMode(true));
      appDispatch(setSignalsIteration(0));
      appDispatch(setCantidadSujetos(selectedPatients.length));
      appDispatch(setCantidadSujetosRespaldo(selectedPatients.length));
      navigate('/caracterizar');
    }
  };

    // Test Sensors
    // const onClickNav = () => {
    //   loadSensores()
    // };
    const onClickStop = () => {
      // stopSensores()
    };

  useEffect(() => {
    console.log('updated');
    loadData();
    loadModels();
    appDispatch(setCleanAllSensors(true));
    appDispatch(setCleanDatosAnalisisIA([]));
  }, []);  
  useEffect(() => {
    console.log('updated', protocolo);
    loadPacientes();
  }, [protocolo]);


  return <Prediccion options={options} tableData={data}
    columnsData={columns} data={dataParam} dataM={dataM} onClickNav={onClickNav} onClickStop={onClickStop} protocolo={protocolo} setProtocolo={setProtocolo}/>;
};

export default PrediccionContainer;
