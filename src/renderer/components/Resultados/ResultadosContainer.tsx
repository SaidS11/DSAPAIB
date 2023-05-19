// eslint-disable-next-line import/no-named-as-default
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  setFailUpload,
  setIsLoading,
  setIsUploaded,
} from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import Resultados from './Resultados';

interface ConfLocal {
  emgs: number;
}

const ResultadosContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const appDispatch = useCustomDispatch();
  const confObj = useCustomSelector(
    (state) => state.config.configCompleta
  ) as Array<ConfLocal>;
  const nombreProtocolo = useCustomSelector(
    (state) => state.config.protocoloNombre
  );
  const sensoresSelected = useCustomSelector(
    (state) => state.señales.cantidadSensores
  );
  const totalSensores = useCustomSelector(
    (state) => state.señales.totalSensores
  );

  const usuario = useCustomSelector((state) => state.datos.usuarioPaciente);
  const objetoMongo = useCustomSelector(
    (state) => state.señales.mongoInsertObject
  );
  const giroscopioChecked = useCustomSelector(
    (state) => state.señales.giroscopioIsChecked
  );
  const acelerometroChecked = useCustomSelector(
    (state) => state.señales.acelerometroIsChecked
  );
  const frecuenciaChecked = useCustomSelector(
    (state) => state.señales.frecuenciaIsChecked
  );

  const [giroscopioDataX, setGiroscopioDataX] = useState([0]);
  const [giroscopioDataY, setGiroscopioDataY] = useState([0]);

  const [acelerometroDataX, setAcelerometroDataX] = useState([0]);
  const [acelerometroDataY, setAcelerometroDataY] = useState([0]);

  const [frecuenciaDataX, setFrecuenciaDataX] = useState([0]);
  const [frecuenciaDataY, setFrecuenciaDataY] = useState([0]);

  const [isDataReady, setIsDataReady] = useState(false);
  const [grid, setGrid] = useState([]);
  const [data, setData] = useState([]);

  const sensores = confObj[0].emgs;

  const onClickProbar = () => {
    if (probando === false) {
      setProbando(true);
    }
  };
  const onClickBack = () => {
    navigate('/buscarPaciente');
    // if (probando === true) {
    //   setProbando(false);
    // }
  };
  const señales = {
    sensor0: '[]',
  };
  async function insertRegistro() {
    window.Bridge.insertRegistro(
      señales,
      '2022-01-20',
      usuario,
      nombreProtocolo
    );
  }
  window.Bridge.insertR((event: any, resp: any) => {
    if (resp[0] === 0) {
      console.log('Despacho error', resp[1]);
      appDispatch(setFailUpload(true));
      appDispatch(setIsLoading(false));
    } else {
      console.log('Correcto');
      appDispatch(setIsLoading(false));
      appDispatch(setIsUploaded(true));
      navigate('/verPaciente');
    }
  });
  const onClickGuardar = () => {
    insertRegistro();
  };

  const [dataXEmg1, setDataXEmg1] = useState([0]);
  const [dataYEmg1, setDataYEmg1] = useState([0]);
  const trace1 = {
    x: dataXEmg1,
    y: dataYEmg1,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'scatter',
    line: { color: 'black' },
    // marker: { color: colors1 },
    mode: 'markers+lines',
    name: 'EMG1',
  };

  const [dataX2Emg2, setDataX2Emg2] = useState([0]);
  const [dataY2Emg2, setDataY2Emg2] = useState([0]);
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
    // marker: { color: colors2 },
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
    // marker: { color: colors3 },
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
    // marker: { color: colors4 },
    mode: 'markers+lines',
    name: 'EMG4',
  };

  // const [dataX5, setDataX5] = useState([0]);
  // const [dataY5, setDataY5] = useState([0]);
  const trace5 = {
    x: giroscopioDataX,
    y: giroscopioDataY,
    xaxis: 'x5',
    yaxis: 'y5',
    type: 'scatter',
    mode: 'markers+lines',
    name: 'Giroscopio',
  };

  // const [dataX6, setDataX6] = useState([0]);
  // const [dataY6, setDataY6] = useState([0]);
  const trace6 = {
    x: frecuenciaDataX,
    y: frecuenciaDataY,
    xaxis: 'x6',
    yaxis: 'y6',
    type: 'scatter',
    mode: 'markers+lines',
    name: 'Frecuencia',
  };

  // const [dataX7, setDataX7] = useState([0]);
  // const [dataY7, setDataY7] = useState([0]);
  const trace7 = {
    x: acelerometroDataX,
    y: acelerometroDataY,
    xaxis: 'x7',
    yaxis: 'y7',
    type: 'scatter',
    mode: 'markers+lines',
    name: 'Acelerometro',
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

  const retrieveSignal = async () => {
    appDispatch(setIsLoading(true));

    appDispatch(setIsLoading(false));
    console.log('Señales', objetoMongo.signals);
    console.log('this is RespObj', objetoMongo);
    const { emg1 } = objetoMongo.signals;
    const { emg2 } = objetoMongo.signals;
    const { emg3 } = objetoMongo.signals;
    const { emg4 } = objetoMongo.signals;
    const { acelerometro } = objetoMongo.signals;
    const { giroscopio } = objetoMongo.signals;
    const { frecuencia } = objetoMongo.signals;

    const xArrayEmg1 = [];
    const yArrayEmg1 = [];

    const xArray2Emg2 = [];
    const yArray2Emg2 = [];

    const xArray3Emg3 = [];
    const yArray3Emg3 = [];

    const xArray4Emg4 = [];
    const yArray4Emg4 = [];

    const giroscopioSignalLocalX = [];
    const giroscopioSignalLocalY = [];

    const acelerometroSignalLocalX = [];
    const acelerometroSignalLocalY = [];

    const frecuenciaSignalLocalX = [];
    const frecuenciaSignalLocalY = [];

    for (let i = 0; i < emg1.length; i += 1) {
      if (sensoresSelected >= 1) {
        xArrayEmg1.push(emg1[i].x);
        yArrayEmg1.push(emg1[i].y);
      }
      if (sensoresSelected >= 2) {
        xArray2Emg2.push(emg2[i].x);
        yArray2Emg2.push(emg2[i].y);
      }
      if (sensoresSelected >= 3) {
        xArray3Emg3.push(emg3[i].x);
        yArray3Emg3.push(emg3[i].y);
      }
      if (sensoresSelected >= 4) {
        xArray4Emg4.push(emg4[i].x);
        yArray4Emg4.push(emg4[i].y);
      }

      if (giroscopioChecked) {
        console.log('giroscopio checked');
        giroscopioSignalLocalX.push(giroscopio[i].x);
        giroscopioSignalLocalY.push(giroscopio[i].y);
      }
      if (acelerometroChecked) {
        console.log('acelerometro checked');
        acelerometroSignalLocalX.push(acelerometro[i].x);
        acelerometroSignalLocalY.push(acelerometro[i].y);
      }
      if (frecuenciaChecked) {
        console.log('frecuencia checked');
        frecuenciaSignalLocalX.push(frecuencia[i].x);
        frecuenciaSignalLocalY.push(frecuencia[i].y);
      }
    }
    if (sensoresSelected >= 1) {
      console.log('This is x', xArrayEmg1);
      console.log('This is y', yArrayEmg1);
      setDataXEmg1(xArrayEmg1);
      setDataYEmg1(yArrayEmg1);
    }

    if (sensoresSelected >= 2) {
      setDataX2Emg2(xArray2Emg2);
      setDataY2Emg2(yArray2Emg2);
    }

    if (sensoresSelected >= 3) {
      setDataX3Emg3(xArray3Emg3);
      setDataY3Emg3(yArray3Emg3);
    }
    if (sensoresSelected >= 4) {
      setDataX4Emg4(xArray4Emg4);
      setDataY4Emg4(yArray4Emg4);
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
    if (frecuenciaChecked) {
      setFrecuenciaDataX(frecuenciaSignalLocalX);
      setFrecuenciaDataY(frecuenciaSignalLocalY);
    }
  };

  const numOfPlots = () => {
    const dataAux: any = [];
    if (sensoresSelected >= 1) {
      dataAux.push(trace1);
    }

    if (sensoresSelected >= 2) {
      dataAux.push(trace2);
    }

    if (sensoresSelected >= 3) {
      dataAux.push(trace3);
    }
    if (sensoresSelected >= 4) {
      dataAux.push(trace4);
    }
    if (giroscopioChecked) {
      dataAux.push(trace5);
    }
    if (frecuenciaChecked) {
      dataAux.push(trace6);
    }
    if (acelerometroChecked) {
      dataAux.push(trace7);
    }
    // setDataReady(dataArr);
    console.log('sensores', totalSensores);
    // impar aumenta las columns
    let dynamicRows = 0;
    let dynamicColumns = 0;

    if (totalSensores === 1) {
      dynamicRows = 1;
      dynamicColumns = 1;
    }
    if (totalSensores === 2) {
      dynamicRows = 1;
      dynamicColumns = 2;
    }
    if (totalSensores > 2 && totalSensores < 5) {
      dynamicRows = 2;
      dynamicColumns = 2;
    }
    if (totalSensores > 4 && totalSensores < 7) {
      dynamicRows = 2;
      dynamicColumns = 3;
    }
    if (totalSensores >= 7) {
      dynamicRows = 2;
      dynamicColumns = 4;
    }
    const objGrid = {
      rows: dynamicRows,
      columns: dynamicColumns,
      pattern: 'independent',
    };
    return [objGrid, dataAux];
  };

  useEffect(() => {
    retrieveSignal();
    const [gridLayoutAux, dataAux] = numOfPlots();
    setGrid(gridLayoutAux);
    setData(dataAux);
    setIsDataReady(true);
  }, []);
  if (isDataReady === false) {
    return <div />;
  }
  return (
    <div>
      <Resultados
        onClickGuardar={onClickGuardar}
        onClickProbar={onClickProbar}
        onClickBack={onClickBack}
        probando={probando}
        sensores={sensores}
        dataArr={data}
        gridLayout={grid}
      />
    </div>
  );
};

export default ResultadosContainer;
