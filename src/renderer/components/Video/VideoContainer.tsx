// eslint-disable-next-line import/no-named-as-default
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import { setSignalsToStore, setSignalsXGraph, setSignalsYGraph } from 'redux/slices/SeñalesSlice';
import Video from './Video';

interface ConfLocal {
  emgs: number
}

function parseSignalsIntoObjects (xAr: Array<number>, yAr: Array<number>) {
  const parsedArr = xAr.map((xValue, index) => {
      return { x: xValue, y: yAr[index] };
    });
  return parsedArr;
}
const VideoContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const appDispatch = useCustomDispatch();

  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );
  const sensoresSelected= useCustomSelector(
    (state) => state.señales.cantidadSensores
  );
  const giroscopioChecked= useCustomSelector(
    (state) => state.señales.giroscopioIsChecked
  );
  const acelerometroChecked= useCustomSelector(
    (state) => state.señales.acelerometroIsChecked
  );
  const frecuenciaChecked= useCustomSelector(
    (state) => state.señales.frecuenciaIsChecked
  );
  
 
  const xEmg1 = [1, 2, 3, 4, 5];
  const yEmg1 = [2, 4, 6, 8, 10];


  const confObj = useCustomSelector((state) => state.config.configCompleta) as Array<ConfLocal>;
  const sensores = confObj[0].emgs;
  const onClickNav = () => {


    const signalsXTotales = []
    const signals = {}
    if (sensoresSelected >= 1) {
      Object.assign(signals, {
        "emg1": parseSignalsIntoObjects(xEmg1, yEmg1)
     });
      // signals.push({"emg1": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if (sensoresSelected >= 2) {
      Object.assign(signals, {
        "emg2": parseSignalsIntoObjects(xEmg1, yEmg1)
     });
      // signals.push({"emg2": parseSignalsIntoObjects(xEmg1, yEmg1)});

    }

    if (sensoresSelected >= 3) {
      Object.assign(signals, {
        "emg3": parseSignalsIntoObjects(xEmg1, yEmg1)
     });
      // signals.push({"emg3": parseSignalsIntoObjects(xEmg1, yEmg1)});

    }

    if (sensoresSelected >= 4) {
      Object.assign(signals, {
        "emg4": parseSignalsIntoObjects(xEmg1, yEmg1)
     });
      // signals.push({"emg4": parseSignalsIntoObjects(xEmg1, yEmg1)});

    }

    if (giroscopioChecked) {
      Object.assign(signals, {
        "giroscopio": parseSignalsIntoObjects(xEmg1, yEmg1)
     });
      // signals.push({"giroscopio": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if(acelerometroChecked) {
      Object.assign(signals, {
        "acelerometro": parseSignalsIntoObjects(xEmg1, yEmg1)
     });
      // signals.push({"acelerometro": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }

    if (frecuenciaChecked) {
      Object.assign(signals, {
        "frecuencia": parseSignalsIntoObjects(xEmg1, yEmg1)
     });
      // signals.push({"frecuencia": parseSignalsIntoObjects(xEmg1, yEmg1)});
    }
    appDispatch(setSignalsToStore(signals))
    navigate('/procesamientoPrevio');
  };
  const onClickCancel = () => {
    navigate('/videoDemo');

  }
  const onClickProbar = () => {
    if (probando === false) {
      setProbando(true);
    }
  };
  const onClickDetener = () => {
    if (probando === true) {
      setProbando(false);
    }
  };
  const video = document.getElementById('myVideo') as HTMLMediaElement | null;
  if (video === null) {
    console.log('Es nulo');
  } else {
    console.log('Es', video);
  }
  video?.addEventListener('play', (event) => {
    console.log(
      'The Boolean paused property is now false. Either the ' +
        'play() method was called or the autoplay attribute was toggled.'
    );
  });
  const url = `${multimediaObj[0].link_video}`;







  useEffect(() => {
    console.log('updated');
    // startSensors()
    // Metodo refinado de probar sensores
    // Se iran llenando los diferentes sensores con el set Correspondiente para
    // que en la funcion final se recolecten esos datos y se incluyan al arreglo general de señales
  }, [video]);
  return (
    <div>
      <Video
        onClickNav={onClickNav}
        url={url}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        probando={probando}
        sensores={sensores}
        onClickCancel={onClickCancel}
      />
    </div>
  );
};

export default VideoContainer;
