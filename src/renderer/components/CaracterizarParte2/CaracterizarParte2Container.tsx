import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import CaracterizarParte2 from './CaracterizarParte2';
import TableContainer from './TableContainer';

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
// Change how element x and element y are stored on the prev array, it shouldn't be like the current form
function getElementsAndSum(ventanas: any) {
  // console.log("recibi esto", ventanas);
  const ventana: Array<number> = [];
  let sumVentana = 0;
  ventanas
    .map((element: SignalObj) => {
      Math.abs(element.x);
      Math.abs(element.y);
      // console.log("pusheando", element.x);
      ventana.push(element.x);
      return element;
    })
    .map((element: SignalObj) => {
      // Calculos solamente con el eje x
      sumVentana += element.x;
      return element;
    });
  // console.log("retornando", ventana, sumVentana);
  return { ventana, sumVentana };
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
  const cantidadSujetos = useCustomSelector(
    (state) => state.señales.cantidadSujetosRespaldo
  );
  console.log('This was stored', ventanaSeñal1);
  console.log('This was stored 2', ventanaSeñal2);

  const ventanasArray1: any[] = [];
  const ventanasArray2: any[] = [];

  // for(let i = 0; i < cantidadSujetos; i+=1) {
  //   const { ventana, sumVentana } = getElementsAndSum(ventanaSeñal1[i]);
  //   const mediaAbsoluta = (sumVentana / ventanaSeñal1[i].length).toString();
  //   ventanasArray.push([ventana, sumVentana, mediaAbsoluta])

  // }
  let ventanaAr: any[] = [];
  let ventanaAr2: any[] = [];

  for (let i = 0; i < cantidadSujetos; i += 1) {
    const largo = ventanaSeñal1[i].length;
    ventanaAr = [];
    for (let c = 0; c < largo; c += 1) {
      const { ventana, sumVentana } = getElementsAndSum(ventanaSeñal1[i][c]);
      const mediaAbsoluta = (
        sumVentana / ventanaSeñal1[i][c].length
      ).toString();
      ventanaAr.push([ventana, sumVentana, mediaAbsoluta]);
    }
    ventanasArray1.push(ventanaAr);
  }
  for (let i = 0; i < cantidadSujetos; i += 1) {
    const largo = ventanaSeñal2[i].length;
    ventanaAr2 = [];
    for (let c = 0; c < largo; c += 1) {
      const { ventana, sumVentana } = getElementsAndSum(ventanaSeñal2[i][c]);
      const mediaAbsoluta = (
        sumVentana / ventanaSeñal2[i][c].length
      ).toString();
      ventanaAr2.push([ventana, sumVentana, mediaAbsoluta]);
    }
    ventanasArray2.push(ventanaAr2);
  }
  // console.log("Filled with", ventanasArray1)
  const componentArray: any[] = [];
  for (let i = 0; i < cantidadSujetos; i += 1) {
    componentArray.push(
      <div>
        <h3>Sujeto {i + 1}</h3>
        <TableContainer
          cantidadSensores={cantidadSensores}
          numeroDeSujeto={i}
          ventanasArray={ventanasArray1}
          ventanasArray2={ventanasArray2}
        />
      </div>
    );
  }
  // const componentArray: any[] = []
  // componentArray.push(
  //   <h1>Test</h1>
  // )
  return (
    <div>
      <CaracterizarParte2 componentArray={componentArray} />
    </div>
  );
};

export default CaracterizarParte2Container;
