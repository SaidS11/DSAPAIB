/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import Plot from 'react-plotly.js';
import './Caracterizar.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setVentanasArray,
  setVentanasArray2,
  setVentanasArrayGsr,
  setVentanasArrayTemp,
  setCantidadSujetos,
} from '../../../redux/slices/SeñalesSlice';
import {
  setIsLoading,
  setSignalsIteration,
} from '../../../redux/slices/StatusSlice';
import styleButton, {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';

const Caracterizar = ({
  sensoresSelected,
  selectedPatients,
  selectedProtocol,
  currentIteration,
}) => {
  // const { onClickAdd } = props;
  /* const dataX = [];
  const dataY = [];
  console.log(dataX); */
  // const [dataXParam, setDataXParam] = useState([0]);
  // const [dataYParam, setDataYParam] = useState([0]);

  const [localUpdater, setLocalUpdater] = useState(false);
  const [colors1, setColors1] = useState(['#00000']);
  const [colors2, setColors2] = useState(['blue']);
  const [colors3, setColors3] = useState(['yellow']);
  const [colors4, setColors4] = useState(['green']);

  const [ventanasSeñal1, setVentanasSeñal1] = useState([]);
  const [ventanasSeñal2, setVentanasSeñal2] = useState([]);

  const [gsrDataX, setGsrDataX] = useState([0]);
  const [gsrDataY, setGsrDataY] = useState([0]);
  const [ventanasSeñalGsr, setVentanasSeñalGsr] = useState([]);

  const [tempDataX, setTempDataX] = useState([0]);
  const [tempDataY, setTempDataY] = useState([0]);
  const [ventanasSeñalTemp, setVentanasSeñalTemp] = useState([]);

  const sujetos = useCustomSelector((state) => state.señales.cantidadSujetos);
  const ventanaRedux1 = useCustomSelector(
    (state) => state.señales.ventanasArray
  );
  const ventanaRedux2 = useCustomSelector(
    (state) => state.señales.ventanasArray2
  );

  const ventanaReduxGsr = useCustomSelector(
    (state) => state.señales.ventanasArrayGsr
  );
  const ventanaReduxTemp = useCustomSelector(
    (state) => state.señales.ventanasArrayTemp
  );

  const navigate = useNavigate();
  // const [curSelected, setCurSelected] = useState(false);
  const appDispatch = useCustomDispatch();
  // const [color1, setColor1] = useState("red")
  const [dataX, setDataX] = useState([0]);
  const [dataY, setDataY] = useState([0]);
  const trace1 = {
    x: dataX,
    y: dataY,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'scatter',
    line: { color: 'black' },
    marker: { color: colors1 },
    mode: 'markers+lines',
    name: 'EMG1',
  };

  const [dataX2, setDataX2] = useState([0]);
  const [dataY2, setDataY2] = useState([0]);
  console.log('Esto hay en el estado actual', ventanasSeñalGsr);
  const trace2 = {
    x: dataX2,
    y: dataY2,
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

  const [dataX3, setDataX3] = useState([0]);
  const [dataY3, setDataY3] = useState([0]);
  const trace3 = {
    x: dataX3,
    y: dataY3,
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter',
    line: { color: 'yellow' },
    marker: { color: colors3 },
    name: 'EMG3',
  };

  const [dataX4, setDataX4] = useState([0]);
  const [dataY4, setDataY4] = useState([0]);
  const trace4 = {
    x: dataX4,
    y: dataY4,
    xaxis: 'x4',
    yaxis: 'y4',
    type: 'scatter',
    line: { color: 'green' },
    marker: { color: colors3 },
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
  // async function buscarElementoMongoFront() {
  //   // appDispatch(setIsLoading(true));
  //   const document = { name: 'Ernesto Peña', protocol: 'PieDiabetico2en2' };
  //   const document2 = { name: 'Ernesto Peña', protocol: 'PieDiabetico3en3' };
  //   // const cadena = 'hola';
  //   const jsonDocument = JSON.stringify(document);
  //   // console.log(typeof jsonDocument);
  //   window.electron.ipcRenderer.buscarElementoMongo(jsonDocument);
  // }
  // window.electron.ipcRenderer.buscarElementoM((event, resp) => {
  //   if (resp.length > 0) {
  //     console.log(resp[0]);
  //   } else {
  //     console.log('No hay nada');
  //   }
  // });

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
  const sensoresExtraSeleccionados = ['GSR', 'TEMP'];

  const retrieveSignal = async () => {
    appDispatch(setIsLoading(true));

    const respuesta = await buscarElementoMongoFront();
    appDispatch(setIsLoading(false));

    console.log('this is resp', respuesta);
    const { signal1 } = respuesta[0].signals;
    const { signal2 } = respuesta[0].signals;
    const { signal3 } = respuesta[0].signals;
    const { signal4 } = respuesta[0].signals;

    const xArray = [];
    const yArray = [];

    const xArray2 = [];
    const yArray2 = [];
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const colors2 = [];

    const gsrSignalLocalX = [];
    const gsrSignalLocalY = [];

    const tempSignalLocalX = [];
    const tempSignalLocalY = [];

    for (let i = 0; i < signal1.length; i += 1) {
      xArray.push(signal1[i].x);
      yArray.push(signal1[i].y);

      xArray2.push(signal2[i].x);
      yArray2.push(signal2[i].y);
      colors2.push('blue');

      gsrSignalLocalX.push(signal3[i].x);
      gsrSignalLocalY.push(signal3[i].y);

      tempSignalLocalX.push(signal4[i].x);
      tempSignalLocalY.push(signal4[i].y);
    }
    console.log('This is x', xArray);
    console.log('This is y', yArray);
    setDataX(xArray);
    setDataY(yArray);

    setDataX2(xArray2);
    setDataY2(yArray2);
    setColors2(colors2);

    console.log('This is xGSR', gsrSignalLocalX);

    setGsrDataX(gsrSignalLocalX);
    setGsrDataY(gsrSignalLocalY);

    setTempDataX(tempSignalLocalX);
    setTempDataY(tempSignalLocalY);
  };
  const onClickAdd = async () => {
    for (let i = 0; i < 15; i += 1) {
      numX = dataX.at(-1) + 2;
      numY = dataY.at(-1) + 1;

      setDataX(dataX.concat(numX));
      setDataY(dataY.concat(numY));

      setDataX2(dataX2.concat(numX + 7));
      setDataY2(dataY2.concat(numY + 1));
      setColors2(colors2.concat('blue'));
    }
    // setDataX(dataX.concat(numX));
    // setDataY(dataY.concat(numY));

    // setDataX2(dataX2.concat(numX + 7));
    // setDataY2(dataY2.concat(numY + 1));
    // setColors2(colors2.concat('blue'));

    // setDataX3(dataX3.concat(numX + 10));
    // setDataY3(dataY3.concat(numY));
    // setColors3(colors2.concat('yellow'));

    // setDataX4(dataX4.concat(numX + 1));
    // setDataY4(dataY4.concat(numY));
    // setColors3(colors2.concat('green'));

    // setDataX5(dataX5.concat(numX + 12));
    // setDataY5(dataY5.concat(numY));

    // setDataX6(dataX6.concat(numX + 8));
    // setDataY6(dataY6.concat(numY));

    // setDataX7(dataX7.concat(numX + 9));
    // setDataY7(dataY7.concat(numY + 3));

    // setDataX8(dataX8.concat(numX + 5));
    // setDataY8(dataY8.concat(numY));
  };

  const numOfPlots = () => {
    const times = 8 - sensoresSelected;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < times; i++) {
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
  let selection = [];
  let selectedEmg = '';
  const gridLayout = numOfPlots();
  const storeSelections = (segment) => {
    if (segment.points.length > 0) {
      console.log('Sele', segment);
      selectedEmg = segment.points[0].fullData.name;
      const helperArr = [];
      // console.log("colors before", colorsL)
      segment.points.map((ele) => helperArr.push(ele.pointNumber));
      // console.log("This is helper", helperArr);
      // for (let i = 0; i < dataX2.length; i += 1) {
      //   if (i == helperArr[0]) {
      //     colorsL[i] = '#C54C82';
      //     helperArr.pop();
      //   }
      // }
      // console.log("Colors after", colorsL)
      selection = [...helperArr];
      // curSelected = true;
      // setCurSelected(true);
      // setColors([...colorsL]);
      // Plot.update(myPlot, upd);
      // Plotly.restyle('myDiv', update, [tn]);
      // setColor1("blue");
    }
  };
  const onClickSelect = () => {
    console.log('Selection', selection);
    if (selection.length > 0) {
      const colorsLocal1 = [...colors1];
      const colorsLocal2 = [...colors2];
      const colorsLocal3 = [...colors3];
      const colorsLocal4 = [...colors4];

      const ventanas1Local = [];
      const ventanas2Local = [];
      const ventanas3Local = [];
      const ventanas4Local = [];

      const ventanasGsrLocal = [];
      const ventanasTempLocal = [];

      console.log('Current Colors', colorsLocal1);
      console.log('name', selectedEmg);
      for (let i = 0; i < dataX2.length; i += 1) {
        console.log('This is it', selection);
        if (i === selection[0]) {
          if (selectedEmg === 'EMG1') {
            console.log('this is xdata1', dataX[i]);
            ventanas1Local.push({ x: dataX[i], y: dataY[i] });
          } else if (selectedEmg === 'EMG2') {
            console.log('this is xdata2', dataX2[i]);
            ventanas2Local.push({ x: dataX2[i], y: dataY2[i] });
          } else if (selectedEmg === 'EMG3') {
            console.log('this is xdata3', dataX3[i]);
            ventanas3Local.push({ x: dataX3[i], y: dataY3[i] });
          } else if (selectedEmg === 'EMG4') {
            console.log('this is xdata4', dataX4[i]);
            ventanas4Local.push({ x: dataX3[i], y: dataY3[i] });
          }
          ventanasGsrLocal.push({ x: gsrDataX[i], y: gsrDataY[i] });
          ventanasTempLocal.push({ x: tempDataX[i], y: tempDataY[i] });
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
        const localArray = [...ventanasSeñal1];
        localArray.push(ventanas1Local);
        setVentanasSeñal1(localArray);

        console.log('Global', ventanasSeñal1);
        console.log('Local', ventanas1Local);

        setColors1([...colorsLocal1]);
      } else if (selectedEmg === 'EMG2') {
        // setVentanasSeñal2([...ventanasSeñal2, ...ventanas2Local]);
        const localArray = [...ventanasSeñal2];
        localArray.push(ventanas2Local);
        setVentanasSeñal2(localArray);
        setColors2([...colorsLocal2]);
      }
      console.log('Estas son las locales', ventanasGsrLocal);
      // Contains con nombre de sensores
      const localArrayGsr = [...ventanasSeñalGsr];
      localArrayGsr.push(ventanasGsrLocal);
      setVentanasSeñalGsr(localArrayGsr);

      const localArrayTemp = [...ventanasSeñalTemp];
      localArrayTemp.push(ventanasTempLocal);
      setVentanasSeñalTemp(localArrayTemp);
    } else {
      alert('Seleccione una ventana primero');
    }
  };
  const onClickSave = () => {
    const localArray1 = [];
    ventanaRedux1.map((e) => localArray1.push(e));
    localArray1.push(ventanasSeñal1);

    const localArray2 = [];
    ventanaRedux2.map((e) => localArray2.push(e));
    localArray2.push(ventanasSeñal2);

    const localArrayGsr = [];
    ventanaReduxGsr.map((e) => localArrayGsr.push(e));
    localArrayGsr.push(ventanasSeñalGsr);

    const localArrayTemp = [];
    ventanaReduxTemp.map((e) => localArrayTemp.push(e));
    localArrayTemp.push(ventanasSeñalTemp);
    console.log('Esto tiene el estado', ventanasSeñalGsr);
    console.log('Esto voy a guardar', localArrayGsr);
    appDispatch(setVentanasArray(localArray1));
    appDispatch(setVentanasArray2(localArray2));
    appDispatch(setVentanasArrayGsr(localArrayGsr));
    appDispatch(setVentanasArrayTemp(localArrayTemp));

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
      <Plot
        data={dataArr}
        // data={
        //   [
        //     {
        //       values: dataArr,
        //       marker: { color: "red" },
        //     }

        //   ]
        // }
        // layout={{ title: 'Caracterizar', autosize: true, grid: gridLayout, dragmode: 'select' }}
        layout={{
          title: `Caracterizar \n${selectedPatients[currentIteration].col1}`,
          autosize: true,
          grid: gridLayout,
        }}
        config={{ scrollZoom: true, displaylogo: false }}
        useResizeHandler
        style={{ height: '100%', width: '100%' }}
        // Idea de captura, tener almacenado de manera temporal los datos, cuando se presiona el boton se almacenan en un arreglo y hasta el final cuando se guarda se despachan
        onSelected={(selectedWindow) => storeSelections(selectedWindow)}
        // onClick={(data) => processSelections(data)}
        // onUpdate={(fig, graph) => console.log("")}
        // key={i}
      />
      <section className="display-center">
        Seleccione en una gráfica la ventana a caracterizar, despues presione
        confirmar, los puntos seleccionados cambiaran de color. Debe seleccionar
        la misma cantidad de ventanas por cada EMG graficado. Las ventanas que
        seleccione, se replicaran para el resto de sus sensores, ejemplo: GSR,
        Temperatura, etc. Y al procesar se realizaran los cálculos
        correspondientes en dichos sensores.
      </section>
      <section className="display-center" style={{ fontWeight: 'bold' }}>
        Presione Procesar para terminar la selección y continuar a la extracción
        de características.
      </section>
      <section className="display-center">
        {/* <Button onClick={onClickAdd} sx={styleButton} disabled>
          Presioname
        </Button> */}
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

export default Caracterizar;
