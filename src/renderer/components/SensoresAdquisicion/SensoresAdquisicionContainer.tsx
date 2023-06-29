import { useEffect, useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setRealTimeSignal } from '../../../redux/slices/SeñalesSlice';
import SensoresAdquisicion from './SensoresAdquisicion';

interface SensoresAdquisicionInterface {
  mode: string;
  shouldStop: boolean;
}

const SensoresAdquisicionContainer = (props: SensoresAdquisicionInterface) => {
  const { mode, shouldStop } = props;
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const [isReady, setIsReady] = useState(false);
  const onClickAdd = () => {};
  const [dataXGsr, setDataXGsr] = useState([]);
  const [dataYGsr, setDataYGsr] = useState([]);

  const [dataXFrecuencia, setDataXFrecuencia] = useState([]);
  const [dataYFrecuencia, setDataYFrecuencia] = useState([]);

  const [dataXAcelerometro, setDataXAcelerometro] = useState([]);
  const [dataYAcelerometro, setDataYAcelerometro] = useState([]);

  const count = 30;
  const startingNumbers = Array(count)
    .fill(1)
    .map((_, i) => i);
  const [data, setData] = useState({
    x: startingNumbers,
    y: startingNumbers,
  });

  const [dataXEmg1, setDataXEmg1] = useState<any>([...startingNumbers]);
  const [dataYEmg1, setDataYEmg1] = useState<any>([]);

  const [dataXEmg2, setDataXEmg2] = useState<any>([...startingNumbers]);
  const [dataYEmg2, setDataYEmg2] = useState<any>([]);

  const [dataXEmg3, setDataXEmg3] = useState<any>([...startingNumbers]);
  const [dataYEmg3, setDataYEmg3] = useState<any>([]);

  const [dataXEmg4, setDataXEmg4] = useState([...startingNumbers]);
  const [dataYEmg4, setDataYEmg4] = useState<any>([]);
  const appDispatch = useCustomDispatch();

  const sensorTest = useCustomSelector(
    (state) => state.señales.cantidadSensores
  );
  const sensoresSelected = 3;

  async function stopSensoresNew() {
    setIsReady(false);
    window.Bridge.sensoresStopNewTest();
  }
  // window.Bridge.sensoStopNewTest((event: any, resp: any) => {
  //   console.log("After stop");
  // });

  const onClickStopNew = async () => {
    await stopSensoresNew();
  };

  // Procesamiento de la señal
  let bufferdatos = '';
  // const latidos = 0;
  // const HR = 0;
  // const buffer = '';
  // const sum = 0;
  // const sumSpo2 = 0;
  // const gsrAverage = 0;
  // const hr = 0;
  // const volt = 0;
  // const hrOhms = 0;
  // const Impedancia = 0;
  // const contador = 0;
  // const contadorFrecuencia = 0;
  // const DCIR = 0;
  // const ACIR = 0;
  // const contadorFrecuenciaRED = 0;
  // const sumFrecuenciaRED = 0;
  // const DCRED = 0;
  // const ACRED = 0;
  // const Aoyagi = 0;
  // const frecuencia = 0;
  // const emg1Arr: any = [];
  // const emg2Arr: any = [];
  // const emg3Arr: any = [];
  // const emg4Arr: any = [];

  // const gsrArr: any = [];
  // const frecuenciaArr: any = [];
  // const acelerometroArr: any = [];

  async function startSensors() {
    setIsReady(true);
    window.Bridge.sensoresNewTest();
  }

  const onClickStartNew = async () => {
    await startSensors();
  };

  // Fin procesamiento

  async function loadSensores() {
    setIsReady(true);
    window.electron.ipcRenderer.sensores();
  }

  const testData: Array<string> = [];
  const testData2: Array<string> = [];
  const testData3: Array<string> = [];

  window.electron.ipcRenderer.senso((event: any, resp: any) => {
    if (shouldStop) {
      detenerIntervalo();
      stopSensores();
    }
    const dataLocal = resp;
    bufferdatos = dataLocal;
    const decode = decodeURIComponent(bufferdatos);
    const separado = decode.split(',');
    const regexNumero = /(\d+)/;
    if (separado.length >= sensoresSelected) {
      for(let i =  0; i < separado.length; i +=1) {
        // Obtenemos el valor numerico separando la entreda recibida
        const valorSeparado = separado[i].match(regexNumero) || ["NULL:", "0"];
        const valorNumerico = valorSeparado[1];

        if(separado[i].includes("GSR")) {
          testData.push(valorNumerico);
        } else if(separado[i].includes("TEMP")) {
          testData2.push(valorNumerico);
        } else if(separado[i].includes("FREC")) {
          testData3.push(valorNumerico);
        }
      }

      //Original
      // testData.push(separado[0]);
      // testData2.push(separado[1]);
      // testData3.push(separado[2]);
    }
  });

  const [globalData, setGlobalData] = useState<any>([]);
  const [globalData2, setGlobalData2] = useState<any>([]);
  const [globalData3, setGlobalData3] = useState<any>([]);
  const [globalData4, setGlobalData4] = useState<any>([]);

  function intervalFunction() {
    const objectToStore = {};
    if (sensoresSelected >= 1) {
      Object.assign(objectToStore, {
        emg1: [...globalData, ...testData],
      });
      setGlobalData([...globalData, ...testData]);
      setDataYEmg1(testData.slice(-dataXEmg1.length));
    }
    if (sensoresSelected >= 2) {
      Object.assign(objectToStore, {
        emg2: [...globalData2, ...testData2],
      });
      setGlobalData2([...globalData2, ...testData2]);
      setDataYEmg2(testData2.slice(-dataXEmg2.length));
    }
    if (sensoresSelected >= 3) {
      Object.assign(objectToStore, {
        emg3: [...globalData3, ...testData3],
      });
      setGlobalData3([...globalData3, ...testData3]);
      setDataYEmg3(testData3.slice(-dataXEmg3.length));
    }
    if (sensoresSelected >= 4) {
      Object.assign(objectToStore, {
        emg3: [...globalData3, ...testData3],
      });
      setGlobalData4([...globalData3, ...testData3]);
      setDataYEmg4(testData3.slice(-dataXEmg3.length));
    }
    appDispatch(setRealTimeSignal(objectToStore));
    // }
  }
  const auxFunc = (intervalToClean: any) => {
    clearInterval(intervalToClean);
  };
  const cleanUpTimed = (intervalToClean: any) => {
    setTimeout(() => auxFunc(intervalToClean), 5000);
  };
  let timeoutID: string | number | NodeJS.Timeout | undefined;
  function iniciarIntervalo() {
    timeoutID = setTimeout(function () {
      intervalFunction();
      iniciarIntervalo(); // Vuelve a iniciar el intervalo
    }, 100); // Elige el tiempo deseado (en milisegundos) para el intervalo
  }
  function detenerIntervalo() {
    clearTimeout(timeoutID);
  }
  useEffect(() => {
    let intervalID;
    if (isReady) {
      // intervalID = setInterval(intervalFunction, 100);
      iniciarIntervalo();
    } else {
      detenerIntervalo();
      // clearInterval(intervalID);
    }
  }, [isReady]);
  async function stopSensores() {
    // detenerIntervalo();
    setIsReady(false);
    console.log('FInal', globalData);
    console.log('FInal2', globalData2);
    console.log('FInal3', globalData3);

    // console.log('FInal', testData);
    // console.log('FInal2', testData2);
    // console.log('FInal3', testData3);
    // appDispatch(setIsLoading(true));

    // clearInterval(intervalFunction);
    const resp = await window.electron.ipcRenderer.sensoStop();
  }
  // window.electron.ipcRenderer.sensoStop((event: any, resp: any) => {
  //   // appDispatch(setIsLoading(true));
  //   // console.log(resp);
  //   // console.log('This was collected', arr);
  //   // const innerX: any = [...Array(arr.length).keys()];
  //   // console.log('Inner', innerX);
  //   // setDataYGsr(arr);
  //   // setDataXGsr(innerX);
  //   // appDispatch(setIsLoading(false));
  //   // appDispatch(setIsLoading(false));
  // });

  const onClickStart = async () => {
    loadSensores();
  };
  const onClickStop = async () => {
    stopSensores();
  };
  useEffect(() => {
    if (mode === 'LIVE') {
      loadSensores();
    }
  }, []);
  return (
    <div>
      <SensoresAdquisicion
        sensoresSelected={sensoresSelected}
        onClickStart={onClickStart}
        onClickStop={onClickStop}
        data={data}
        dataXEmg1={dataXEmg1}
        dataYEmg1={dataYEmg1}
        dataXEmg2={dataXEmg2}
        dataYEmg2={dataYEmg2}
        dataXEmg3={dataXEmg3}
        dataYEmg3={dataYEmg3}
        dataXEmg4={dataXEmg4}
        dataYEmg4={dataYEmg4}
        dataXGsr={dataXGsr}
        dataYGsr={dataYGsr}
        dataXFrecuencia={dataXFrecuencia}
        dataYFrecuencia={dataYFrecuencia}
        dataXAcelerometro={dataXAcelerometro}
        dataYAcelerometro={dataYAcelerometro}
        onClickStopNew={onClickStopNew}
        onClickStartNew={onClickStartNew}
      />
    </div>
  );
};

export default SensoresAdquisicionContainer;
