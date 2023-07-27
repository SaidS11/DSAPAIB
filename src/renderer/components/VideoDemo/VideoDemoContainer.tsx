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
  setMongoInsertObject,
  setTotalSensores,
  setRegExSinAcelerometro,
} from '../../../redux/slices/SeñalesSlice';
import VideoDemo from './VideoDemo';
import SensoresAdquisicionContainer from '../SensoresAdquisicion/SensoresAdquisicionContainer';
import ModalSensoresAdquisicion from '../SensoresAdquisicion/ModalSensoresAdquisicion';
import { apiEndpoint, ardMessage, completeAdqObject } from '../Utilities/Constants';
import Button from '@mui/material/Button';
import styleButton, { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';
import SensoresAdquisicionGraficarContainer from '../SensoresAdquisicion/SensoresAdquisicionGraficarContainer';
import { setDuracionProtocolo } from 'redux/slices/ConfiguracionSlice';

function esFlotante(numero: number) {
  return !Number.isInteger(numero);
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

  console.log("RETURNED", nuevoArreglo);
  return nuevoArreglo;
}

function calcularTimeGsr(arreglo: Array<number>) {
  const nuevosValores = [];

  for (let i = 0; i < arreglo.length; i += 10) {
    nuevosValores.push(arreglo[i]);
  }

  return nuevosValores;
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
  const [formatoParsedSinAcelerometro, setFormatoParsedSinAcelerometro] = useState<RegExp | null>(null);
  const [gsrLocalChecked, setGsrLocalChecked] = useState(false);
  const [acelerometroLocalChecked, setAcelerometroLocalChecked] = useState(false);
  const [tempLocalChecked, setTempLocalChecked] = useState(false);
  const [frecuenciaLocalChecked, setFrecuenciaLocalChecked] = useState(false);



  // TESTS DONE
  const [open, setOpen] = useState(true);
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
    const validacionDeFlotantes = esFlotante(v!.duration);
    if(validacionDeFlotantes) {
      const redondeado = Math.ceil(v!.duration);
      appDispatch(setDuracionProtocolo(redondeado));

    } else {
      appDispatch(setDuracionProtocolo(v!.duration));
    }

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
    setGsrLocalChecked(gsr);
    appDispatch(setAcelerometroIsChecked(acelerometro));
    setAcelerometroLocalChecked(acelerometro);
    appDispatch(setFrecuenciaIsChecked(frecuencia_cardiaca));
    setFrecuenciaLocalChecked(frecuencia_cardiaca);
    appDispatch(setTemperaturaIsChecked(temperatura));
    setTempLocalChecked(temperatura);
    let cantidadTotalSensores = cantidadEmgs;
    let regAux: RegExp = /\bEMPTY: \d+\b/;
    if(gsr) {
      cantidadTotalSensores = cantidadTotalSensores + 1
      regAux = /\bGSR: \d+\b/;
    }
    if(frecuencia_cardiaca) {
      cantidadTotalSensores = cantidadTotalSensores + 1
      regAux = /\bTC: \d+\.\d+, GSR: \d+\b/;

    }
    if(acelerometro) {
      cantidadTotalSensores = cantidadTotalSensores + 3
    }
    if(temperatura) {
      cantidadTotalSensores = cantidadTotalSensores + 1
      regAux = /\bHRLM: \d+, TC: \d+\.\d+, GSR: \d+\b/;
    }
    appDispatch(setTotalSensores(cantidadTotalSensores));
    appDispatch(
      setExtraSensorsChecked([gsr, acelerometro, frecuencia_cardiaca])
    );
    setFormatoParsedSinAcelerometro(regAux);
    appDispatch(setRegExSinAcelerometro(regAux));
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

    
    console.log("START");
    // const adqObj: any = completeAdqObject;
    // const transformedObj: any = {};
    // for (const key in adqObj) {
    //   if (adqObj.hasOwnProperty(key)) {
    //     const newArray = adqObj[key].map((value: any, index: any) => ({ x: index + 1, y: value }));
    //     transformedObj[key] = newArray;
    //   }
    // }
    // const objWrapper = {
    //   signals: transformedObj
    // }
    // appDispatch(setMongoInsertObject(objWrapper));
    // navigate('/resultados');




    setBloqueoDeBoton(true);
    const startArduinos = fetch(`${apiEndpoint}/multiplesArduinos`);
    // Comprobacion de emgs sino hay timer para controlar arduinos
    const startNidaq = await fetch(`${apiEndpoint}/nidaq?duracion=5&cantidadEmgs=4`);

    const data = await startNidaq.json();

    if(data.message !== null) {
      console.log("READY", data.message);
      stopArduinos();
    }

    // TESTS
    // const transformedObj: any = {};
    // for (const key in completeAdqObject) {
    //   if (completeAdqObject.hasOwnProperty(key)) {
    //     const newArray = completeAdqObject[key].map((value: any, index: any) => ({ x: index + 1, y: value }));
    //     transformedObj[key] = newArray;
    //   }
    // }
    // const objWrapper = {
    //   signals: transformedObj
    // }

    // console.log("OBJ", objWrapper)
    

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

    console.log("Stopping");
    appDispatch(setIsLoading(true));
    const stopArduinos = await fetch(`${apiEndpoint}/stopArduinos`);
    const arduinoSTOP = await stopArduinos.json();

    console.log("ARDUINO STOP", arduinoSTOP.message);

    const arreglo = arduinoSTOP.message

    
    // Comprobacion de cual arduino tiene las claves que nos interesan para aplicarle los metodos correspondientes

    if (cantidadArduinos > 1) {
      console.log("Mas de 1 arduino");

      console.log("ARREGLO TIME 1", arreglo[2]);
      console.log("ARREGLO TIME 2", arreglo[3]);

      const encontrado = arreglo[0].some((elemento: string) => elemento.includes("INCLY"));

      let arregloArduinoConAcelerometro;
      let arregloArduinoSinAcelerometro;

      let timestampArduinoConAcelerometro;
      let timestampArduinoSinAcelerometro;


      if(encontrado) {
        arregloArduinoConAcelerometro = arreglo[0];
        timestampArduinoConAcelerometro = arreglo[2];
        arregloArduinoSinAcelerometro = arreglo[1];
        timestampArduinoSinAcelerometro = arreglo[3];

      } else {
        arregloArduinoConAcelerometro = arreglo[1];
        timestampArduinoSinAcelerometro = arreglo[3];
        arregloArduinoSinAcelerometro = arreglo[0];
        timestampArduinoConAcelerometro = arreglo[2];

      }

      const registrosCompletos = arregloArduinoSinAcelerometro.filter((registro: string) => {
        const formatoCompleto = formatoParsedSinAcelerometro ||  /\bEMPTY: \d+\b/;
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
        if(gsrLocalChecked) {
          const nuevoGsr = calcularValorCorrectoGsr(returnObj.GSR)
          returnObj.GSR = nuevoGsr
        }

        objetoArduino1 = returnObj;
        objetoArduinoMultiple = {...objetoArduinoMultiple, ...returnObj};
      }
      if (cantidadArduinos >= 2) {
        const arduino2Data = registrosCompletos2;
        const returnObj = parseArduinoData(arduino2Data)
        objetoArduino2 = returnObj;
        // Comentado por operaciones
        // objetoArduinoMultiple = {...objetoArduinoMultiple, ...returnObj};
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


      // Aplicar operaciones al acelerometro
      const diferenciaYRespectoaX = objetoArduino2.INCLY.length - objetoArduino2.INCLX.length;
      const diferenciaZRespectoaX = objetoArduino2.INCLZ.length - objetoArduino2.INCLX.length;
      let totalAEliminarAcelerometroTime;
      if (diferenciaYRespectoaX === diferenciaZRespectoaX) {
        totalAEliminarAcelerometroTime = diferenciaYRespectoaX
      }
      else {
        totalAEliminarAcelerometroTime = diferenciaYRespectoaX > diferenciaZRespectoaX ? diferenciaYRespectoaX : diferenciaZRespectoaX;
      }
      for(let i = 0; i <= diferenciaYRespectoaX; i += 1) {
        objetoArduino2.INCLY.pop()
      }
      for(let i = 0; i <= diferenciaZRespectoaX; i += 1) {
        objetoArduino2.INCLZ.pop()
      }
      for(let i = 0; i <= totalAEliminarAcelerometroTime; i += 1) {
        arregloArduinoConAcelerometro.pop()
      }

      const resultArrayX = [];
      const resultArrayY = [];
      const resultArrayZ = [];

      for (let i = 0; i < objetoArduino2.INCLX.length; i++) {
        const resultX = Math.atan(objetoArduino2.INCLX[i] / Math.sqrt((objetoArduino2.INCLY[i] * objetoArduino2.INCLY[i]) + (objetoArduino2.INCLZ[i] * objetoArduino2.INCLZ[i]))) * (180 / 3.14);
        const resultY = Math.atan(objetoArduino2.INCLY[i] / Math.sqrt((objetoArduino2.INCLX[i] * objetoArduino2.INCLX[i]) + (objetoArduino2.INCLZ[i] * objetoArduino2.INCLZ[i]))) * (180 / 3.14);
        const resultZ = Math.atan(objetoArduino2.INCLZ[i] / Math.sqrt((objetoArduino2.INCLX[i] * objetoArduino2.INCLX[i]) + (objetoArduino2.INCLY[i] * objetoArduino2.INCLY[i]))) * (180 / 3.14);

        
        resultArrayX.push(resultX);
        resultArrayY.push(resultY);
        resultArrayZ.push(resultZ);
        
      }
      objetoArduino2.INCLX = resultArrayX;
      objetoArduino2.INCLY = resultArrayY;
      objetoArduino2.INCLZ = resultArrayZ;


      objetoArduinoMultiple = {...objetoArduinoMultiple, ...objetoArduino2};
  
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

      let objetoAdquirido = {...returnedEmg, ...objetoArduinoMultiple}

      console.log("OBJETO FINAL SIN TIEMPO ARDUINOS", objetoAdquirido);

      const timeObj: any = {}
      if(gsrLocalChecked) {
        timeObj.tiempoGSR =  calcularTimeGsr(arregloArduinoSinAcelerometro);
      }

      if(tempLocalChecked) {
        timeObj.tiempoTC =  arregloArduinoSinAcelerometro;

      }
      if (frecuenciaLocalChecked) {
        timeObj.tiempoHRLM =  arregloArduinoSinAcelerometro;

      }
      if(acelerometroLocalChecked) {
        timeObj.tiempoINCLX =  arregloArduinoConAcelerometro;
        timeObj.tiempoINCLY =  arregloArduinoConAcelerometro;
        timeObj.tiempoINCLZ =  arregloArduinoConAcelerometro;


      } 

      objetoAdquirido = {...objetoAdquirido, ...timeObj};
      const objWrapper = {
        signals: objetoAdquirido
      }

      console.log("Wrapped OBJ", objWrapper);

      setBloqueoDeBoton(false);
      setArduinoDataArg(objetoArduinoMultiple);
      setEmgData(returnedEmg);
      setDataIsReady(true);
      appDispatch(setIsLoading(false));


    } 

    else if (confObj[0].acelerometro) {
      console.log("  ");
    } else if (confObj[0].gsr) {

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
      <div>

      </div>
      <section className="display-center">
        <h3>
          Para probar si los sensores funcionan correctamente presione "Probar Sensores"
        </h3>
      </section>
      <section className="display-center">
        <h5>
          Comenzara una adquisición de 5 segundos y posteriormente se mostraran los resultados obtenidos
        </h5>
      </section>
      <section className="display-center">
        <Button
          sx={styleButton}
          style={{ fontSize: '20px' }}
          onClick={onClickStart}
        >
          Probar Sensores
        </Button>
      </section>
      {dataIsReady && ( <SensoresAdquisicionGraficarContainer cantidadEmgs={cantidadEmgs} emgData={emgData} arduinoData={arduinoDataArg} />)}
      {/* <SensoresAdquisicionContainer mode="TEST" shouldStop={false} /> */}
      <br />
    </div>
  );
};

export default VideoDemoContainer;
