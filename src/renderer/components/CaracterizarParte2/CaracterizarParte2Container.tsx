import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import CaracterizarParte2 from './CaracterizarParte2';

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
  const ventanaX1: Array<number> = [];
  let sumVentana1 = 0;
  ventanas
    .map((element: SignalObj) => {
      Math.abs(element.x);
      Math.abs(element.y);
      ventanaX1.push(element.y);
      return element;
    })
    .map((element: SignalObj) => {
      // Calculos solamente con el eje x
      sumVentana1 += element.y;
      return element;
    });
  return { ventanaX1, sumVentana1 };
}
const CaracterizarParte2Container = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const ventanaSeñal1 = useCustomSelector(
    (state) => state.señales.ventanasArray
  );
  const ventanaSeñal2 = useCustomSelector(
    (state) => state.señales.ventanasArray2
  );
  const cantidadSensores = useCustomSelector(
    (state) => state.señales.cantidadSensores
  );
  console.log('Primera ventana', ventanaSeñal1);
  console.log('Segunda ventana', ventanaSeñal2);
  // let sumVentana1 = 0;
  // const ventanaX1: Array<number> =[];
  // const ventana1MediaAbsoluta = ventanaSeñal1.map((element: SignalObj) => {
  //   Math.abs(element.x);
  //   ventanaX1.push(element.x);
  //   Math.abs(element.y);
  //   return element;
  // }).map((element: SignalObj) => {
  //   // Calculos solamente con el eje x
  //   sumVentana1 += element.x;
  //   return element;
  // });
  const { ventanaX1, sumVentana1 } = getElementsAndSum(ventanaSeñal1);
  console.log('Returned', ventanaX1, sumVentana1);
  // const {ventanaX2, sumVentana2} = getElementsAndSum(ventanaSeñal2);
  console.log('Sum', sumVentana1);
  const mediaAbsoluta = (sumVentana1 / ventanaSeñal1.length).toString();
  const { ventanaX1: ventanaX2, sumVentana1: sumVentana2 } =
    getElementsAndSum(ventanaSeñal2);
  const mediaAbsoluta2 = (sumVentana2 / ventanaSeñal2.length).toString();
  interface Cols {
    col1MediaABS: string;
    col1Mediana: string;
    col1RMS: string;
    col2MediaABS: string;
    col2Mediana: string;
    col2RMS: string;
  }

  const data = React.useMemo(
    (): Cols[] => [
      {
        col1MediaABS: mediaAbsoluta,
        col1Mediana: calcularMediana(ventanaX1 as Array<number>),
        col1RMS: calcularRms(ventanaX1 as Array<number>),
        col2MediaABS: mediaAbsoluta2,
        col2Mediana: calcularMediana(ventanaX2 as Array<number>),
        col2RMS: calcularRms(ventanaX2 as Array<number>),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  // const getData = (size: number) => {
  //   const internalData = []
  //   for (let i = 0; i< size; i+=1) {
  //     internalData.push({
  //       col1MediaABS: mediaAbsoluta,
  //       col2MediaABS: "0",
  //       col1Mediana: calcularMediana(ventanaX1 as Array<number>),
  //       col1RMS: calcularRms(ventanaX1 as Array<number>),
  //       // [`col${i+1}MediaABS`]: mediaAbsoluta,
  //       // [`col${i+1}Mediana`]: calcularMediana(ventanaX1 as Array<number>),
  //       // [`col${i+1}RMS`]: calcularRms(ventanaX1 as Array<number>),
  //     })
  //   }
  // }
  // const data = getData(cantidadSensores);
  // const columns: Array<Column<{ col1MediaABS: string }>> = React.useMemo(
  //   () => [
  //     {
  //       Header: 'Señal 1',
  //       columns: [
  //         {
  //           Header: 'Media absoluta',
  //           accessor: "col1MediaABS",
  //         },
  //         {
  //           Header: 'Mediana',
  //           accessor: "col1Mediana",
  //         },
  //         {
  //           Header: 'RMS',
  //           accessor: "col1RMS",
  //         }
  //       ]
  //     },
  //     {
  //       Header: 'Señal 2',
  //       columns: [
  //         {
  //           Header: 'Media absoluta',
  //           accessor: "col2MediaABS",
  //         },
  //         {
  //           Header: 'Mediana',
  //           accessor: "col2Mediana",
  //         },
  //         {
  //           Header: 'RMS',
  //           accessor: "col2RMS",
  //         }
  //       ]
  //     },
  //   ],
  //   []
  // );

  const sensoresNames = [
    'GSR',
    'Temp',
    'SP02',
    'Test1',
    'Test2',
    'Test3',
    'Test4',
    'Test5',
  ];
  const getColumns = (size: number) => {
    const internalArray: Array<Column> = [];
    for (let i = 0; i < size; i += 1) {
      console.log('Itera');
      internalArray.push({
        Header: sensoresNames[i],
        columns: [
          {
            Header: 'Media absoluta',
            accessor: `col${i + 1}MediaABS`,
          },
          {
            Header: 'Mediana',
            accessor: `col${i + 1}Mediana`,
          },
          {
            Header: 'RMS',
            accessor: `col${i + 1}RMS`,
          },
        ],
      });
    }
    return internalArray;
  };
  const columns = getColumns(cantidadSensores);
  // const [columns, setColumns] = useState<typeof defColumns> (() => [
  //   ...defColumns
  // ])
  // console.log("Tgese def", defColumns);
  console.log('these are co', columns);
  const options = {
    data,
    columns,
  };
  return (
    <div>
      <CaracterizarParte2 options={options} />
    </div>
  );
};

export default CaracterizarParte2Container;
