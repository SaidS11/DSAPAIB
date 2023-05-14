import { useEffect, useState } from 'react';
import { useCustomDispatch } from 'redux/hooks';
import { setIsLoading } from 'redux/slices/StatusSlice';
import ModalSensores from './ModalSensores';
import ProbarSensores from './ProbarSensores';

const ProbarSensoresContainer = () => {
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const onClickAdd = () => {};
  const [dataXGiroscopio, setDataXGiroscopio] = useState([]);
  const [dataYGiroscopio, setDataYGiroscopio] = useState([]);

  const [dataXFrecuencia, setDataXFrecuencia] = useState([]);
  const [dataYFrecuencia, setDataYFrecuencia] = useState([]);

  const [dataXAcelerometro, setDataXAcelerometro] = useState([]);
  const [dataYAcelerometro, setDataYAcelerometro] = useState([]);

  const [dataXEmg1, setDataXEmg1] = useState([]);
  const [dataYEmg1, setDataYEmg1] = useState([]);

  const [dataXEmg2, setDataXEmg2] = useState([]);
  const [dataYEmg2, setDataYEmg2] = useState([]);

  const [dataXEmg3, setDataXEmg3] = useState([]);
  const [dataYEmg3, setDataYEmg3] = useState([]);

  const [dataXEmg4, setDataXEmg4] = useState([]);
  const [dataYEmg4, setDataYEmg4] = useState([]);


  const arr: any = [];
  const [sensoresSelected, setSensoresSelected] = useState(0);
  const [baudSelected, setBaudSelected] = useState(0);

  const [portSelected, setPortSelected] = useState('');

  const appDispatch = useCustomDispatch();
  const [open, setOpen] = useState(true);
  const toggleModal = () => {
    if (sensoresSelected !== 0 && portSelected !== '' && baudSelected !== 0) {
      setOpen(!open);
      window.Bridge.loadPort(portSelected, baudSelected)
      window.Bridge.sensoresNewTest()
    } else {
      alert('Seleccione una cantidad');
    }
  };
  console.log("Amount and port, and baud", sensoresSelected, portSelected, baudSelected);

  async function stopSensoresNew() {
    window.Bridge.sensoresStopNewTest();
  }
  window.Bridge.sensoStopNewTest((event: any, resp: any) => {
    console.log("After stop");
  });
  
  const onClickStopNew = () => {
    stopSensoresNew()
  }

// Procesamiento de la señal
  let bufferdatos = '';
  let latidos = 0;
  let HR = 0;
  let buffer = ''
  let sum = 0;
  let sumSpo2 = 0;
  let giroscopioAverage = 0;
  let hr = 0;
  let volt = 0;
  let hrOhms = 0;
  let Impedancia = 0;
  let contador = 0;
  let contadorFrecuencia = 0;
  let DCIR = 0;
  let ACIR = 0;
  let contadorFrecuenciaRED = 0;
  let sumFrecuenciaRED = 0;
  let DCRED = 0;
  let ACRED = 0;
  let Aoyagi = 0;
  let frecuencia = 0; 
  const emg1Arr: any = [];
  const emg2Arr: any = [];
  const emg3Arr: any = [];
  const emg4Arr: any =[];

  const giroscopioArr : any = [];
  const frecuenciaArr : any = [];
  const acelerometroArr : any = [];
  async function startSensors() {
      window.Bridge.sensoresNewTest()
  }
  window.Bridge.sensoNewTest((event: any, resp: any) => {
    const data = resp
    console.log("data", data)
    bufferdatos = data;
    const decode = decodeURIComponent(bufferdatos) 
    const separado = decode.split(',')

    if(separado.length>=5){
        if(separado.length===6){
            separado.pop()
            if(separado.includes('')){
            }
            else {
                console.log('SSSSSSSSSS',separado)
                sum = 0;
                giroscopioAverage = 0;
                hr = 0;
                 contador+=1;
                 sum = sum + parseInt(separado[2]);
                 if (contador>=10){
                   // console.log('entre',sum)
                    contador = 0;
                    giroscopioAverage = sum / 10;
                    volt = (giroscopioAverage*5)/1023;
                    console.log("Giroscopio Average", giroscopioAverage);
                    //hr = ((1024+2*giroscopioAverage)*1000) / (512-giroscopioAverage);
                    hrOhms = ((5+2*volt)*10000) / (2.5-volt);
                    // Conductancia = 1/hrOhms;
                    console.log("GSR Ohms", hrOhms);
                    console.log("Impedancia",Impedancia);
                    console.log('Acelerometro:', parseFloat(separado[1]));
                    giroscopioArr.push(hrOhms)
                    acelerometroArr.push(separado[1])
                    sum = 0;
                 }

                 contadorFrecuencia+=1;
                 
                 if (contadorFrecuencia>=10){
                    sumSpo2 = sumSpo2 + parseInt(separado[3]);
                    //console.log('entre',sumSpo2)
                    contadorFrecuencia = 0;
                    DCIR = sumSpo2/10;
                    ACIR = sumSpo2 - DCIR;
                    sumSpo2 = 0;
                 }

                 contadorFrecuenciaRED+=1;
                 
                 if (contadorFrecuenciaRED>=10){
                    sumFrecuenciaRED = sumFrecuenciaRED + parseInt(separado[4]);
                    //console.log('entre',sumFrecuenciaRED)
                    contadorFrecuenciaRED = 0;
                    DCRED = sumFrecuenciaRED/10;
                    ACRED = sumFrecuenciaRED - DCIR;
                    sumFrecuenciaRED = 0;
                    Aoyagi = (ACRED/DCRED)/(ACIR/DCIR);
                    frecuencia = 110 - (25*Aoyagi);
                    console.log("frecuencia", frecuencia);
                    frecuenciaArr.push(frecuencia)
                 }

            }
            const innerXGiroscopio: any = [...Array(giroscopioArr.length).keys()];
            setDataYGiroscopio(giroscopioArr);
            setDataXGiroscopio(innerXGiroscopio);

            const innerXFrecuencia: any = [...Array(frecuenciaArr.length).keys()];
            setDataYFrecuencia(frecuenciaArr);
            setDataXFrecuencia(innerXFrecuencia);

            const innerXAcelerometro: any = [...Array(acelerometroArr.length).keys()];
            setDataYAcelerometro(acelerometroArr);
            setDataXAcelerometro(innerXAcelerometro);
        }
        else {
            //console.log('NNNNNNNNN',separado)
        }
    }
    
  });

  const onClickStartNew = () => {
    startSensors()
  }

// Fin procesamiento

  async function loadSensores() {
    console.log('Getting message');
    window.Bridge.sensores();
  }
  window.Bridge.senso((event: any, resp: any) => {
    // console.log("Los arreglos", dataXGiroscopio);
    arr.push(resp);
    // console.log("Los arreglos 2", dataYGiroscopio);
    // const numY = dataYGiroscopio.at(-1) + 1;
    // setDataXGiroscopio(dataXGiroscopio.concat(parseInt(resp)));
    // setDataYGiroscopio(dataYGiroscopio.concat(numY));
    // let buffer = '';
    // let sum = 0;
    // let giroscopioAverage = 0;
    // let hr = 0;
    // for (let i = 0; i < 10; i++) {
    //   buffer = '';
    //   buffer += resp;
    //   console.log(buffer);
    //   sum += parseInt(buffer);
    // }
    // giroscopioAverage = sum / 10;
    // console.log('Giroscopio Average', giroscopioAverage);
    // hr = ((1024 + 2 * giroscopioAverage) * 1000) / (512 - giroscopioAverage);
    // console.log('GSR', hr);
  });

  async function stopSensores() {
    console.log('Getting message stop');
    window.Bridge.sensoresStop();
  }
  window.Bridge.sensoStop((event: any, resp: any) => {
    appDispatch(setIsLoading(true));
    console.log(resp);
    console.log('This was collected', arr);
    const innerX: any = [...Array(arr.length).keys()];
    console.log('Inner', innerX);
    setDataYGiroscopio(arr);
    setDataXGiroscopio(innerX);
    appDispatch(setIsLoading(false));
  });
  const onClickStart = () => {
    loadSensores();
  };
  const onClickStop = async () => {

    stopSensores();
  };
  
  console.log('Seleccionados', sensoresSelected);
  
  return (
    <div>
      <ProbarSensores
        sensoresSelected={sensoresSelected}
        onClickStart={onClickStart}
        onClickStop={onClickStop}
        dataXGiroscopio={dataXGiroscopio}
        dataYGiroscopio={dataYGiroscopio}
        dataXFrecuencia={dataXFrecuencia}
        dataYFrecuencia={dataYFrecuencia}
        dataXAcelerometro={dataXAcelerometro}
        dataYAcelerometro={dataYAcelerometro}
        onClickStopNew={onClickStopNew}
        onClickStartNew={onClickStartNew}
      />
      {open && (
        <ModalSensores
          toggleModal={toggleModal}
          open={open}
          setSensoresSelected={setSensoresSelected}
          setPortSelected={setPortSelected}
          setBaudSelected={setBaudSelected}
        />
      )}
    </div>
  );
};

export default ProbarSensoresContainer;
