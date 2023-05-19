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

  colMediaABSEMG3?: string;
  colMedianaEMG3?: string;
  colRMSEMG3?: string;

  colMediaABSEMG4?: string;
  colMedianaEMG4?: string;
  colRMSEMG4?: string;
  // TEMP
  colMediaABSAcelerometro?: string;
  colMedianaAcelerometro?: string;
  colRMSAcelerometro?: string;
  // GSR
  colMediaABSGiroscopio?: string;
  colMedianaGiroscopio?: string;
  colRMSGiroscopio?: string;

  // SPO2
  colMediaABSFrecuencia?: string;
  colMedianaFrecuencia?: string;
  colRMSFrecuencia?: string;

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
  ventanasArrayEmg1: any;
  ventanasArrayEmg2: any;
  ventanasArrayEmg3: any;
  ventanasArrayEmg4: any;
  ventanasArrayGiroscopio: any;
  ventanasArrayAcelerometro: any;
  ventanaArrayFrecuencia: any;
  selectedPatients: Array<SelectedPatientObj>;
  patientNumber: number;
  giroscopioChecked: boolean;
  acelerometroChecked: boolean;
  frecuenciaChecked: boolean;
}
const TableContainer = (props: TableContainerProps) => {
  const {
    cantidadSensores,
    cantidadSensoresExtra,
    numeroDeSujeto,
    ventanasArrayEmg1,
    ventanasArrayEmg2,
    ventanasArrayEmg3,
    ventanasArrayEmg4,
    ventanasArrayGiroscopio,
    ventanasArrayAcelerometro,
    ventanaArrayFrecuencia,
    selectedPatients,
    patientNumber,
    giroscopioChecked,
    acelerometroChecked,
    frecuenciaChecked,
  } = props;

  const appDispatch = useCustomDispatch();

  console.log('Actual', ventanasArrayEmg1);

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
    console.log('len', ventanasArrayEmg1[numeroDeSujeto].length);
    for (let i = 0; i < ventanasArrayEmg1[numeroDeSujeto].length; i += 1) {
      console.log(
        'test',
        numeroDeSujeto,
        i,
        ventanasArrayEmg1[numeroDeSujeto][i][2] as string
      );
      console.log(
        'test2',
        returnFixed(ventanasArrayEmg1[numeroDeSujeto][i][2])
      );
      const dataJson = {};
      if (cantidadSensores >= 1) {
        Object.assign(dataJson, {
          colMediaABSEMG1: returnFixed(
            ventanasArrayEmg1[numeroDeSujeto][i][2]
          ) as string,
          colMedianaEMG1: calcularMediana(
            ventanasArrayEmg1[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSEMG1: calcularRms(
            ventanasArrayEmg1[numeroDeSujeto][i][0] as Array<number>
          ),
        });
      }
      if (cantidadSensores >= 2) {
        Object.assign(dataJson, {
          colMediaABSEMG2: returnFixed(
            ventanasArrayEmg2[numeroDeSujeto][i][2]
          ) as string,
          colMedianaEMG2: calcularMediana(
            ventanasArrayEmg2[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSEMG2: calcularRms(
            ventanasArrayEmg2[numeroDeSujeto][i][0] as Array<number>
          ),
        });
      }
      if (cantidadSensores >= 3) {
        Object.assign(dataJson, {
          colMediaABSEMG3: returnFixed(
            ventanasArrayEmg3[numeroDeSujeto][i][2]
          ) as string,
          colMedianaEMG3: calcularMediana(
            ventanasArrayEmg3[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSEMG3: calcularRms(
            ventanasArrayEmg3[numeroDeSujeto][i][0] as Array<number>
          ),
        });
      }
      if (cantidadSensores >= 4) {
        Object.assign(dataJson, {
          colMediaABSEMG4: returnFixed(
            ventanasArrayEmg4[numeroDeSujeto][i][2]
          ) as string,
          colMedianaEMG4: calcularMediana(
            ventanasArrayEmg4[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSEMG4: calcularRms(
            ventanasArrayEmg4[numeroDeSujeto][i][0] as Array<number>
          ),
        });
      }
      if (giroscopioChecked) {
        Object.assign(dataJson, {
          colMediaABSGiroscopio: returnFixed(
            ventanasArrayGiroscopio[numeroDeSujeto][i][2]
          ) as string,
          colMedianaGiroscopio: calcularMediana(
            ventanasArrayGiroscopio[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSGiroscopio: calcularRms(
            ventanasArrayGiroscopio[numeroDeSujeto][i][0] as Array<number>
          ),
        });
      }
      if (acelerometroChecked) {
        Object.assign(dataJson, {
          colMediaABSAcelerometro: returnFixed(
            ventanasArrayAcelerometro[numeroDeSujeto][i][2]
          ) as string,
          colMedianaAcelerometro: calcularMediana(
            ventanasArrayAcelerometro[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSAcelerometro: calcularRms(
            ventanasArrayAcelerometro[numeroDeSujeto][i][0] as Array<number>
          ),
        });
      }

      if (frecuenciaChecked) {
        Object.assign(dataJson, {
          colMediaABSFrecuencia: returnFixed(
            ventanaArrayFrecuencia[numeroDeSujeto][i][2]
          ) as string,
          colMedianaFrecuencia: calcularMediana(
            ventanaArrayFrecuencia[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSFrecuencia: calcularRms(
            ventanaArrayFrecuencia[numeroDeSujeto][i][0] as Array<number>
          ),
        });
      }

      Object.assign(dataJson, {
        etiqueta: selectedPatients[patientNumber].col2,
      });
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

  const sensoresNames = ['EMG1', 'EMG2', 'EMG3', 'EMG4'];
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
    if (giroscopioChecked) {
      internalArray.push({
        Header: 'GSR Promedio',
        columns: [
          {
            Header: 'Media absoluta',
            accessor: `colMediaABSGiroscopio`,
          },
          {
            Header: 'Mediana',
            accessor: `colMedianaGiroscopio`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSGiroscopio`,
          },
        ],
      });
    }
    if (acelerometroChecked) {
      internalArray.push({
        Header: 'Acelerometro Promedio',
        columns: [
          {
            Header: 'Media absoluta',
            accessor: `colMediaABSAcelerometro`,
          },
          {
            Header: 'Mediana',
            accessor: `colMedianaAcelerometro`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSAcelerometro`,
          },
        ],
      });
    }
    if (frecuenciaChecked) {
      internalArray.push({
        Header: 'Frecuencia Promedio',
        columns: [
          {
            Header: 'Media absoluta',
            accessor: `colMediaABSFrecuencia`,
          },
          {
            Header: 'Mediana',
            accessor: `colMedianaFrecuencia`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSFrecuencia`,
          },
        ],
      });
    }
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
