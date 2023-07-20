import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';

import Video from './Video';
import SensoresAdquisicionContainer from '../SensoresAdquisicion/SensoresAdquisicionContainer';
import { apiEndpoint } from '../Utilities/Constants';
import { setArduinoDataAdquirida, setEmgDataAdquirida, setMongoInsertObject } from 'redux/slices/SeñalesSlice';

interface ConfLocal {
  emgs: number;
  acelerometro: boolean
  gsr: boolean
  temperatura: boolean
  frecuencia_cardiaca: boolean
}


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

function calcularValorCorrectoGsr(arreglo: Array<number>) {
  const nuevoArreglo = [];

  for (let i = 0; i < arreglo.length; i += 10) {
    const grupo = arreglo.slice(i, i + 10); // Obtener un grupo de 10 posiciones

    const gsrAverage  = grupo.reduce((a, b) => a + b, 0) / grupo.length; // Calcular el promedio
    const volt = (gsrAverage*5)/1023;
    const hrOhms = ((5+2*volt)*10000) / (2.5-volt);
    nuevoArreglo.push(hrOhms); // Agregar el resultado al nuevo arreglo
  }

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

const VideoContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const [dataIsReady, setDataIsReady] = useState(false);
  const [emgData, setEmgData] = useState({});
  const [arduinoDataArg, setArduinoDataArg] = useState({});
  const appDispatch = useCustomDispatch();

  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );

  const duracion = useCustomSelector(
    (state) => state.config.duracionProtocolo
  );

  console.log("Duracion", duracion);
  const confObj = useCustomSelector(
    (state) => state.config.configCompleta
  ) as Array<ConfLocal>;
  console.log("OBJ", confObj);
  const sensores = confObj[0].emgs;
  const cantidadEmgs = confObj[0].emgs;
  const cantidadArduinos = confObj[0].emgs;

  const onClickNav = async () => {
    // setShouldStop(true);
    // const resp = await window.electron.ipcRenderer.sensoStop();
    // navigate('/procesamientoPrevio');
  };

  const onClickCancel = () => {
    navigate('/videoDemo');
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
  const video = document.getElementById('myVideo') as HTMLMediaElement | null;

  video?.addEventListener('play', (event) => {
    console.log(
      'The Boolean paused property is now false. Either the ' +
        'play() method was called or the autoplay attribute was toggled.'
    );
  });
  const urlRetrieved = `${multimediaObj[0].link_video}`;
  const url = urlRetrieved.includes('http')
    ? urlRetrieved
    : `${apiEndpoint}/${multimediaObj[0].link_video}`;

  const adquisicion = async ()=> {
    const startArduinos = fetch(`${apiEndpoint}/multiplesArduinos`);
    // Comprobacion de emgs sino hay timer para controlar arduinos
    // No mandar decimales y redondedar hacia arriba
    const startNidaq = await fetch(`${apiEndpoint}/nidaq?duracion=${duracion}&cantidadEmgs=${cantidadEmgs}`);

    const data = await startNidaq.json();

    if(data.message !== null) {
      console.log("READY", data.message);
      stopArduinos();
    }
  }

  const stopArduinos = async () => {

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

      const objetoAdquirido = {...returnedEmg, ...objetoArduinoMultiple}
      const transformedObj: any = {};

      for (const key in objetoAdquirido) {
        if (objetoAdquirido.hasOwnProperty(key)) {
          const newArray = objetoAdquirido[key].map((value: any, index: any) => ({ x: index + 1, y: value }));
          transformedObj[key] = newArray;
        }
      }
      const objWrapper = {
        signals: transformedObj
      }


      console.log("Wrapped", objWrapper);
      appDispatch(setMongoInsertObject(objWrapper));
      appDispatch(setArduinoDataAdquirida(objetoArduinoMultiple));
      appDispatch(setEmgDataAdquirida(returnedEmg));
     navigate('/resultados');
      // navigate('/procesamientoPrevio');

    } 
    
    else if (confObj[0].acelerometro) {
      console.log("");
    }

    
  };

  useEffect(() => {
    console.log("UPDATE")
    adquisicion();
  
  }, [video]);
  return (
    <div>
      <Video onClickNav={onClickNav} url={url} onClickCancel={onClickCancel} />
      {/* <SensoresAdquisicionContainer mode="LIVE" shouldStop={shouldStop} /> */}
    </div>
  );
};

export default VideoContainer;
