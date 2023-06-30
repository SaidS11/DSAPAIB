import Plot from 'react-plotly.js';
import SensoresAdquisicionGraficar from './SensoresAdquisicionGraficar';
import { numOfPlotsToRender } from '../Utilities/Constants';
import { useState } from 'react';

interface SensoresGraficaContainerInterfcace {
    cantidadEmgs: number;
    emgData: any;
}

const SensoresAdquisicionGraficarContainer = (props: SensoresGraficaContainerInterfcace) => {
    const { cantidadEmgs, emgData } = props;
    console.log("Cantidad", cantidadEmgs)
    console.log("Data", emgData);

    const gridLayout = numOfPlotsToRender(cantidadEmgs);

    let dataYEmg1;
    let dataXEmg1;

    let dataY2Emg2;
    let dataX2Emg2;
    
    let dataY3Emg3;
    let dataX3Emg3;
    
    let dataY4Emg4;
    let dataX4Emg4;


    if(cantidadEmgs >= 1) {
        dataYEmg1 = emgData.EMG1
        dataXEmg1 = Array.from({ length: dataYEmg1.length }, (_, i) => i);
    }

    if(cantidadEmgs >= 2) {
        dataY2Emg2 = emgData.EMG2
        dataX2Emg2 = Array.from({ length: dataY2Emg2.length }, (_, i) => i);
    }

    if(cantidadEmgs >= 3) {
        dataY3Emg3 = emgData.EMG2
        dataX3Emg3 = Array.from({ length: dataY3Emg3.length }, (_, i) => i);
    }

    if(cantidadEmgs >= 4) {
        dataY4Emg4 = emgData.EMG1
        dataX4Emg4 = Array.from({ length: dataY4Emg4.length }, (_, i) => i);
    }

    // Implememtar if para cuando los datos no tienen el mismo largo
    // dataArr.psuh

    const trace1 = {
    x: dataXEmg1,
    y: dataYEmg1,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'scatter',
    line: { color: 'black' },
    mode: 'markers+lines',
    name: 'EMG1',
    };

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
    mode: 'markers+lines',
    name: 'EMG2',
    };

    const trace3 = {
    x: dataX3Emg3,
    y: dataY3Emg3,
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter',
    line: { color: 'yellow' },
    mode: 'markers+lines',
    name: 'EMG3',
    };


    const trace4 = {
    x: dataX4Emg4,
    y: dataY4Emg4,
    xaxis: 'x4',
    yaxis: 'y4',
    type: 'scatter',
    line: { color: 'green' },
    mode: 'markers+lines',
    name: 'EMG4',
    };

    const dataArr = [
        trace1,
        trace2,
        trace3,
        trace4,
      ];

  return <SensoresAdquisicionGraficar gridLayout={gridLayout} dataArr={dataArr}/>;
};

export default SensoresAdquisicionGraficarContainer;
