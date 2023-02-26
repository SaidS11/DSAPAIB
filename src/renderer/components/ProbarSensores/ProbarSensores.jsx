/* eslint-disable react/prop-types */
import Plot from 'react-plotly.js';
import './ProbarSensores.css';
import { Button } from '@mui/material';
import { useState } from 'react';
import styleButton, {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';

const ProbarSensores = ({
  sensoresSelected,
  onClickNav,
  onClickStop,
  dataXParam,
  dataYParam,
}) => {
  // const { onClickAdd } = props;
  /* const dataX = [];
  const dataY = [];
  console.log(dataX); */
  // const [dataXParam, setDataXParam] = useState([0]);
  // const [dataYParam, setDataYParam] = useState([0]);
  const [dataX, setDataX] = useState([0]);
  const [dataY, setDataY] = useState([0]);

  const trace1 = {
    x: dataXParam,
    y: dataYParam,
    type: 'scatter',
  };

  const [dataX2, setDataX2] = useState([0]);
  const [dataY2, setDataY2] = useState([0]);
  const trace2 = {
    x: dataX2,
    y: dataY2,
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter',
  };

  const [dataX3, setDataX3] = useState([0]);
  const [dataY3, setDataY3] = useState([0]);
  const trace3 = {
    x: dataX3,
    y: dataY3,
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter',
  };

  const [dataX4, setDataX4] = useState([0]);
  const [dataY4, setDataY4] = useState([0]);
  const trace4 = {
    x: dataX4,
    y: dataY4,
    xaxis: 'x4',
    yaxis: 'y4',
    type: 'scatter',
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

  console.log('llegaron', sensoresSelected);

  let numY = 0;
  let numX = 0;

  const onClickAdd = () => {
    numX = dataX.at(-1) + 2;
    numY = dataY.at(-1) + 1;
    console.log(dataX);

    setDataX(dataX.concat(numX));
    setDataY(dataY.concat(numY));

    setDataX2(dataX2.concat(numX + 3));
    setDataY2(dataY2.concat(numY + 1));

    setDataX3(dataX3.concat(numX + 10));
    setDataY3(dataY3.concat(numY));

    setDataX4(dataX4.concat(numX + 1));
    setDataY4(dataY4.concat(numY));

    setDataX5(dataX5.concat(numX + 12));
    setDataY5(dataY5.concat(numY));

    setDataX6(dataX6.concat(numX + 8));
    setDataY6(dataY6.concat(numY));

    setDataX7(dataX7.concat(numX + 9));
    setDataY7(dataY7.concat(numY + 3));

    setDataX8(dataX8.concat(numX + 5));
    setDataY8(dataY8.concat(numY));
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
  const gridLayout = numOfPlots();
  return (
    <div>
      <Plot
        data={dataArr}
        layout={{ title: 'Sensores', autosize: true, grid: gridLayout }}
        config={{ scrollZoom: true }}
        useResizeHandler
        style={{ height: '100%', width: '100%' }}
        // Idea de captura, tener almacenado de manera temporal los datos, cuando se presiona el boton se almacenan en un arreglo y hasta el final cuando se guarda se despachan
        onSelected={(sel) => console.log('Sele', sel)}
        // key={i}
      />
      <section className="display-center">
        <Button onClick={onClickAdd} sx={styleButton}>
          Presioname
        </Button>
        <Button
          sx={styleButtonBiggerGreen}
          style={{ fontSize: '30px' }}
          onClick={onClickNav}
        >
          Comenzar
        </Button>
        <Button
          sx={styleButtonBiggerGreen}
          style={{ fontSize: '30px' }}
          onClick={onClickStop}
        >
          Parar
        </Button>
      </section>
    </div>
  );
};

export default ProbarSensores;
