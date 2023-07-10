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
import { apiEndpoint, ardMessage } from '../Utilities/Constants';
import Button from '@mui/material/Button';
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';
import SensoresAdquisicionGraficarContainer from '../SensoresAdquisicion/SensoresAdquisicionGraficarContainer';
import { setDuracionProtocolo } from 'redux/slices/ConfiguracionSlice';

function parseEMG(arreglo: Array<Object>) {

  const nuevoObjeto: any = {};

  for (let i = 0; i < arreglo.length; i++) {
    const objeto: any = arreglo[i];
    
    for (const clave in objeto) {
      if (nuevoObjeto.hasOwnProperty(clave)) {
        nuevoObjeto[clave].push(objeto[clave]);
      } else {
        nuevoObjeto[clave] = [objeto[clave]];
      }
    }
  }

  return nuevoObjeto;
}

async function calcularValorCorrectoGsr(arreglo: Array<number>) {
  const nuevoArreglo = [];

  for (let i = 0; i < arreglo.length; i += 10) {
    const grupo = arreglo.slice(i, i + 10); // Obtener un grupo de 10 posiciones

    const gsrAverage  = grupo.reduce((a, b) => a + b, 0) / grupo.length; // Calcular el promedio
    const volt = (gsrAverage*5)/1023;
    const hrOhms = ((5+2*volt)*10000) / (2.5-volt);
    nuevoArreglo.push(hrOhms); // Agregar el resultado al nuevo arreglo
  }

  console.log("RETURNED", nuevoArreglo);
  return nuevoArreglo;
}


function parseArduinoData(arreglo: any) {
  const objetoTransformado: any = {};

  // Iterar sobre cada elemento del arreglo
  for (let i = 0; i < arreglo.length; i++) {
    // Eliminar espacios en blanco y dividir el elemento en pares de clave y valor
    const pares = arreglo[i].trim().split(", ");

    // Iterar sobre cada par de clave y valor
    for (let j = 0; j < pares.length; j++) {
      // Separar la clave y el valor
      const [clave, valor] = pares[j].split(": ");
      // Verificar si la clave ya existe en el objeto
      if (objetoTransformado.hasOwnProperty(clave)) {
        // Si la clave existe, agregar el valor al arreglo existente
        if(valor.includes(",")) {
          const correctValue = valor.split(",")[0];
          objetoTransformado[clave].push(Number(correctValue));

        } else {

          objetoTransformado[clave].push(Number(valor));
        }
      } else {
        // Si la clave no existe, crear un nuevo arreglo con el valor
        if(valor.includes(",")) {
          const correctValue = valor.split(",")[0];
          objetoTransformado[clave] = [Number(correctValue)];
        } else {
          objetoTransformado[clave] = [Number(valor)];
        }
      }
    }
  }
  return objetoTransformado;
}

interface ConfLocal {
  emgs: number;
  acelerometro: boolean
  gsr: boolean
  temperatura: boolean
  frecuencia_cardiaca: boolean
}

const VideoDemoContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const [dataIsReady, setDataIsReady] = useState(false);
  const [emgData, setEmgData] = useState({});
  const [arduinoDataArg, setArduinoDataArg] = useState({});
  const [probando, setProbando] = useState(false);
  const [baudSelected, setBaudSelected] = useState(9600);
  const [portSelected, setPortSelected] = useState('');
  const [baudSelected2, setBaudSelected2] = useState(9600);
  const [portSelected2, setPortSelected2] = useState('');
  const [open, setOpen] = useState(false);
  const [cantidadArduinos, setCantidadArduinos] = useState(0);

  const[bloqueoDeBoton, setBloqueoDeBoton] = useState(false);



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

    appDispatch(setDuracionProtocolo(v!.duration));

    appDispatch(setCleanAllSensors(true));
    // const resp = await window.electron.ipcRenderer.sensoStop();
    navigate('/video');
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
    const { arduinos } = resp[0];
    setCantidadArduinos(arduinos);


    console.log(
      `This is config EMGS: ${cantidadEmgs}, gsr ${gsr}, frecuencia_cardiaca ${frecuencia_cardiaca}, acelerometro ${acelerometro} temperatura ${temperatura} y ${arduinos}`
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


  const toggleModal = () => {
    if (cantidadArduinos > 1){
      if ((portSelected !== '' && baudSelected !== 0) && (portSelected2 !== '' && baudSelected2 !== 0)) {
        if(portSelected !== portSelected2) {
          setOpen(!open);
          // setIsReady(true);
          window.Bridge.loadMultiplePorts(portSelected, baudSelected, portSelected2, baudSelected2);
        } else {
          alert('Seleccione puertos distintos')
        }
        // window.Bridge.sensoresNewTest()
      } else {
        // Sustituir con modal de error
        alert('Seleccione una cantidad');
      }
    } else {
      if (portSelected !== '' && baudSelected !== 0) {
          setOpen(!open);
          // setIsReady(true);
          window.Bridge.loadPort(portSelected, baudSelected);
        // window.Bridge.sensoresNewTest()
      } else {
        // Sustituir con modal de error
        alert('Seleccione una cantidad');
      }
    }
  };

 
  const onClickStart = async () => {
    setBloqueoDeBoton(true);
    const startArduinos = fetch(`${apiEndpoint}/multiplesArduinos`);
    // Comprobacion de emgs sino hay timer para controlar arduinos
    const startNidaq = await fetch(`${apiEndpoint}/nidaq?duracion=16&cantidadEmgs=4`);

    const data = await startNidaq.json();

    if(data.message !== null) {
      console.log("READY", data.message);
      stopArduinos();
    }

    // TESTS

    

    // let returnedEmg;

    // if(cantidadEmgs > 0) {
    //   const objFromCsv = await fetch(`${apiEndpoint}/obtenerObjDeCsv`);

    //   const dataEmg = await objFromCsv.json()

    //   // console.log("RESP", dataEmg.message);

    //   // setEmgData(parseEMG(test));
    //   returnedEmg = parseEMG(dataEmg.message)
    //   // console.log("EMG", returnedEmg);
    // }
    // // console.log("Objeto completo", ardMessage);
    // const nuevoGsr =  await calcularValorCorrectoGsr(ardMessage.GSR);
    // // console.log("Antes", ardMessage.GSR);
    // // console.log("NUEVO", nuevoGsr);
    // ardMessage.GSR = nuevoGsr

    // const objetoAdquirido = {...returnedEmg, ...ardMessage}

    // console.log("OBJETO FINAL", objetoAdquirido);

    // const objWrapper = {
    //   signals: objetoAdquirido
    // }

    // console.log("Wrapped OBJ", objWrapper);


    // setArduinoDataArg(ardMessage);
    // setEmgData(returnedEmg);
    // setDataIsReady(true);
  };

  const stopArduinos = async () => {
    setBloqueoDeBoton(false);

    console.log("Stopping");
    const stopArduinos = await fetch(`${apiEndpoint}/stopArduinos`);
    const arduinoSTOP = await stopArduinos.json();

    console.log("ARDUINO STOP", arduinoSTOP.message);

    const arreglo = arduinoSTOP.message

    
    // Comprobacion de cual arduino tiene las claves que nos interesan para aplicarle los metodos correspondientes

    if (cantidadArduinos > 1) {
      console.log("Mas de 1 arduino");
      const encontrado = arreglo[0].some((elemento: string) => elemento.includes("INCLY"));

      let arregloArduinoConAcelerometro;
      let arregloArduinoSinAcelerometro;

      if(encontrado) {
        arregloArduinoConAcelerometro = arreglo[0];
        arregloArduinoSinAcelerometro = arreglo[1];
      } else {
        arregloArduinoConAcelerometro = arreglo[1];
        arregloArduinoSinAcelerometro = arreglo[0];
      }

      const registrosCompletos = arregloArduinoSinAcelerometro.filter((registro: string) => {
        const formatoCompleto = /\bHRLM: \d+, TC: \d+\.\d+, GSR: \d+\b/;
        return formatoCompleto.test(registro);
      });
  
  
      const registrosCompletos2 = arregloArduinoConAcelerometro.filter((registro: string) => {
        const formatoCompleto = /INCLX: -?\d+(?:\.\d+)?, INCLY: -?\d+(?:\.\d+)?, INCLZ: -?\d+(?:\.\d+)?/;
        return formatoCompleto.test(registro);
      });
  
      
      // Combinacion de ambos arduinos para guardar las señales posteriormente
      let objetoArduinoMultiple: any = {};
      // Objeto con los datos del primer Arduino 
      let objetoArduino1;
      // Objeto con los datos del segundo Arduino 
      let objetoArduino2;
  
      if (cantidadArduinos >= 1) {
        const arduino1Data = registrosCompletos;
        const returnObj = parseArduinoData(arduino1Data)

        const nuevoGsr = calcularValorCorrectoGsr(returnObj.GSR)

        returnObj.GSR = nuevoGsr
        objetoArduino1 = returnObj;
        objetoArduinoMultiple = {...objetoArduinoMultiple, ...returnObj};
      }
      if (cantidadArduinos >= 2) {
        const arduino2Data = registrosCompletos2;
        const returnObj = parseArduinoData(arduino2Data)
        objetoArduino2 = returnObj;
        objetoArduinoMultiple = {...objetoArduinoMultiple, ...returnObj};
      }
  
  
      // Limpieza de claves no permitidas
      const posiblesClaves = ['INCLX', 'INCLY', 'INCLZ', 'HRLM', 'TC', 'GSR']
    
      // Obtener las claves del objeto
      const clavesObjeto = Object.keys(objetoArduinoMultiple);
  
      // Iterar sobre las claves del objeto
      for (let clave of clavesObjeto) {
        // Verificar si la clave no está en el arreglo
        if (!posiblesClaves.includes(clave)) {
          // Eliminar la clave y su valor asociado del objeto
          delete objetoArduinoMultiple[clave];
        }
      }
  
      const clavesObjetoArduino1 = Object.keys(objetoArduino1);
  
      // Iterar sobre las claves del objeto
      for (let clave of clavesObjetoArduino1) {
        // Verificar si la clave no está en el arreglo
        if (!posiblesClaves.includes(clave)) {
          // Eliminar la clave y su valor asociado del objeto
          delete objetoArduino1[clave];
        }
      }
  
      const clavesObjetoArduino2 = Object.keys(objetoArduino2);
  
      // Iterar sobre las claves del objeto
      for (let clave of clavesObjetoArduino2) {
        // Verificar si la clave no está en el arreglo
        if (!posiblesClaves.includes(clave)) {
          // Eliminar la clave y su valor asociado del objeto
          delete objetoArduino2[clave];
        }
      }
  
      console.log("OBJ", objetoArduinoMultiple);
  
      const insertImplementacion = await fetch(`${apiEndpoint}/generarCsv?nombre=${"arduino1Data.csv"}`, {
        method: 'POST',
        body: JSON.stringify(objetoArduino1),
        headers: {'Content-Type': 'application/json'}
      });
  
      const insertImplementacion2 = await fetch(`${apiEndpoint}/generarCsv?nombre=${"arduino2Data.csv"}`, {
        method: 'POST',
        body: JSON.stringify(objetoArduino2),
        headers: {'Content-Type': 'application/json'}
      });

      let returnedEmg;

      if(cantidadEmgs > 0) {
        const objFromCsv = await fetch(`${apiEndpoint}/obtenerObjDeCsv`);

        const dataEmg = await objFromCsv.json()

        console.log("RESP", dataEmg.message);

        // setEmgData(parseEMG(test));
        returnedEmg = parseEMG(dataEmg.message)
        console.log("EMG", returnedEmg);
      }

      const objetoAdquirido = {...returnedEmg, ...ardMessage}

      console.log("OBJETO FINAL", objetoAdquirido);

      const objWrapper = {
        signals: objetoAdquirido
      }

      console.log("Wrapped OBJ", objWrapper);

      setArduinoDataArg(objetoArduinoMultiple);
      setEmgData(returnedEmg);
      setDataIsReady(true);

    } 

    else if (confObj[0].acelerometro) {
      console.log("");
    }

    
  };

  return (
    <div>
      <VideoDemo
        onClickNav={onClickNav}
        url={url}
        onClickBack={onClickBack}
        probando={probando}
        bloqueoDeBoton={bloqueoDeBoton}
      />
      {open && (
        <ModalSensoresAdquisicion
          toggleModal={toggleModal}
          open={open}
          arduinos={cantidadArduinos}
          setPortSelected={setPortSelected}
          setBaudSelected={setBaudSelected}
          setPortSelected2={setPortSelected2}
          setBaudSelected2={setBaudSelected2}
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
      {dataIsReady && ( <SensoresAdquisicionGraficarContainer cantidadEmgs={cantidadEmgs} emgData={emgData} arduinoData={arduinoDataArg} />)}
      {/* <SensoresAdquisicionContainer mode="TEST" shouldStop={false} /> */}
      <br />
    </div>
  );
};

export default VideoDemoContainer;
