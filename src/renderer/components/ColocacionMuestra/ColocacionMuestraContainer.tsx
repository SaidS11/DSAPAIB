// eslint-disable-next-line import/no-named-as-default
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setConfigCompleta } from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import ColocacionMuestra from './ColocacionMuestra';
import { setGiroscopioIsChecked, setAcelerometroIsChecked, setFrecuenciaIsChecked, setExtraSensorsChecked } from 'redux/slices/SeñalesSlice';

const ColocacionMuestraContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );
  const confObj = useCustomSelector((state) => state.config.configCompleta);
  const selectedProtocol = useCustomSelector((state) => state.config.protocoloNombre);
  console.log('Aqui llego', multimediaObj);
  console.log('Esta es la config', confObj);

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
      `This is config EMGS : ${cantidadEmgs}, giroscopio ${giroscopio}, frecuencia_cardiaca ${frecuencia_cardiaca}, acelerometro ${acelerometro}`
    );
    appDispatch(setGiroscopioIsChecked(giroscopio));
    appDispatch(setAcelerometroIsChecked(acelerometro));
    appDispatch(setFrecuenciaIsChecked(frecuencia_cardiaca));
    appDispatch(
      setExtraSensorsChecked([giroscopio, acelerometro, frecuencia_cardiaca])
    );
    appDispatch(setIsLoading(false));
    return resp;
  }

  const onClickNav = () => {
    navigate('/videoDemo');
  };
  const onClickBack = () => {
    navigate('/escogerConfiguracion');
  };
  const url = `${multimediaObj[0].link_imagen}`;

  useEffect(() => {
    loadConfig();
  }, []);
  return (
    <div>
      <ColocacionMuestra
        onClickNav={onClickNav}
        onClickBack={onClickBack}
        url={url}
      />
    </div>
  );
};

export default ColocacionMuestraContainer;
