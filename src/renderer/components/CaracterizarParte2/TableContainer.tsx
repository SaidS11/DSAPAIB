import React from 'react';
import { Column } from 'react-table';
import { useCustomSelector } from '../../../redux/hooks';
import Table from './Table';

interface SignalObj {
  x: number;
  y: number;
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
  } = props;
  // const ventanaSeñal1 = useCustomSelector(
  //   (state) => state.señales.ventanasArray
  // );
  // const ventanaSeñal2 = useCustomSelector(
  //   (state) => state.señales.ventanasArray2
  // );
  // const cantidadSensores = useCustomSelector(
  //   (state) => state.señales.cantidadSensores
  // );
  // const cantidadSujetos = useCustomSelector(
  //   (state) => state.señales.cantidadSujetosRespaldo
  // );

  // const { ventanaX1, sumVentana1 } = getElementsAndSum(ventanaSeñal1);
  // const mediaAbsoluta = (sumVentana1 / ventanaSeñal1.length).toString();
  // const { ventanaX1: ventanaX2, sumVentana1: sumVentana2 } =
  //   getElementsAndSum(ventanaSeñal2);
  // const mediaAbsoluta2 = (sumVentana2 / ventanaSeñal2.length).toString();

  // const ventanasArray: any[] = []
  // for(let i = 0; i < cantidadSujetos; i+=1) {
  //   const { ventana, sumVentana } = getElementsAndSum(ventanaSeñal1);
  //   const mediaAbsoluta = (sumVentana / ventanaSeñal1[i].length).toString();
  //   ventanasArray.push([ventana, sumVentana, mediaAbsoluta])

  // }

  interface Cols {
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
  }
  // const getData = () => {
  //   const objSensoresData: Cols[] = [];
  //   for(let i = 0; i < cantidadSujetos; i+=1) {
  //     if(cantidadSensores > 1) {
  //       const dataJson = {
  //         colMediaABSEMG1: ventanasArray[i][2] as string,
  //         colMedianaEMG1: calcularMediana(ventanasArray[i][0] as Array<number>),
  //         colRMSEMG1: calcularRms(ventanasArray[i][0] as Array<number>),
  //       }
  //       objSensoresData.push(dataJson)
  //     }
  //     if(cantidadSensores >= 2) {
  //       const dataJson = {
  //         colMediaABSEMG2: ventanasArray[i][2] as string,
  //         colMedianaEMG2: calcularMediana(ventanasArray[i][0] as Array<number>),
  //         colRMSEMG2: calcularRms(ventanasArray[i][0] as Array<number>),
  //       }
  //       objSensoresData.push(dataJson)
  //     }

  //   }
  //   return objSensoresData;
  // }
  console.log('Actual', ventanasArray);
  // const getData = () => {
  //   const objSensoresData: Cols[] = [];
  //   if(cantidadSensores > 1) {
  //     const dataJson = {
  //       colMediaABSEMG1: ventanasArray[numeroDeSujeto][0][2] as string,
  //       colMedianaEMG1: calcularMediana(ventanasArray[numeroDeSujeto][0][0] as Array<number>),
  //       colRMSEMG1: calcularRms(ventanasArray[numeroDeSujeto][0][0] as Array<number>),
  //     }
  //     console.log("Calculated1", dataJson)
  //     objSensoresData.push(dataJson)
  //   }
  //   if(cantidadSensores >= 2) {
  //     const dataJson = {
  //       colMediaABSEMG1: ventanasArray[numeroDeSujeto][1][2] as string,
  //       colMedianaEMG1: calcularMediana(ventanasArray[numeroDeSujeto][1][0] as Array<number>),
  //       colRMSEMG1: calcularRms(ventanasArray[numeroDeSujeto][1][0] as Array<number>),
  //     }
  //     console.log("Calculated2", dataJson)

  //     objSensoresData.push(dataJson)
  //   }
  //   return objSensoresData;
  // }

  const getData = () => {
    const objSensoresData: Cols[] = [];
    console.log('len', ventanasArray[numeroDeSujeto].length);
    for (let i = 0; i < ventanasArray[numeroDeSujeto].length; i += 1) {
      let dataJson = {};
      if (cantidadSensores === 2) {
        dataJson = {
          colMediaABSEMG1: ventanasArray[numeroDeSujeto][i][2] as string,
          colMedianaEMG1: calcularMediana(
            ventanasArray[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSEMG1: calcularRms(
            ventanasArray[numeroDeSujeto][i][0] as Array<number>
          ),
          colMediaABSEMG2: ventanasArray2[numeroDeSujeto][i][2] as string,
          colMedianaEMG2: calcularMediana(
            ventanasArray2[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSEMG2: calcularRms(
            ventanasArray2[numeroDeSujeto][i][0] as Array<number>
          ),
          colMediaABSGsr: ventanasArrayGsr[numeroDeSujeto][i][2] as string,
          colMedianaGsr: calcularMediana(
            ventanasArrayGsr[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSGsr: calcularRms(
            ventanasArrayGsr[numeroDeSujeto][i][0] as Array<number>
          ),
          colMediaABSTemp: ventanasArrayTemp[numeroDeSujeto][i][2] as string,
          colMedianaTemp: calcularMediana(
            ventanasArrayTemp[numeroDeSujeto][i][0] as Array<number>
          ),
          colRMSTemp: calcularRms(
            ventanasArrayTemp[numeroDeSujeto][i][0] as Array<number>
          ),
        };
      }
      console.log('Calculated1', dataJson);
      objSensoresData.push(dataJson);
    }

    return objSensoresData;
  };

  const parsedData = getData();
  console.log('Parsed', parsedData);
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
    // for (let i = 0; i < sizeSensoresExtra; i += 1) {
    //   console.log('Itera');
    //   internalArray.push({
    //     Header: sensoresExtraNames[i],
    //     columns: [
    //       {
    //         Header: 'Media absoluta',
    //         accessor: `colMediaABSEMG${i + 1}`,
    //       },
    //       {
    //         Header: 'Mediana',
    //         accessor: `colMedianaEMG${i + 1}`,
    //       },
    //       {
    //         Header: 'RMS',
    //         accessor: `colRMSEMG${i + 1}`,
    //       },
    //     ],
    //   });
    // }
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
