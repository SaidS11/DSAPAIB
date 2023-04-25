/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { TableOptions, Column } from 'react-table';
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import Prediccion from './Prediccion';

interface Config {
  modelo: string;
  algoritmo: string;
}

const PrediccionContainer = () => {
  const [open, setOpen] = useState(false);
  const [dataParam, setDataParam] = useState({});
  const [dataM, setDataM] = useState({});
  const appDispatch = useCustomDispatch();
  async function loadData() {
    appDispatch(setIsLoading(true));
    const localResp = await window.electron.ipcRenderer.selectPrs();
    setDataParam(localResp);
    appDispatch(setIsLoading(false));
    appDispatch(setIsLoading(false));

    // window.Bridge.selectProtocolos();
  }
  // window.Bridge.selectPrs((event: any, resp: any) => {
  //   if (resp.length > 0) {
  //     console.log('si es', resp);
  //     setDataParam(resp);
  //   } else {
  //     console.log('nada');
  //     setOpen(true);
  //   }
  //   appDispatch(setIsLoading(false));
  // });
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
  useEffect(() => {
    console.log('updated');
    loadData();
    loadModels();
  }, []);
  interface Cols {
      col1: string;
    }
    const data = React.useMemo(
      (): Cols[] => [
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
  
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
  
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
        },
        {
          col1: 'Analisis 1',
        },
        {
          col1: 'Analisis 2',
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
    async function loadSensores() {
      console.log('Getting message');
      window.Bridge.sensores();
    }
    window.Bridge.senso((event: any, resp: any) => {
      // console.log("Los sensores", resp);
      // let buffer = '';
      // let sum = 0;
      // let gsrAverage = 0;
      // let hr = 0;
      // for (let i = 0; i < 10; i++) {
      //   buffer = '';
      //   buffer += resp;
      //   console.log(buffer);
      //   sum += parseInt(buffer);
      // }
      // gsrAverage = sum / 10;
      // console.log('Gsr Average', gsrAverage);
      // hr = ((1024 + 2 * gsrAverage) * 1000) / (512 - gsrAverage);
      // console.log('GSR', hr);
    });
    async function stopSensores() {
      console.log('Getting message stop');
      window.Bridge.sensoresStop();
    }
    window.Bridge.sensoStop((event: any, resp: any) => {
      console.log(resp);
    });
    const onClickNav = () => {
      loadSensores()
    };
    const onClickStop = () => {
      stopSensores()
    };


  return <Prediccion options={options} data={dataParam} dataM={dataM} onClickNav={onClickNav} onClickStop={onClickStop} />;
};

export default PrediccionContainer;
