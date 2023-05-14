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
  const ventanaSeñalEmg1 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg1
  );
  const ventanaSeñalEmg2 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg2
  );
  const ventanaSeñalEmg3 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg3
  );
  const ventanaSeñalEmg4 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg4
  );


  const ventanaSeñalGiroscopio = useCustomSelector(
    (state) => state.señales.ventanasArrayGiroscopio
  );
  const ventanaSeñalAcelerometro = useCustomSelector(
    (state) => state.señales.ventanasArrayAcelerometro
  );
  const ventanaSeñalFrecuencia = useCustomSelector(
    (state) => state.señales.ventanasArrayFrecuencia
  );

  const cantidadSensores = useCustomSelector(
    (state) => state.señales.cantidadSensores
  );
  const cantidadSujetos = useCustomSelector(
    (state) => state.señales.cantidadSujetosRespaldo
  );
  const selectedPatients = useCustomSelector(
    (state) => state.config.selectedPatients
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
  console.log('This was stored', ventanaSeñalEmg1);
  console.log('This was stored 2', ventanaSeñalEmg2);

  const ventanasArrayEmg1: any[] = [];
  const ventanasArrayEmg2: any[] = [];
  const ventanasArrayEmg3: any[] = [];
  const ventanasArrayEmg4: any[] = [];


  const ventanasArrayGiroscopio: any[] = [];
  const ventanasArrayAcelerometro: any[] = [];
  const ventanaArrayFrecuencia: any[] = [];

  let ventanaArrEmg1: any[] = [];
  let ventanaArrEmg2: any[] = [];
  let ventanaArrEmg3: any[] = [];
  let ventanaArrEmg4: any[] = [];
  let ventanaGiroscopio: any[] = [];
  let ventanaAcelerometro: any[] = [];
  let ventanaFrecuencia: any[] = [];

  // EMG1
  if (cantidadSensores >= 1) {
    for (let i = 0; i < cantidadSujetos; i += 1) {
      const largo = ventanaSeñalEmg1[i].length;
      ventanaArrEmg1 = [];
      for (let c = 0; c < largo; c += 1) {
        const { ventana, sumVentana } = getElementsAndSum(ventanaSeñalEmg1[i][c]);
        const mediaAbsoluta = (
          sumVentana / ventanaSeñalEmg1[i][c].length
        ).toString();
        ventanaArrEmg1.push([ventana, sumVentana, mediaAbsoluta]);
      }
      ventanasArrayEmg1.push(ventanaArrEmg1);
    }
  }

  // EMG2
  if (cantidadSensores >=2) {
    for (let i = 0; i < cantidadSujetos; i += 1) {
      const largo = ventanaSeñalEmg2[i].length;
      ventanaArrEmg2 = [];
      for (let c = 0; c < largo; c += 1) {
        const { ventana, sumVentana } = getElementsAndSum(ventanaSeñalEmg2[i][c]);
        const mediaAbsoluta = (
          sumVentana / ventanaSeñalEmg2[i][c].length
        ).toString();
        ventanaArrEmg2.push([ventana, sumVentana, mediaAbsoluta]);
      }
      ventanasArrayEmg2.push(ventanaArrEmg2);
    }
  }

  // EMG3
  if (cantidadSensores >=3) {
    for (let i = 0; i < cantidadSujetos; i += 1) {
      const largo = ventanaSeñalEmg3[i].length;
      ventanaArrEmg3 = [];
      for (let c = 0; c < largo; c += 1) {
        const { ventana, sumVentana } = getElementsAndSum(ventanaSeñalEmg3[i][c]);
        const mediaAbsoluta = (
          sumVentana / ventanaSeñalEmg3[i][c].length
        ).toString();
        ventanaArrEmg3.push([ventana, sumVentana, mediaAbsoluta]);
      }
      ventanasArrayEmg3.push(ventanaArrEmg3);
    }
  }

  // EMG4
  if (cantidadSensores >=4) {
    for (let i = 0; i < cantidadSujetos; i += 1) {
      const largo = ventanaSeñalEmg4[i].length;
      ventanaArrEmg4 = [];
      for (let c = 0; c < largo; c += 1) {
        const { ventana, sumVentana } = getElementsAndSum(ventanaSeñalEmg4[i][c]);
        const mediaAbsoluta = (
          sumVentana / ventanaSeñalEmg4[i][c].length
        ).toString();
        ventanaArrEmg4.push([ventana, sumVentana, mediaAbsoluta]);
      }
      ventanasArrayEmg4.push(ventanaArrEmg4);
    }
  }

  if (giroscopioChecked) {
    // GSR
    for (let i = 0; i < cantidadSujetos; i += 1) {
      const largo = ventanaSeñalGiroscopio[i].length;
      ventanaGiroscopio = [];
      for (let c = 0; c < largo; c += 1) {
        const { ventana, sumVentana } = getElementsAndSum(ventanaSeñalGiroscopio[i][c]);
        const mediaAbsoluta = (
          sumVentana / ventanaSeñalGiroscopio[i][c].length
        ).toString();
        ventanaGiroscopio.push([ventana, sumVentana, mediaAbsoluta]);
      }
      ventanasArrayGiroscopio.push(ventanaGiroscopio);
    }
  }

  if (frecuenciaChecked) {
    // SPO2
    for (let i = 0; i < cantidadSujetos; i += 1) {
      const largo = ventanaSeñalFrecuencia[i].length;
      ventanaFrecuencia = [];
      for (let c = 0; c < largo; c += 1) {
        const { ventana, sumVentana } = getElementsAndSum(ventanaSeñalFrecuencia[i][c]);
        const mediaAbsoluta = (
          sumVentana / ventanaSeñalFrecuencia[i][c].length
        ).toString();
        ventanaFrecuencia.push([ventana, sumVentana, mediaAbsoluta]);
      }
      ventanaArrayFrecuencia.push(ventanaFrecuencia);
    }
  }

  if (acelerometroChecked) {
    // TEMP
    for (let i = 0; i < cantidadSujetos; i += 1) {
      const largo = ventanaSeñalAcelerometro[i].length;
      ventanaAcelerometro = [];
      for (let c = 0; c < largo; c += 1) {
        const { ventana, sumVentana } = getElementsAndSum(ventanaSeñalAcelerometro[i][c]);
        const mediaAbsoluta = (
          sumVentana / ventanaSeñalAcelerometro[i][c].length
        ).toString();
        ventanaAcelerometro.push([ventana, sumVentana, mediaAbsoluta]);
      }
      ventanasArrayAcelerometro.push(ventanaAcelerometro);
    }
  }


  // console.log("Filled with", ventanasArrayEmg1)
  const componentArray: any[] = [];
  for (let i = 0; i < cantidadSujetos; i += 1) {
    componentArray.push(
      <div>
        <h3>{selectedPatients[i].col1}</h3>
        <TableContainer
          cantidadSensores={cantidadSensores}
          cantidadSensoresExtra={2}
          numeroDeSujeto={i}
          ventanasArrayEmg1={ventanasArrayEmg1}
          ventanasArrayEmg2={ventanasArrayEmg2}
          ventanasArrayEmg3={ventanasArrayEmg3}
          ventanasArrayEmg4={ventanasArrayEmg4}
          ventanasArrayGiroscopio={ventanasArrayGiroscopio}
          ventanasArrayAcelerometro={ventanasArrayAcelerometro}
          ventanaArrayFrecuencia={ventanaArrayFrecuencia}
          selectedPatients={selectedPatients}
          patientNumber={i}
          giroscopioChecked={giroscopioChecked}
          acelerometroChecked={acelerometroChecked}
          frecuenciaChecked={frecuenciaChecked}
        />
      </div>
    );
  }
  // const componentArray: any[] = []
  // componentArray.push(
  //   <h1>Test</h1>
  // )

  const OnClickNav = () => {
    // navigate('/preAnalisis');
    navigate('/guardarModelo');

    // navigate('/test');
  };
  const OnClickBack = () => {
    navigate('/entrenar');
  };
  return (
    <div>
      <CaracterizarParte2
        componentArray={componentArray}
        OnClickNav={OnClickNav}
        OnClickBack={OnClickBack}
      />
    </div>
  );
};

export default CaracterizarParte2Container;
