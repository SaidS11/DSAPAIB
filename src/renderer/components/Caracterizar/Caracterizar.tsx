/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import Plot from 'react-plotly.js';
import PlotP from './PlotP';
import './Caracterizar.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setVentanasArrayEmg1,
  setVentanasArrayEmg2,
  setVentanasArrayEmg3,
  setVentanasArrayEmg4,
  setVentanasArrayGiroscopio,
  setVentanasArrayAcelerometro,
  setCantidadSujetos,
  setVentanasArrayFrecuencia,
} from '../../../redux/slices/SeñalesSlice';
import {
  setIsLoading,
  setSignalsIteration,
} from '../../../redux/slices/StatusSlice';
import styleButton, {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';


interface CaracterizarProps {
  sensoresSelected: any;
  selectedPatients: any;
  selectedProtocol: any;
  currentIteration: any;
  giroscopioChecked: any;
  frecuenciaChecked: any;
  acelerometroChecked: any;
}

const Caracterizar = (props: CaracterizarProps) => {
  const {
    sensoresSelected,
    selectedPatients,
    selectedProtocol,
    currentIteration,
    giroscopioChecked,
    frecuenciaChecked,
    acelerometroChecked,
  } = props;
  console.log("frecuencia STATUS", frecuenciaChecked);
  const [localUpdater, setLocalUpdater] = useState(false);
  const [colors1, setColors1] = useState(['#00000']);
  const [colors2, setColors2] = useState(['blue']);
  const [colors3, setColors3] = useState(['yellow']);
  const [colors4, setColors4] = useState(['green']);

  const [ventanasSeñal1Emg1, setVentanasSeñal1Emg1] = useState([]);
  const [ventanasSeñal2Emg2, setVentanasSeñal2Emg2] = useState([]);
  const [ventanasSeñal3Emg3, setVentanasSeñal3Emg3] = useState([]);
  const [ventanasSeñal4Emg4, setVentanasSeñal4Emg4] = useState([]);


  const [giroscopioDataX, setGiroscopioDataX] = useState([0]);
  const [giroscopioDataY, setGiroscopioDataY] = useState([0]);
  const [ventanasSeñalGiroscopio, setVentanasSeñalGiroscopio] = useState([]);

  const [acelerometroDataX, setAcelerometroDataX] = useState([0]);
  const [acelerometroDataY, setAcelerometroDataY] = useState([0]);
  const [ventanasSeñalAcelerometro, setVentanasSeñalAcelerometro] = useState([]);

  const [frecuenciaDataX, setFrecuenciaDataX] = useState([0]);
  const [frecuenciaDataY, setFrecuenciaDataY] = useState([0]);
  const [ventanasSeñalFrecuencia, setVentanasSeñalFrecuencia] = useState([]);

  const sujetos = useCustomSelector((state) => state.señales.cantidadSujetos);
  const ventanaReduxEmg1 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg1
  );
  const ventanaReduxEmg2 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg2
  );
  const ventanaReduxEmg3 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg3
  );
  const ventanaReduxEmg4 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg4
  );
  const ventanaReduxGiroscopio = useCustomSelector(
    (state) => state.señales.ventanasArrayGiroscopio
  );
  const ventanaReduxAcelerometro = useCustomSelector(
    (state) => state.señales.ventanasArrayAcelerometro
  );

  const ventanaReduxFrecuencia = useCustomSelector(
    (state) => state.señales.ventanasArrayFrecuencia
  );

  const navigate = useNavigate();
  // const [curSelected, setCurSelected] = useState(false);
  const appDispatch = useCustomDispatch();
  // const [color1, setColor1] = useState("red")
  const [dataXEmg1, setDataXEmg1] = useState([0]);
  const [dataYEmg1, setDataYEmg1] = useState([0]);
  const trace1 = {
    x: dataXEmg1,
    y: dataYEmg1,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'scatter',
    line: { color: 'black' },
    marker: { color: colors1 },
    mode: 'markers+lines',
    name: 'EMG1',
  };

  const [dataX2Emg2, setDataX2Emg2] = useState([0]);
  const [dataY2Emg2, setDataY2Emg2] = useState([0]);
  console.log('Esto hay en el estado actual', ventanasSeñalGiroscopio);
  const trace2 = {
    x: dataX2Emg2,
    y: dataY2Emg2,
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter',
    // mode: 'lines+markers',
    // mode:'markers',
    line: { color: 'blue' },
    // With each click a push to the colors array must be added to keep adding colors
    marker: { color: colors2 },
    mode: 'markers+lines',
    name: 'EMG2',
  };

  const [dataX3Emg3, setDataX3Emg3] = useState([0]);
  const [dataY3Emg3, setDataY3Emg3] = useState([0]);
  const trace3 = {
    x: dataX3Emg3,
    y: dataY3Emg3,
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter',
    line: { color: 'yellow' },
    marker: { color: colors3 },
    mode: 'markers+lines',
    name: 'EMG3',
  };

  const [dataX4Emg4, setDataX4Emg4] = useState([0]);
  const [dataY4Emg4, setDataY4Emg4] = useState([0]);
  const trace4 = {
    x: dataX4Emg4,
    y: dataY4Emg4,
    xaxis: 'x4',
    yaxis: 'y4',
    type: 'scatter',
    line: { color: 'green' },
    marker: { color: colors4 },
    mode: 'markers+lines',
    name: 'EMG4',
  };

  const [dataX5, setDataX5] = useState([0]);
  const [dataY5, setDataY5] = useState([0]);
  const trace5 = {
    x: dataX5,
    y: dataY5,
    xaxis: 'x5',
    yaxis: 'y5',
    type: 'scatter',
  };

  const [dataX6, setDataX6] = useState([0]);
  const [dataY6, setDataY6] = useState([0]);
  const trace6 = {
    x: dataX6,
    y: dataY6,
    xaxis: 'x6',
    yaxis: 'y6',
    type: 'scatter',
  };

  const [dataX7, setDataX7] = useState([0]);
  const [dataY7, setDataY7] = useState([0]);
  const trace7 = {
    x: dataX7,
    y: dataY7,
    xaxis: 'x7',
    yaxis: 'y7',
    type: 'scatter',
  };

  const [dataX8, setDataX8] = useState([0]);
  const [dataY8, setDataY8] = useState([0]);
  const trace8 = {
    x: dataX8,
    y: dataY8,
    xaxis: 'x8',
    yaxis: 'y8',
    type: 'scatter',
  };

  const dataArr = [
    trace1,
    trace2,
    trace3,
    trace4,
    trace5,
    trace6,
    trace7,
    trace8,
  ];

  let numY = 0;
  let numX = 0;
  async function buscarElementoMongoFront() {
    const document = {
      name: selectedPatients[currentIteration].col1,
      protocol: selectedProtocol,
    };
    const jsonDocument = JSON.stringify(document);
    const resp = await window.electron.ipcRenderer.buscarElementoM(
      jsonDocument
    );
    return resp;
  }

  const retrieveSignal = async () => {
    appDispatch(setIsLoading(true));

    const respuesta = await buscarElementoMongoFront();
    appDispatch(setIsLoading(false));
    console.log("Señales", respuesta[0].signals)
    console.log('this is resp', respuesta);
    const { signal1 } = respuesta[0].signals;
    const { signal2 } = respuesta[0].signals;
    const { signal3 } = respuesta[0].signals;
    const { signal4 } = respuesta[0].signals;
    const gsr = respuesta[0].gsr;

    console.log("frecuencia signal 4", signal4);

    const xArrayEmg1 = [];
    const yArrayEmg1 = [];

    const xArray2Emg2 = [];
    const yArray2Emg2 = [];

    const xArray3Emg3 = [];
    const yArray3Emg3 = [];

    const xArray4Emg4 = [];
    const yArray4Emg4 = [];

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const colors2 = [];

    const giroscopioSignalLocalX = [];
    const giroscopioSignalLocalY = [];

    const acelerometroSignalLocalX = [];
    const acelerometroSignalLocalY = [];

    const frecuenciaSignalLocalX = [];
    const frecuenciaSignalLocalY = []

    for (let i = 0; i < signal1.length; i += 1) {
      if (sensoresSelected >= 1) {
        xArrayEmg1.push(signal1[i].x);
        yArrayEmg1.push(signal1[i].y);
      }
      if (sensoresSelected >=2) {
        xArray2Emg2.push(signal2[i].x);
        yArray2Emg2.push(signal2[i].y);
        colors2.push('blue');
      }
      if (sensoresSelected >=3) {
        xArray3Emg3.push(signal3[i].x);
        yArray3Emg3.push(signal3[i].y);
        colors3.push('yellow');
      }
      if (sensoresSelected >= 4) {
        xArray4Emg4.push(signal4[i].x);
        yArray4Emg4.push(signal4[i].y);
        colors4.push('green');
      }


      if(giroscopioChecked) {
        giroscopioSignalLocalX.push(signal3[i].x);
        giroscopioSignalLocalY.push(signal3[i].y);
      }
      if(acelerometroChecked) {
        acelerometroSignalLocalX.push(signal4[i].x);
        acelerometroSignalLocalY.push(signal4[i].y);
      }
      console.log("frecuencia should enter 1", frecuenciaChecked);
      if(frecuenciaChecked) {
        console.log("frecuencia check1");
        frecuenciaSignalLocalX.push(signal4[i].x);
        frecuenciaSignalLocalY.push(signal4[i].y);
      }

    }
    if (sensoresSelected >=1) {
      console.log('This is x', xArrayEmg1);
      console.log('This is y', yArrayEmg1);
      setDataXEmg1(xArrayEmg1);
      setDataYEmg1(yArrayEmg1);
    }

    if (sensoresSelected >= 2) {
      setDataX2Emg2(xArray2Emg2);
      setDataY2Emg2(yArray2Emg2);
      setColors2(colors2);
    }

    if(sensoresSelected >= 3) {
      setDataX3Emg3(xArray3Emg3);
      setDataY3Emg3(yArray3Emg3);
      setColors3(colors3);
    }
    if(sensoresSelected >= 4) {
      setDataX4Emg4(xArray4Emg4);
      setDataY4Emg4(yArray4Emg4);
      setColors4(colors4);
    }

    console.log('This is xGSR', giroscopioSignalLocalX);
    if (giroscopioChecked) {
      setGiroscopioDataX(giroscopioSignalLocalX);
      setGiroscopioDataY(giroscopioSignalLocalY);
    }
    if (acelerometroChecked) {
      setAcelerometroDataX(acelerometroSignalLocalX);
      setAcelerometroDataY(acelerometroSignalLocalY);
    }
    console.log("frecuencia should enter 2", frecuenciaChecked);
    if (frecuenciaChecked) {
      console.log("frecuencia check2");
      console.log("frecuencia init", frecuenciaSignalLocalX)
      setFrecuenciaDataX(frecuenciaSignalLocalX);
      setFrecuenciaDataY(frecuenciaSignalLocalY);
    }

  };

  
  console.log("DataarrPre", dataArr);
  const numOfPlots = () => {
    const times = 8 - sensoresSelected;
    for (let i = 0; i < times; i+=1) {
      dataArr.pop();
    }
    console.log('sensores', sensoresSelected);
    // impar aumenta las columns
    let dynamicRows = 0;
    let dynamicColumns = 0;
    if (sensoresSelected === 1) {
      dynamicRows = 1;
      dynamicColumns = 1;
    }
    if (sensoresSelected === 2) {
      dynamicRows = 1;
      dynamicColumns = 2;
    }
    if (sensoresSelected > 2 && sensoresSelected < 5) {
      dynamicRows = 2;
      dynamicColumns = 2;
    }
    if (sensoresSelected > 4 && sensoresSelected < 7) {
      dynamicRows = 2;
      dynamicColumns = 3;
    }
    if (sensoresSelected >= 7) {
      dynamicRows = 2;
      dynamicColumns = 4;
    }
    const objGrid = {
      rows: dynamicRows,
      columns: dynamicColumns,
      pattern: 'independent',
    };
    return objGrid;
  };
  let selection: any[] = [];
  let selectedEmg = '';
  const gridLayout = numOfPlots();
  const storeSelections = (segment: { points: any[]; }) => {
    if (segment.points.length > 0) {
      console.log('Sele', segment);
      selectedEmg = segment.points[0].fullData.name;
      const helperArr: any[] = [];
      segment.points.map((ele: { pointNumber: any; }) => helperArr.push(ele.pointNumber));
      selection = [...helperArr];
    }
  };
  const onClickSelect = () => {
    console.log('Selection', selection);
    if (selection.length > 0) {
      try {
        const colorsLocal1 = [...colors1];
        const colorsLocal2 = [...colors2];
        const colorsLocal3 = [...colors3];
        const colorsLocal4 = [...colors4];

        const ventanasLocalEmg1 = [];
        const ventanasLocalEmg2 = [];
        const ventanasLocalEmg3 = [];
        const ventanasLocalEmg4 = [];

        const ventanasGiroscopioLocal = [];
        const ventanasAcelerometroLocal = [];
        const ventanasFrecuenciaLocal = []

        console.log('Current Colors', colorsLocal1);
        console.log('name', selectedEmg);
        for (let i = 0; i < dataX2Emg2.length; i += 1) {
          console.log('This is it', selection);
          if (i === selection[0]) {
            if (selectedEmg === 'EMG1') {
              console.log('this is xdata1', dataXEmg1[i]);
              console.log("frecuencia check3 test xdata", dataXEmg1[i])
              ventanasLocalEmg1.push({ x: dataXEmg1[i], y: dataYEmg1[i] });
            } else if (selectedEmg === 'EMG2') {
              console.log('this is xdata2', dataX2Emg2[i]);
              ventanasLocalEmg2.push({ x: dataX2Emg2[i], y: dataY2Emg2[i] });
            } else if (selectedEmg === 'EMG3') {
              console.log('this is xdata3', dataX3Emg3[i]);
              ventanasLocalEmg3.push({ x: dataX3Emg3[i], y: dataY3Emg3[i] });
            } else if (selectedEmg === 'EMG4') {
              console.log('this is xdata4', dataX4Emg4[i]);
              ventanasLocalEmg4.push({ x: dataX4Emg4[i], y: dataY4Emg4[i] });
            }
            if(giroscopioChecked) {
              ventanasGiroscopioLocal.push({ x: giroscopioDataX[i], y: giroscopioDataY[i] });
            }
            if(acelerometroChecked) {
              ventanasAcelerometroLocal.push({ x: acelerometroDataX[i], y: acelerometroDataY[i] });
            }
            if (frecuenciaChecked) {
              ventanasFrecuenciaLocal.push({ x: frecuenciaDataX[i], y: frecuenciaDataY[i] });
            }
            colorsLocal1[i] = 'red';
            colorsLocal2[i] = 'red';
            colorsLocal3[i] = 'red';
            colorsLocal4[i] = 'red';
            selection.shift();
          }
          if (selection.length === 0) {
            break;
          }
        }
        selection.length = 0;
        // console.log('Now i Have', colorsLocal1);
        // const localArray = [];
        if (selectedEmg === 'EMG1') {
          const localArray = [...ventanasSeñal1Emg1];
          localArray.push(ventanasLocalEmg1);
          setVentanasSeñal1Emg1(localArray);

          console.log('Global', ventanasSeñal1Emg1);
          console.log('Local', ventanasLocalEmg1);

          setColors1([...colorsLocal1]);
        } else if (selectedEmg === 'EMG2') {
          const localArray = [...ventanasSeñal2Emg2];
          localArray.push(ventanasLocalEmg2);
          setVentanasSeñal2Emg2(localArray);
          setColors2([...colorsLocal2]);
        } else if (selectedEmg === 'EMG3') {
          const localArray = [...ventanasSeñal3Emg3];
          localArray.push(ventanasLocalEmg3);
          setVentanasSeñal3Emg3(localArray);
          setColors3([...colorsLocal3]);
        } else if (selectedEmg === 'EMG4') {
          const localArray = [...ventanasSeñal4Emg4];
          localArray.push(ventanasLocalEmg4);
          setVentanasSeñal4Emg4(localArray);
          setColors4([...colorsLocal4]);
        } 
        console.log('Estas son las locales', ventanasGiroscopioLocal);
        // Contains con nombre de sensores
        if(giroscopioChecked) {
          const localArrayGiroscopio = [...ventanasSeñalGiroscopio];
          localArrayGiroscopio.push(ventanasGiroscopioLocal);
          setVentanasSeñalGiroscopio(localArrayGiroscopio);
        }
        if(acelerometroChecked) {
          const localArrayAcelerometro = [...ventanasSeñalAcelerometro];
          localArrayAcelerometro.push(ventanasAcelerometroLocal);
          setVentanasSeñalAcelerometro(localArrayAcelerometro);
        }
        if(frecuenciaChecked) {
          console.log("frecuencia check4");
          const localArrayFrecuencia = [...ventanasSeñalFrecuencia];
          localArrayFrecuencia.push(ventanasFrecuenciaLocal);
          console.log("frecuencia stored", localArrayFrecuencia)
          setVentanasSeñalFrecuencia(localArrayFrecuencia);
        }

      } catch (ex: any) {
        alert(`Error ${ex}`);
      }
    } else {
      alert('Seleccione una ventana primero');
    }
  };
  const onClickSave = () => {
    const localArrayEmg1 = [];
    if (sensoresSelected >= 1) {
      ventanaReduxEmg1.map((e) => localArrayEmg1.push(e));
      localArrayEmg1.push(ventanasSeñal1Emg1);
    }

    const localArrayEmg2 = [];
    if (sensoresSelected >= 2) {
      ventanaReduxEmg2.map((e) => localArrayEmg2.push(e));
      localArrayEmg2.push(ventanasSeñal2Emg2);
    }

    const localArrayEmg3 = [];
    if (sensoresSelected >= 3) {
      ventanaReduxEmg3.map((e) => localArrayEmg3.push(e));
      localArrayEmg3.push(ventanasSeñal3Emg3);
    }

    const localArrayEmg4 = [];
    if (sensoresSelected >= 4) {
      ventanaReduxEmg4.map((e) => localArrayEmg4.push(e));
      localArrayEmg4.push(ventanasSeñal4Emg4);
    }


    const localArrayGiroscopio = [];
    if (giroscopioChecked) {
      ventanaReduxGiroscopio.map((e) => localArrayGiroscopio.push(e));
      localArrayGiroscopio.push(ventanasSeñalGiroscopio);
    }

    const localArrayAcelerometro = [];
    if(acelerometroChecked) {
      ventanaReduxAcelerometro.map((e) => localArrayAcelerometro.push(e));
      localArrayAcelerometro.push(ventanasSeñalAcelerometro);
    }

    const localArrayFrecuencia = [];
    if (frecuenciaChecked) {
      console.log("frecuencia check5");
      ventanaReduxFrecuencia.map((e) => localArrayFrecuencia.push(e));
      console.log("frecuencia about to be stored", ventanasSeñalFrecuencia);
      localArrayFrecuencia.push(ventanasSeñalFrecuencia);
    }

    // console.log('Esto tiene el estado', ventanasSeñalGiroscopio);
    // console.log('Esto voy a guardar', localArrayGiroscopio);
    
    appDispatch(setVentanasArrayEmg1(localArrayEmg1));
    appDispatch(setVentanasArrayEmg2(localArrayEmg2));
    appDispatch(setVentanasArrayEmg3(localArrayEmg3));
    appDispatch(setVentanasArrayEmg4(localArrayEmg4));
    appDispatch(setVentanasArrayGiroscopio(localArrayGiroscopio));
    appDispatch(setVentanasArrayAcelerometro(localArrayAcelerometro));
    appDispatch(setVentanasArrayFrecuencia(localArrayFrecuencia));


    if (sujetos !== 1) {
      appDispatch(setCantidadSujetos(sujetos - 1));
      appDispatch(setIsLoading(true));
      appDispatch(setSignalsIteration(currentIteration + 1));
      // appDispatch(selectedPatients(localPatients))
      navigate('/blank');
    } else {
      navigate('/caracterizar2');
    }
  };

  useEffect(() => {
    retrieveSignal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('p', selectedPatients);
  return (
    <div>
      <PlotP dataArr={dataArr}
       selectedPatients={selectedPatients}
       currentIteration={currentIteration}
       storeSelections={storeSelections}
       gridLayout={gridLayout}
      />
      <section className="display-center">
        Seleccione en una gráfica la ventana a caracterizar, despues presione
        confirmar, los puntos seleccionados cambiaran de color. Debe seleccionar
        la misma cantidad de ventanas por cada EMG graficado. Las ventanas que
        seleccione, se replicaran para el resto de sus sensores, ejemplo: GSR,
        Acelerometro, etc. Y al procesar se realizaran los cálculos
        correspondientes en dichos sensores.
      </section>
      <section className="display-center" style={{ fontWeight: 'bold' }}>
        Presione Procesar para terminar la selección y continuar a la extracción
        de características.
      </section>
      <section className="display-center">
        <Button sx={styleButton} onClick={onClickSelect}>
          Confirmar Ventana
        </Button>
      </section>
      <section className="display-center">
        <Button onClick={onClickSave} sx={styleButtonBiggerGreen}>
          Procesar Selección
        </Button>
      </section>
    </div>
  );
};

Caracterizar.propTypes = {
  sensoresSelected: PropTypes.number.isRequired,
  selectedPatients: PropTypes.array.isRequired,
  selectedProtocol: PropTypes.string.isRequired,
  currentIteration: PropTypes.number.isRequired,
  giroscopioChecked: PropTypes.bool.isRequired,
  frecuenciaChecked: PropTypes.bool.isRequired,
  acelerometroChecked: PropTypes.bool.isRequired,
};

export default Caracterizar;
