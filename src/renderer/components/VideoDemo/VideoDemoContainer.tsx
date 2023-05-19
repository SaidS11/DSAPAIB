// eslint-disable-next-line import/no-named-as-default
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import {
  setCantidadSensores,
  setGiroscopioIsChecked,
  setFrecuenciaIsChecked,
  setAcelerometroIsChecked,
  setExtraSensorsChecked,
} from '../../../redux/slices/SeñalesSlice';
import VideoDemo from './VideoDemo';

interface ConfLocal {
  emgs: number;
}
const VideoDemoContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  const [probando, setProbando] = useState(false);
  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );
  const selectedProtocol = useCustomSelector(
    (state) => state.config.protocoloNombre
  );
  const confObj = useCustomSelector(
    (state) => state.config.configCompleta
  ) as Array<ConfLocal>;
  const sensores = confObj[0].emgs;
  const onClickNav = () => {
    navigate('/video');
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
  const onClickBack = () => {
    navigate('/colocacionMuestra');
  };
  const url = `${multimediaObj[0].link_video}`;

  async function loadConfig() {
    appDispatch(setIsLoading(true));

    const respConf = await window.electron.ipcRenderer.selectCN(
      selectedProtocol
    );
    console.log('respconf', respConf[0].configuracion);
    const resp = await window.electron.ipcRenderer.selectCD(
      respConf[0].configuracion
    );
    console.log('this is config', resp);
    const cantidadEmgs = resp[0].emgs;
    const { giroscopio } = resp[0];
    const { frecuencia_cardiaca } = resp[0];
    const { acelerometro } = resp[0];
    console.log(
      `This is config EMGS: ${cantidadEmgs}, giroscopio ${giroscopio}, frecuencia_cardiaca ${frecuencia_cardiaca}, acelerometro ${acelerometro}`
    );
    appDispatch(setCantidadSensores(cantidadEmgs));
    appDispatch(setGiroscopioIsChecked(giroscopio));
    appDispatch(setAcelerometroIsChecked(acelerometro));
    appDispatch(setFrecuenciaIsChecked(frecuencia_cardiaca));
    appDispatch(
      setExtraSensorsChecked([giroscopio, acelerometro, frecuencia_cardiaca])
    );
    appDispatch(setIsLoading(false));

    return resp;
  }
  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <div>
      <VideoDemo
        onClickNav={onClickNav}
        url={url}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        onClickBack={onClickBack}
        probando={probando}
        sensores={sensores}
      />
    </div>
  );
};

export default VideoDemoContainer;
