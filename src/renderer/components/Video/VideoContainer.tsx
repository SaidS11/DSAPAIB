// eslint-disable-next-line import/no-named-as-default
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  setSignalsToStore,
  setSignalsXGraph,
  setSignalsYGraph,
} from 'redux/slices/SeñalesSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import ProbarSensoresContainer from '../ProbarSensores/ProbarSensoresContainer';

import Video from './Video';
import SensoresAdquisicionContainer from '../SensoresAdquisicion/SensoresAdquisicionContainer';

interface ConfLocal {
  emgs: number;
}

const VideoContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const appDispatch = useCustomDispatch();

  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );
  const sensoresSelected = useCustomSelector(
    (state) => state.señales.cantidadSensores
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

  const confObj = useCustomSelector(
    (state) => state.config.configCompleta
  ) as Array<ConfLocal>;
  const sensores = confObj[0].emgs;

  const onClickNav = async () => {
    setShouldStop(true);
    const resp = await window.electron.ipcRenderer.sensoStop();
    navigate('/procesamientoPrevio');
  };

  const onClickCancel = () => {
    navigate('/videoDemo');
  };

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
      <SensoresAdquisicionContainer mode={"LIVE"} shouldStop={shouldStop}/>
    </div>
  );
};

export default VideoContainer;
