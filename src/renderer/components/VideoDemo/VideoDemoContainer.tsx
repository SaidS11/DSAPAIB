import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import {
  setCantidadSensores,
  setGsrIsChecked,
  setFrecuenciaIsChecked,
  setAcelerometroIsChecked,
  setExtraSensorsChecked,
  setCleanAllSensors,
  setTemperaturaIsChecked,
} from '../../../redux/slices/SeñalesSlice';
import VideoDemo from './VideoDemo';
import SensoresAdquisicionContainer from '../SensoresAdquisicion/SensoresAdquisicionContainer';
import ModalSensoresAdquisicion from '../SensoresAdquisicion/ModalSensoresAdquisicion';
import { apiEndpoint } from '../Utilities/Constants';
import Button from '@mui/material/Button';
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';
import SensoresAdquisicionGraficarContainer from '../SensoresAdquisicion/SensoresAdquisicionGraficarContainer';

function parseEMG(data: string) {

  const parsedArray = JSON.parse(data.replace(/'/g, '"'));

    // Creamos un objeto para almacenar los valores
    const outputObject: any = {};

    // Iteramos sobre el array de objetos
    parsedArray.forEach((obj: any) => {
      // Obtenemos la clave y el valor del objeto
      const key = Object.keys(obj)[0];
      const value = obj[key];
      
      // Si la clave no existe en el objeto de salida, la inicializamos como un array vacío
      if (!outputObject[key]) {
        outputObject[key] = [];
      }
      
      // Agregamos el valor al array correspondiente
      outputObject[key].push(value);
    });

    // Imprimimos el objeto de salida en formato JSON
    console.log(JSON.stringify(outputObject));
    return outputObject;
}

function parseArduinoData(data: string) {
  const pares = data.split(", ");

  // Crear un objeto vacío para almacenar los datos
  const datosObjeto: any = {};

  // Iterar sobre cada par de clave y valor
  for (let i = 0; i < pares.length; i++) {
    // Separar la clave y el valor
    const [clave, valor] = pares[i].split(": ");

    // Verificar si la clave ya existe en el objeto
    if (datosObjeto.hasOwnProperty(clave)) {
      // Si la clave existe, agregar el valor al arreglo existente
      datosObjeto[clave].push(Number(valor));
    } else {
      // Si la clave no existe, crear un nuevo arreglo con el valor
      datosObjeto[clave] = [Number(valor)];
    }
  }
  return datosObjeto;
}

interface ConfLocal {
  emgs: number;
}
const VideoDemoContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const [dataIsReady, setDataIsReady] = useState(false);
  const [emgData, setEmgData] = useState({});
  const [arduino1Data, setArduino1Data] = useState({});



  const [probando, setProbando] = useState(false);
  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );
  const selectedProtocol = useCustomSelector(
    (state) => state.config.protocoloNombre
  );
  const confObj = useCustomSelector(
    (state) => state.config.configCompleta
  ) as Array<ConfLocal>;
  const cantidadEmgs = confObj[0].emgs;




  const onClickNav = async () => {
    console.log("Navigating")
    const v: HTMLVideoElement = document.getElementById("myVideo") as HTMLVideoElement;
    v!.addEventListener("loadeddata",function(ev){
      console.log("Duracion", v!.duration);
    },true);
    console.log("Duracion", v!.duration);

    // appDispatch(setCleanAllSensors(true));
    // const resp = await window.electron.ipcRenderer.sensoStop();
    // navigate('/video');
  };

  const onClickProbar = () => {
    if (probando === false) {
      setProbando(true);
    }
  };

  const onClickDetener = () => {
    if (probando === true) {
      setProbando(false);
    }
  };

  const onClickBack = () => {
    navigate('/colocacionMuestra');
  };
  const urlRetrieved = `${multimediaObj[0].link_video}`;
  const url = urlRetrieved.includes('http')
    ? urlRetrieved
    : `${apiEndpoint}/${multimediaObj[0].link_video}`;

  
  async function loadConfig() {
    appDispatch(setIsLoading(true));

    const respConf = await window.electron.ipcRenderer.selectCN(
      selectedProtocol
    );
    console.log('respconf', respConf[0].configuracion);
    const resp = await window.electron.ipcRenderer.selectCD(
      respConf[0].configuracion
    );
    console.log('this is config', resp);
    const { gsr } = resp[0];
    const { frecuencia_cardiaca } = resp[0];
    const { acelerometro } = resp[0];
    const { temperatura } = resp[0];

    console.log(
      `This is config EMGS: ${cantidadEmgs}, gsr ${gsr}, frecuencia_cardiaca ${frecuencia_cardiaca}, acelerometro ${acelerometro} temperatura ${temperatura}`
    );
    appDispatch(setCantidadSensores(cantidadEmgs));
    appDispatch(setGsrIsChecked(gsr));
    appDispatch(setAcelerometroIsChecked(acelerometro));
    appDispatch(setFrecuenciaIsChecked(frecuencia_cardiaca));
    appDispatch(setTemperaturaIsChecked(temperatura));

    appDispatch(
      setExtraSensorsChecked([gsr, acelerometro, frecuencia_cardiaca])
    );
    appDispatch(setIsLoading(false));

    return resp;
  }
  useEffect(() => {
    loadConfig();
    appDispatch(setCleanAllSensors(true));
  }, []);

  const [baudSelected, setBaudSelected] = useState(9600);
  const [portSelected, setPortSelected] = useState('');

  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    if (portSelected !== '' && baudSelected !== 0) {
      setOpen(!open);
      // setIsReady(true);
      window.Bridge.loadPort(portSelected, baudSelected);
      // window.Bridge.sensoresNewTest()
    } else {
      // Sustituir con modal de error
      alert('Seleccione una cantidad');
    }
  };

  const sensoresSelected = 4;
  

  const onClickStart = async () => {
    const startArduinos = fetch(`${apiEndpoint}/multiplesArduinos`);
    const startNidaq = await fetch(`${apiEndpoint}/nidaq?duracion=10&cantidadEmgs=4`);

    const data = await startNidaq.json();

    if(data.message !== null) {
      console.log("READY", data.message);
      stopArduinos();
    }

    // if(cantidadEmgs > 0) {
    //   const test = "[{'EMG1': 0}, {'EMG2': 1}, {'EMG3': 2}, {'EMG4': 3}, {'EMG1': 1}, {'EMG2': 2}, {'EMG3': 3}, {'EMG4': 4}, {'EMG1': 5}, {'EMG2': 6}, {'EMG3': 7}, {'EMG4': 8}]"      
    //   setEmgData(parseEMG(test));
    //   console.log("EMG", emgData);
    // }
    
    // const cantidadDeArduinos = 2;
    // let objetoArduino = {};
    // if (cantidadDeArduinos >= 1) {
    //   const arduino1Data: string = "HRLM: 120, TC: 30, GSR: 15, HRLM: 123, TC: 38, GSR: 25, HRLM: 130, TC: 40, GSR: 35";
    //   const returnObj = parseArduinoData(arduino1Data)
    //   objetoArduino = {...objetoArduino, ...returnObj};
    // }
    // if (cantidadDeArduinos >= 2) {
    //   const arduino2Data = "INCLX: 120, INCLY: 30, INCLZ: 15, INCLX: 123, INCLY: 38, INCLZ: 25, INCLX: 130, INCLY: 40, INCLZ: 35";
    //   const returnObj = parseArduinoData(arduino2Data)
    //   objetoArduino = {...objetoArduino, ...returnObj};
    // }
    // setArduino1Data(objetoArduino);
    // setDataIsReady(true);
  };

  const stopArduinos = async () => {
    console.log("Stopping");
    const stopArduinos = await fetch(`${apiEndpoint}/stopArduinos`);
    const arduinoSTOP = await stopArduinos.json();

    console.log("ARDUINO STOP", arduinoSTOP.message);

    const cantidadDeArduinos = 2;
    let objetoArduino = {};
    if (cantidadDeArduinos >= 1) {
      const arduino1Data: string = "HRLM: 120, TC: 30, GSR: 15, HRLM: 123, TC: 38, GSR: 25, HRLM: 130, TC: 40, GSR: 35";
      const returnObj = parseArduinoData(arduino1Data)
      objetoArduino = {...objetoArduino, ...returnObj};
    }
    if (cantidadDeArduinos >= 2) {
      const arduino2Data = "INCLX: 120, INCLY: 30, INCLZ: 15, INCLX: 123, INCLY: 38, INCLZ: 25, INCLX: 130, INCLY: 40, INCLZ: 35";
      const returnObj = parseArduinoData(arduino2Data)
      objetoArduino = {...objetoArduino, ...returnObj};
    }

    console.log("OBJ", objetoArduino);

    
  };

  return (
    <div>
      <VideoDemo
        onClickNav={onClickNav}
        url={url}
        onClickBack={onClickBack}
        probando={probando}
      />
      {open && (
        <ModalSensoresAdquisicion
          toggleModal={toggleModal}
          open={open}
          setPortSelected={setPortSelected}
          setBaudSelected={setBaudSelected}
        />
      )}
      <section className="display-center">
        <h3>
          Para probar si los sensores funcionan correctamente presione Comenzar
        </h3>
        <Button
          sx={styleButtonBiggerGreen}
          style={{ fontSize: '20px' }}
          onClick={onClickStart}
        >
          Comenzar
        </Button>
      </section>
      {dataIsReady && ( <SensoresAdquisicionGraficarContainer cantidadEmgs={cantidadEmgs} emgData={emgData} arduino1Data={arduino1Data} />)}
      {/* <SensoresAdquisicionContainer mode="TEST" shouldStop={false} /> */}
      <br />
    </div>
  );
};

export default VideoDemoContainer;
