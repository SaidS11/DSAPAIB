/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import Plot from 'react-plotly.js';
import { Button } from '@mui/material';
import { useState } from 'react';
import {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';

const SensoresAdquisicion = ({
  sensoresSelected,
  onClickStart,
  onClickStop,
  data,
  dataXEmg1,
  dataYEmg1,
  dataXEmg2,
  dataYEmg2,
  dataXEmg3,
  dataYEmg3,
  dataXEmg4,
  dataYEmg4,
  dataXGsr,
  dataYGsr,
  dataXFrecuencia,
  dataYFrecuencia,
  dataXAcelerometro,
  dataYAcelerometro,
  onClickStopNew,
  onClickStartNew,
}) => {
  // const { onClickAdd } = props;
  /* const dataX = [];
  const dataY = [];
  console.log(dataX); */
  // const [dataXParam, setDataXParam] = useState([0]);
  // const [dataYParam, setDataYParam] = useState([0]);
  // console.log("Plot");
  const [dataX, setDataX] = useState([0]);
  const [dataY, setDataY] = useState([0]);
  const [localUpdater, setLocalUpdater] = useState(false);
  const [colors, setColors] = useState([
    '#00000',
    '#00000',
    '#00000',
    '#00000',
    '#00000',
    '#00000',
    '#00000',
    '#00000',
    '#00000',
  ]);
  const [color1, setColor1] = useState('red');
  // console.log("This is X", dataXEmg1);
  const trace1 = {
    x: dataXEmg1,
    y: dataYEmg1,
    type: 'scatter',
  };

  const [dataX2, setDataX2] = useState([0]);
  const [dataY2, setDataY2] = useState([0]);
  const trace2 = {
    x: dataXEmg2,
    y: dataYEmg2,
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter',
    // mode: 'lines+markers',
    // mode:'markers',
    line: { color: 'black' },
    // Wit each click a push to the colors array must be ,ade to keep adding colors
    // marker: { color: colors },
  };

  const [dataX3, setDataX3] = useState([0]);
  const [dataY3, setDataY3] = useState([0]);
  const trace3 = {
    x: dataXEmg3,
    y: dataYEmg3,
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter',
  };

  const [dataX4, setDataX4] = useState([0]);
  const [dataY4, setDataY4] = useState([0]);
  const trace4 = {
    x: dataXEmg4,
    y: dataYEmg4,
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

  // const dataArr = [
  //   trace1,
  //   trace2,
  //   trace3,
  //   trace4,
  //   trace5,
  //   trace6,
  //   trace7,
  //   trace8,
  // ];

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

  const numOfPlots = () => {
    const times = 8 - sensoresSelected;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < times; i++) {
      dataArr.pop();
    }
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
  const processSelections = (segment) => {
    let pn = '';
    let tn = '';
    const colorsL = [...colors];

    for (let i = 0; i < segment.points.length; i += 1) {
      pn = segment.points[i].pointNumber;
      tn = segment.points[i].curveNumber;
    }
    setColors([...colorsL]);
  };

  return (
    <div>
      <Plot
        data={dataArr}
        // data={[data]}
        layout={{
          title: 'Sensores',
          autosize: true,
          grid: gridLayout,
          dragmode: 'select',
        }}
        config={{ scrollZoom: true, displayModeBar: false }}
        useResizeHandler
        style={{ height: '100%', width: '100%' }}
        onSelected={(selection) => processSelections(selection)}
        // onRestyle={(d) => console.log('Res', d)}
        divId="myDiv"
      />
      <section className="display-center">
        <Button
          sx={styleButtonBiggerGreen}
          style={{ fontSize: '15px' }}
          onClick={onClickStart}
        >
          Comenzar Lectura
        </Button>
        <Button
          sx={styleButtonBiggerRed}
          style={{ fontSize: '15px' }}
          onClick={onClickStop}
        >
          Detener Lectura
        </Button>
      </section>
    </div>
  );
};

export default SensoresAdquisicion;
