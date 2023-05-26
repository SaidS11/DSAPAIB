import { useEffect, useState } from 'react';
import { useCustomDispatch, useCustomSelector } from 'redux/hooks';
import { setRealTimeSignal } from 'redux/slices/SeñalesSlice';
import ModalSensoresAdquisicion from './ModalSensoresAdquisicion';
import SensoresAdquisicion from './SensoresAdquisicion';
import { RealTimeSignalInterface } from '../Utilities/Constants';

interface SensoresAdquisicionInterface {
  mode: string;
  shouldStop: boolean;
}

const SensoresAdquisicionContainer = (props: SensoresAdquisicionInterface) => {

  const { mode,shouldStop } = props;
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const [isReady, setIsReady] = useState(false);
  const onClickAdd = () => {};
  const [dataXGiroscopio, setDataXGiroscopio] = useState([]);
  const [dataYGiroscopio, setDataYGiroscopio] = useState([]);

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

  const [dataXEmg4, setDataXEmg4] = useState([]);
  const [dataYEmg4, setDataYEmg4] = useState([]);
  const appDispatch = useCustomDispatch(); 

  
  const sensorTest = useCustomSelector((state) => state.señales.cantidadSensores);
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
  const latidos = 0;
  const HR = 0;
  const buffer = '';
  const sum = 0;
  const sumSpo2 = 0;
  const giroscopioAverage = 0;
  const hr = 0;
  const volt = 0;
  const hrOhms = 0;
  const Impedancia = 0;
  const contador = 0;
  const contadorFrecuencia = 0;
  const DCIR = 0;
  const ACIR = 0;
  const contadorFrecuenciaRED = 0;
  const sumFrecuenciaRED = 0;
  const DCRED = 0;
  const ACRED = 0;
  const Aoyagi = 0;
  const frecuencia = 0;
  const emg1Arr: any = [];
  const emg2Arr: any = [];
  const emg3Arr: any = [];
  const emg4Arr: any = [];

  const giroscopioArr: any = [];
  const frecuenciaArr: any = [];
  const acelerometroArr: any = [];
  async function startSensors() {
    console.log('Starting on component');
    setIsReady(true);
    window.Bridge.sensoresNewTest();
  }

  const onClickStartNew = async () => {
    await startSensors();
  };

  // Fin procesamiento

  async function loadSensores() {
    console.log('Getting message');
    setIsReady(true);
    window.electron.ipcRenderer.sensores();
  }
  // const [data, setData] = useState('');
  // let data = '';
  const [datosAux, setDatosAux] = useState<Array<string>>([]);
  // const testData: Array<string> = [...datosAux];
  const testData: Array<string> = [];
  const testData2: Array<string> = [];
  const testData3: Array<string> = [];

  window.electron.ipcRenderer.senso((event: any, resp: any) => {
    if(shouldStop) {
      detenerIntervalo();
      stopSensores();
    }
    // console.log("reading");
    const dataLocal = resp;
    bufferdatos = dataLocal;
    const decode = decodeURIComponent(bufferdatos);
    const separado = decode.split(',');
    if (separado.length >= sensoresSelected) {
      testData.push(separado[0]);
      testData2.push(separado[1]);
      testData3.push(separado[2]);
    }
  });

  const [globalData, setGlobalData] = useState<any>([]);
  const [globalData2, setGlobalData2] = useState<any>([]);
  const [globalData3, setGlobalData3] = useState<any>([]);
  // let intervalID: string | number | NodeJS.Timeout | undefined;
  // objectStored
  function intervalFunction (){
    // console.log("interval");    
    const objectToStore = {};
    if (sensoresSelected >= 1) {
      // setDataYEmg1((prev: any) => {
        //   return [...prev.slice(1), ...newA];
        // });
      Object.assign(objectToStore, {
        emg1: [...globalData, ...testData],
      });
      // objectToStore.emg1 = [...globalData, ...testData]
      setGlobalData([...globalData, ...testData]);
      setDataYEmg1(testData.slice(-dataXEmg1.length));
      // setDataXEmg1(innerXEmg1);
      // setDataXEmg1((prev: any) => {
      //   return prev;
      // });
    }
    if (sensoresSelected >= 2) {
      // setDataYEmg2((prev: any) => {
      //   return [...prev.slice(1), ...testData2];
      // });
      Object.assign(objectToStore, {
        emg2: [...globalData2, ...testData2],
      });
      // objectToStore.emg2 = [...globalData2, ...testData2]
      setGlobalData2([...globalData2, ...testData2]);
      setDataYEmg2(testData2.slice(-dataXEmg2.length))
      // setDataXEmg1(innerXEmg1);
      // setDataXEmg2((prev: any) => {
      //   return prev;
      // });
      // emg2Arr.push(separado[1]);
      // const innerXEmg2: any = [...Array(emg2Arr.length).keys()];
      // setDataYEmg2(emg2Arr);
      // setDataXEmg2(innerXEmg2);
    }
    if (sensoresSelected >= 3) {
      // setDataYEmg3((prev: any) => {
      //   return [...prev.slice(1), ...testData3];
      // });
      Object.assign(objectToStore, {
        emg3: [...globalData3, ...testData3],
      });
      // objectToStore.emg3 = [...globalData3, ...testData3]
      setGlobalData3([...globalData3, ...testData3]);
      setDataYEmg3(testData3.slice(-dataXEmg3.length))

      // setDataXEmg1(innerXEmg1);
      // setDataXEmg3((prev: any) => {
      //   return prev;
      // });
      // emg3Arr.push(separado[2]);
      // const innerXEmg3: any = [...Array(emg3Arr.length).keys()];
      // setDataYEmg3(emg3Arr);
      // setDataXEmg3(innerXEmg3);
    }
    if (sensoresSelected >= 4) {
      // objectToStore.emg3 = [...globalData3, ...testData3]
      // emg4Arr.push(separado[4]);
      // const innerXEmg4: any = [...Array(emg4Arr.length).keys()];
      // setDataYEmg4(emg4Arr);
      // setDataXEmg4(innerXEmg4);
    }
    appDispatch(setRealTimeSignal(objectToStore));
  // }
  }
  const auxFunc = (intervalToClean: any) => {
    console.log("About to clean");
    clearInterval(intervalToClean);
  }
  const cleanUpTimed = (intervalToClean: any) => {
    setTimeout(() => auxFunc(intervalToClean), 5000);
  }
  let timeoutID: string | number | NodeJS.Timeout | undefined;
  function iniciarIntervalo() {
    timeoutID = setTimeout(function() {
      intervalFunction();
      iniciarIntervalo(); // Vuelve a iniciar el intervalo
    }, 100); // Elige el tiempo deseado (en milisegundos) para el intervalo
  }
  function detenerIntervalo() {
    clearTimeout(timeoutID);
  }
  useEffect(() => {
    let intervalID;
    if(isReady) {
      console.log("Starting");
      // intervalID = setInterval(intervalFunction, 100);
      iniciarIntervalo();
    } else {
      console.log("unable to start");
      detenerIntervalo();
      // clearInterval(intervalID);
    }
  }, [isReady])
  async function stopSensores() {
    console.log('Getting message stop');
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
  //   // setDataYGiroscopio(arr);
  //   // setDataXGiroscopio(innerX);
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
    if(mode === "LIVE") {
      loadSensores();
    }
  }, [])
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
        dataXGiroscopio={dataXGiroscopio}
        dataYGiroscopio={dataYGiroscopio}
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
