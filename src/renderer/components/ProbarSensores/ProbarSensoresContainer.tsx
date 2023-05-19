import { useEffect, useState } from 'react';
import { useCustomDispatch } from 'redux/hooks';
import { setIsLoading } from 'redux/slices/StatusSlice';
import ModalSensores from './ModalSensores';
import ProbarSensores from './ProbarSensores';

const ProbarSensoresContainer = () => {
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
  const [dataYEmg1, setDataYEmg1] = useState<any>([...startingNumbers]);
  useEffect(() => {
    const interval = setInterval(() => {
      // setData((prev: any) => {
      //   return {
      //     x: prev.x,
      //     y: [...prev.y.slice(1), Math.floor(Math.random() * count)]
      //   };
      // });
      setDataXEmg1((prev: any) => {
        return prev;
      });
      setDataYEmg1((prev: any) => {
        return [...prev.slice(1), Math.floor(Math.random() * count)];
      });
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [isReady]);

  const [dataXEmg2, setDataXEmg2] = useState([]);
  const [dataYEmg2, setDataYEmg2] = useState<any>([]);

  const [dataXEmg3, setDataXEmg3] = useState([]);
  const [dataYEmg3, setDataYEmg3] = useState<any>([]);

  const [dataXEmg4, setDataXEmg4] = useState([]);
  const [dataYEmg4, setDataYEmg4] = useState([]);

  const arr: any = [];
  const [sensoresSelected, setSensoresSelected] = useState(0);
  const [baudSelected, setBaudSelected] = useState(9600);

  const [portSelected, setPortSelected] = useState('');

  const appDispatch = useCustomDispatch();
  const [open, setOpen] = useState(true);
  const toggleModal = () => {
    if (sensoresSelected !== 0 && portSelected !== '' && baudSelected !== 0) {
      setOpen(!open);
      setIsReady(true);
      window.Bridge.loadPort(portSelected, baudSelected);
      // window.Bridge.sensoresNewTest()
    } else {
      alert('Seleccione una cantidad');
    }
    console.log(
      'Amount and port, and baud',
      sensoresSelected,
      portSelected,
      baudSelected
    );
  };

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
  // window.Bridge.sensoNewTest((event: any, resp: any) => {
  //   console.log("Flowing")

  //   const data = resp
  //   console.log("data", data)
  //   bufferdatos = data;
  //   const decode = decodeURIComponent(bufferdatos)
  //   const separado = decode.split(',')

  //   if(separado.length >= sensoresSelected) {
  //     if (emg1Arr.length >= 3) {
  //       emg1Arr.splice(0);
  //       emg2Arr.splice(0);
  //       emg3Arr.splice(0);
  //     }
  //     if (sensoresSelected >= 1) {
  //       emg1Arr.push(separado[0]);
  //       const innerXEmg1: any = [...Array(separado.length).keys()];
  //       setDataXEmg1([]);
  //       setDataYEmg1(innerXEmg1);
  //     }
  //     if (sensoresSelected >= 2) {
  //       emg2Arr.push(separado[1]);
  //       const innerXEmg2: any = [...Array(separado.length).keys()];
  //       setDataXEmg1(emg2Arr);
  //       setDataYEmg1(innerXEmg2);
  //     }
  //     if (sensoresSelected >= 3) {
  //       emg3Arr.push(separado[2]);
  //       const innerXEmg3: any = [...Array(separado.length).keys()];
  //       setDataXEmg1(emg3Arr);
  //       setDataYEmg1(innerXEmg3);
  //     }
  //     if (sensoresSelected >= 4) {
  //       emg4Arr.push(separado[4]);
  //       const innerXEmg4: any = [...Array(emg4Arr.length).keys()];
  //       setDataXEmg1(emg4Arr);
  //       setDataYEmg1(innerXEmg4);
  //     }
  //   }
  //   // if(separado.length>=5){
  //   //     if(separado.length===6){
  //   //         separado.pop()
  //   //         if(separado.includes('')){
  //   //         }
  //   //         else {
  //   //             console.log('SSSSSSSSSS',separado)
  //   //             sum = 0;
  //   //             giroscopioAverage = 0;
  //   //             hr = 0;
  //   //              contador+=1;
  //   //              sum = sum + parseInt(separado[2]);
  //   //              if (contador>=10){
  //   //                // console.log('entre',sum)
  //   //                 contador = 0;
  //   //                 giroscopioAverage = sum / 10;
  //   //                 volt = (giroscopioAverage*5)/1023;
  //   //                 console.log("Giroscopio Average", giroscopioAverage);
  //   //                 //hr = ((1024+2*giroscopioAverage)*1000) / (512-giroscopioAverage);
  //   //                 hrOhms = ((5+2*volt)*10000) / (2.5-volt);
  //   //                 // Conductancia = 1/hrOhms;
  //   //                 console.log("GSR Ohms", hrOhms);
  //   //                 console.log("Impedancia",Impedancia);
  //   //                 console.log('Acelerometro:', parseFloat(separado[1]));
  //   //                 giroscopioArr.push(hrOhms)
  //   //                 acelerometroArr.push(separado[1])
  //   //                 sum = 0;
  //   //              }

  //   //              contadorFrecuencia+=1;

  //   //              if (contadorFrecuencia>=10){
  //   //                 sumSpo2 = sumSpo2 + parseInt(separado[3]);
  //   //                 //console.log('entre',sumSpo2)
  //   //                 contadorFrecuencia = 0;
  //   //                 DCIR = sumSpo2/10;
  //   //                 ACIR = sumSpo2 - DCIR;
  //   //                 sumSpo2 = 0;
  //   //              }

  //   //              contadorFrecuenciaRED+=1;

  //   //              if (contadorFrecuenciaRED>=10){
  //   //                 sumFrecuenciaRED = sumFrecuenciaRED + parseInt(separado[4]);
  //   //                 //console.log('entre',sumFrecuenciaRED)
  //   //                 contadorFrecuenciaRED = 0;
  //   //                 DCRED = sumFrecuenciaRED/10;
  //   //                 ACRED = sumFrecuenciaRED - DCIR;
  //   //                 sumFrecuenciaRED = 0;
  //   //                 Aoyagi = (ACRED/DCRED)/(ACIR/DCIR);
  //   //                 frecuencia = 110 - (25*Aoyagi);
  //   //                 console.log("frecuencia", frecuencia);
  //   //                 frecuenciaArr.push(frecuencia)
  //   //              }

  //   //         }
  //   //         const innerXGiroscopio: any = [...Array(giroscopioArr.length).keys()];
  //   //         setDataYGiroscopio(giroscopioArr);
  //   //         setDataXGiroscopio(innerXGiroscopio);

  //   //         const innerXFrecuencia: any = [...Array(frecuenciaArr.length).keys()];
  //   //         setDataYFrecuencia(frecuenciaArr);
  //   //         setDataXFrecuencia(innerXFrecuencia);

  //   //         const innerXAcelerometro: any = [...Array(acelerometroArr.length).keys()];
  //   //         setDataYAcelerometro(acelerometroArr);
  //   //         setDataXAcelerometro(innerXAcelerometro);
  //   //     }
  //   //     else {
  //   //         //console.log('NNNNNNNNN',separado)
  //   //     }
  //   // }

  // });

  const onClickStartNew = async () => {
    await startSensors();
  };

  // Fin procesamiento

  async function loadSensores() {
    console.log('Getting message');
    // setIsReady(true);
    window.Bridge.sensores();
  }
  // const [data, setData] = useState('');
  // let data = '';
  const [datosAux, setDatosAux] = useState<Array<string>>([]);
  const testData: Array<string> = [...datosAux];
  window.Bridge.senso((event: any, resp: any) => {
    // console.log(resp);
    // setData(resp);
    // console.log("Flowing")

    const data = resp;
    // console.log("data", data)
    bufferdatos = data;
    const decode = decodeURIComponent(bufferdatos);
    const separado = decode.split(',');
    if (separado.length >= sensoresSelected) {
      testData.push(separado[0]);
      console.log('Data', testData);
      // if (emg1Arr.length >= 4) {
      //   console.log("Cleaning")
      //   // emg1Arr.splice(0);
      //   // emg2Arr.splice(0);
      //   // emg3Arr.splice(0);
      // }
      // console.log("leng", separado.length)
      // if (sensoresSelected >= 1) {
      //   // emg1Arr.push(separado[0]);
      //   // const testArr: any = [];
      //   // const testArr: any = [...dataXEmg1];
      //   // testArr.push(separado[0]);
      //   console.log("Emg arr", dataXEmg1);
      //   const innerXEmg1: any = [...Array(dataXEmg1.length).keys()];
      //   // console.log("Inner x", innerXEmg1);
      //   setDataXEmg1(innerXEmg1);
      //   setDataYEmg1([...dataXEmg1, separado[0]]);
      // }
      // if (sensoresSelected >= 2) {
      //   emg2Arr.push(separado[1]);
      //   // const testArr2: any = [...dataXEmg2];
      //   // testArr2.push(separado[1]);
      //   const innerXEmg2: any = [...Array(emg2Arr.length).keys()];
      //   setDataXEmg2(innerXEmg2);
      //   setDataYEmg2(emg2Arr);
      // }
      // if (sensoresSelected >= 3) {
      //   emg3Arr.push(separado[2]);
      //   // const testArr3: any = [...dataXEmg3];
      //   // testArr3.push(separado[2]);
      //   const innerXEmg3: any = [...Array(emg3Arr.length).keys()];
      //   setDataXEmg3(innerXEmg3);
      //   setDataYEmg3(emg3Arr);
      // }
      // if (sensoresSelected >= 4) {
      //   emg4Arr.push(separado[3]);
      //   const innerXEmg4: any = [...Array(emg4Arr.length).keys()];
      //   setDataXEmg4(innerXEmg4);
      //   setDataYEmg4(emg4Arr);
      // }
    }
    if (testData.length % 15 === 0) {
      console.log('UPDATINGGGG');
      // setDatosAux([...testData]);
      setIsReady(true);
    }
  });

  // const intervalFunction = setInterval(function(){
  //   if (!isReady) {
  //     console.log("Nothing to do")
  //     return;
  //   }
  //   console.log("Updating interval", data);
  //   bufferdatos = data;
  //   const decode = decodeURIComponent(bufferdatos)
  //   const separado = decode.split(',')

  //   if(separado.length >= sensoresSelected) {
  //     if (sensoresSelected >= 1) {
  //       emg1Arr.push(separado[0]);
  //       const innerXEmg1: any = [...Array(emg1Arr.length).keys()];
  //       // console.log("Lenght", emg1Arr.length);
  //       // console.log("Inner X", innerXEmg1);
  //       setDataYEmg1(emg1Arr);
  //       setDataXEmg1(innerXEmg1);
  //     }
  //     if (sensoresSelected >= 2) {
  //       emg2Arr.push(separado[1]);
  //       const innerXEmg2: any = [...Array(emg2Arr.length).keys()];
  //       setDataYEmg2(emg2Arr);
  //       setDataXEmg2(innerXEmg2);
  //     }
  //     if (sensoresSelected >= 3) {
  //       emg3Arr.push(separado[2]);
  //       const innerXEmg3: any = [...Array(emg3Arr.length).keys()];
  //       setDataYEmg3(emg3Arr);
  //       setDataXEmg3(innerXEmg3);
  //     }
  //     if (sensoresSelected >= 4) {
  //       emg4Arr.push(separado[4]);
  //       const innerXEmg4: any = [...Array(emg4Arr.length).keys()];
  //       setDataYEmg4(emg4Arr);
  //       setDataXEmg4(innerXEmg4);
  //     }
  //   }
  // }, 400)

  async function stopSensores() {
    console.log('Getting message stop');
    setIsReady(false);
    console.log('FInal', datosAux);
    // clearInterval(intervalFunction);
    window.Bridge.sensoresStop();
  }
  window.Bridge.sensoStop((event: any, resp: any) => {
    // appDispatch(setIsLoading(true));
    // console.log(resp);
    // console.log('This was collected', arr);
    // const innerX: any = [...Array(arr.length).keys()];
    // console.log('Inner', innerX);
    // setDataYGiroscopio(arr);
    // setDataXGiroscopio(innerX);
    // appDispatch(setIsLoading(false));
  });

  const onClickStart = async () => {
    await loadSensores();
  };
  const onClickStop = async () => {
    await stopSensores();
  };

  return (
    <div>
      <ProbarSensores
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
      {/* {open && (
        <ModalSensores
          toggleModal={toggleModal}
          open={open}
          setSensoresSelected={setSensoresSelected}
          setPortSelected={setPortSelected}
          setBaudSelected={setBaudSelected}
        />
      )} */}
    </div>
  );
};

export default ProbarSensoresContainer;
