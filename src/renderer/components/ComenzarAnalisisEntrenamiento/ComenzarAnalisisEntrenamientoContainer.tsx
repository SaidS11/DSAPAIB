/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// import { SerialPort } from 'serialport';
// import { ReadlineParser } from '@serialport/parser-readline';
import ComenzarAnalisisEntrenamiento from './ComenzarAnalisisEntrenamiento';

interface Config {
  modelo: string;
  
}

const ComenzarAnalisisEntrenamientoContainer = () => {
  const [dataParam, setDataParam] = useState({});
  const [dataM, setDataM] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
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
  async function preAn() {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.preAnalisisPython();
  }
  window.electron.ipcRenderer.preAnalisisP((event: unknown, resp: string) => {
    console.log('Esta es', resp);
    // appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    navigate('/preAnalisis');
  });
  const onClickStop = () => {
    // stopSensores()
  };
  async function loadData() {
    appDispatch(setIsLoading(true));
    window.Bridge.selectProtocolos();
  }
  window.Bridge.selectPrs((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp);
      setDataParam(resp);
    } else {
      console.log('nada');
      setOpen(true);
    }
    appDispatch(setIsLoading(false));
  });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    console.log('la data', dataF);
    appDispatch(setAnalisisParams(dataF));
    preAn()
  };
  return <ComenzarAnalisisEntrenamiento data={dataParam} dataM={dataM} options={options} onClickNav={onClickNav} onClickStop={onClickStop} />;
};

export default ComenzarAnalisisEntrenamientoContainer;


// const SerialPort = require('serialport');
//   const ReadlineParser = SerialPort.parsers.ReadlineParser;
//   const serialPort = new SerialPort({
//     path: 'COM5',
//     baudRate: 9600,
//     dataBits: 8,
//     stopBits: 1,
//     parity: 'none',
//   });
//   const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' })); // Normalizar la impresion
//   async function loadSensores() {
//     serialPort.open();
//     let buffer = '';
//     let sum = 0;
//     let gsrAverage = 0;
//     let hr = 0;
//     console.log("ANTES DEE");
//     parser.on('data', async (chunk: any) => {
//       console.log("SIGOOO")
//       for (let i = 0; i < 10; i++) {
//         buffer = '';
//         buffer += chunk;
//         console.log(buffer);
//         sum += parseInt(buffer);
//       }
//       gsrAverage = sum / 10;
//       console.log('Gsr Average', gsrAverage);
//       hr = ((1024 + 2 * gsrAverage) * 1000) / (512 - gsrAverage);
//       console.log('GSR', hr);
//       // const resp = await sleep(10000);
//       // console.log("Resp", resp);
//     });
//   }