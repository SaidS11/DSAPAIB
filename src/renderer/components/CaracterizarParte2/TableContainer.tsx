/* eslint-disable no-return-assign */
import React, { useEffect } from 'react';
import { Column } from 'react-table';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import Table from './Table';
import { SelectedPatientObj } from '../Utilities/Constants';
import { setDatosAnalisisIA } from '../../../redux/slices/SeñalesSlice';

interface SignalObj {
  x: number;
  y: number;
}

interface Cols {
  nombre?: string;
  // EMG's
  colMediaABSEMG1?: string;
  colMedianaEMG1?: string;
  colRMSEMG1?: string;

  colMediaABSEMG2?: string;
  colMedianaEMG2?: string;
  colRMSEMG2?: string;
  // TEMP
  colMediaABSTemp?: string;
  colMedianaTemp?: string;
  colRMSTemp?: string;
  // GSR
  colMediaABSGsr?: string;
  colMedianaGsr?: string;
  colRMSGsr?: string;

  // Clase
  etiqueta?: string;
}

function calcularMediana(datos: Array<number>) {
  // Ordena el conjunto de datos
  datos.sort(function (a, b) {
    return a - b;
  });

  // Calcula la mediana
  let mediana;
  const mitad = Math.floor(datos.length / 2);

  if (datos.length % 2 !== 0) {
    mediana = datos[mitad];
  } else {
    mediana = (datos[mitad - 1] + datos[mitad]) / 2;
  }

  return mediana.toString();
}

function calcularRms(datos: Array<number>) {
  // Calcula la suma de los cuadrados de todos los elementos
  const sumaCuadrados = datos.reduce(function (acumulador, valorActual) {
    // eslint-disable-next-line no-restricted-properties
    return acumulador + Math.pow(valorActual, 2);
  }, 0);

  // Calcula la RMS
  const rms = Math.sqrt(sumaCuadrados / datos.length);

  return rms.toFixed(2);
}
function getElementsAndSum(ventanas: any) {
  const ventana: Array<number> = [];
  let sumVentana = 0;
  ventanas
    .map((element: SignalObj) => {
      Math.abs(element.x);
      Math.abs(element.y);
      ventana.push(element.y);
      return element;
    })
    .map((element: SignalObj) => {
      // Calculos solamente con el eje x
      sumVentana += element.y;
      return element;
    });
  return { ventana, sumVentana };
}

