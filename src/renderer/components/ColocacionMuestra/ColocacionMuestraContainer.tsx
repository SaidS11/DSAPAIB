// eslint-disable-next-line import/no-named-as-default
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setConfigCompleta } from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import ColocacionMuestra from './ColocacionMuestra';

const ColocacionMuestraContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );
  const confObj = useCustomSelector((state) => state.config.configCompleta);
  console.log('Aqui llego', multimediaObj);
  console.log('Esta es la config', confObj);
  // Get All the data from the config

  /* async function loadConfCompleta(name: string) {
    appDispatch(setIsLoading(true));
    window.Bridge.selectConfiguracionDetalle(name);
  }
  window.Bridge.selectCD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Esta es la config completa', resp);
      appDispatch(setConfigCompleta(resp));

      setData(resp);
    } else {
      console.log('nada en CD');
    }
    appDispatch(setIsLoading(false));
  }); */

  const onClickNav = () => {
    navigate('/videoDemo');
  };
  const onClickBack = () => {
    navigate('/escogerConfiguracion');
  };
  const url = `${multimediaObj[0].link_imagen}`;

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