interface TableContainerProps {
  cantidadSensores: number;
  cantidadSensoresExtra: number;
  numeroDeSujeto: number;
  ventanasArray: any;
  ventanasArray2: any;
  ventanasArrayGsr: any;
  ventanasArrayTemp: any;
  selectedPatients: Array<SelectedPatientObj>;
  patientNumber: number;
}
const TableContainer = (props: TableContainerProps) => {
  const {
    cantidadSensores,
    cantidadSensoresExtra,
    numeroDeSujeto,
    ventanasArray,
    ventanasArray2,
    ventanasArrayGsr,
    ventanasArrayTemp,
    selectedPatients,
    patientNumber,
  } = props;

  const appDispatch = useCustomDispatch();

  console.log('Actual', ventanasArray);

  const returnFixed = (num: string) => {
    let localNum;
    if (num.includes('.')) {
      localNum = parseFloat(num);
      localNum = localNum.toFixed(2);
    } else {
      localNum = parseInt(num, 10);
    }
    return localNum;
  };
  const getData = () => {
    const objSensoresData: Cols[] = [];
    console.log('len', ventanasArray[numeroDeSujeto].length);
    for (let i = 0; i < ventanasArray[numeroDeSujeto].length; i += 1) {
      console.log(
        'test',
        numeroDeSujeto,
        i,
        ventanasArray[numeroDeSujeto][i][2] as string
      );
      console.log('test2', returnFixed(ventanasArray[numeroDeSujeto][i][2]));
      let dataJson = {};
      if (cantidadSensores === 2) {
        dataJson = {
          colMediaABSEMG1: returnFixed(
            ventanasArray[numeroDeSujeto][i][2]
          ) as string,
          colMedianaEMG1: calcularMediana(
            ventanasArray[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSEMG1: calcularRms(
            ventanasArray[numeroDeSujeto][i][0] as Array<number>
          ),
          colMediaABSEMG2: returnFixed(
            ventanasArray2[numeroDeSujeto][i][2]
          ) as string,
          colMedianaEMG2: calcularMediana(
            ventanasArray2[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSEMG2: calcularRms(
            ventanasArray2[numeroDeSujeto][i][0] as Array<number>
          ),
          colMediaABSGsr: returnFixed(
            ventanasArrayGsr[numeroDeSujeto][i][2]
          ) as string,
          colMedianaGsr: calcularMediana(
            ventanasArrayGsr[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSGsr: calcularRms(
            ventanasArrayGsr[numeroDeSujeto][i][0] as Array<number>
          ),
          colMediaABSTemp: returnFixed(
            ventanasArrayTemp[numeroDeSujeto][i][2]
          ) as string,
          colMedianaTemp: calcularMediana(
            ventanasArrayTemp[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSTemp: calcularRms(
            ventanasArrayTemp[numeroDeSujeto][i][0] as Array<number>
          ),
          etiqueta: selectedPatients[patientNumber].col2,
        };
      }
      console.log('Calculated1', dataJson);
      objSensoresData.push(dataJson);
    }

    return objSensoresData;
  };

  const parsedData = getData();
  console.log('Parsed', parsedData);

  useEffect(() => {
    const reduxData: Array<Cols> = [];
    // reduxData.push({ nombre: selectedPatients[patientNumber].col1 })
    console.log('DATA', selectedPatients[patientNumber].col1);
    console.log('ele', reduxData);
    parsedData.map((ele) => reduxData.push(ele));
    console.log('ele2', reduxData);
    reduxData.map((ele) => (ele.nombre = selectedPatients[patientNumber].col1));
    appDispatch(setDatosAnalisisIA(reduxData));
    console.log('This is rdx', reduxData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = React.useMemo(
    (): Cols[] => [...parsedData],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sensoresNames = ['EMG1', 'EMG2'];
  const sensoresExtraNames = ['GSR Promedio', 'Temperatura Promedio'];
  const getColumns = (sizeEMG: number, sizeSensoresExtra: number) => {
    const internalArray: Array<Column> = [];
    for (let i = 0; i < sizeEMG; i += 1) {
      console.log('Itera');
      internalArray.push({
        Header: sensoresNames[i],
        columns: [
          {
            Header: 'Media absoluta',
            accessor: `colMediaABSEMG${i + 1}`,
          },
          {
            Header: 'Mediana',
            accessor: `colMedianaEMG${i + 1}`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSEMG${i + 1}`,
          },
        ],
      });
    }
    internalArray.push({
      Header: 'GSR Promedio',
      columns: [
        {
          Header: 'Media absoluta',
          accessor: `colMediaABSGsr`,
        },
        {
          Header: 'Mediana',
          accessor: `colMedianaGsr`,
        },
        {
          Header: 'RMS',
          accessor: `colRMSGsr`,
        },
      ],
    });
    internalArray.push({
      Header: 'Temperatura Promedio',
      columns: [
        {
          Header: 'Media absoluta',
          accessor: `colMediaABSTemp`,
        },
        {
          Header: 'Mediana',
          accessor: `colMedianaTemp`,
        },
        {
          Header: 'RMS',
          accessor: `colRMSTemp`,
        },
      ],
    });
    internalArray.push({
      Header: 'Etiqueta',
      columns: [
        {
          Header: 'Clase',
          accessor: 'etiqueta',
        },
      ],
    });
    return internalArray;
  };
  const columns = getColumns(cantidadSensores, cantidadSensoresExtra);
  console.log('these are co', columns);
  const options = {
    data,
    columns,
  };
  return (
    <div>
      <Table options={options} />
    </div>
  );
};

export default TableContainer;
