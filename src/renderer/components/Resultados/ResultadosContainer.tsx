// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  setFailUpload,
  setIsLoading,
  setIsUploaded,
} from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import Resultados from './Resultados';

const ResultadosContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const appDispatch = useCustomDispatch();
  const confObj = useCustomSelector((state) => state.config.configCompleta);
  const nombreProtocolo = useCustomSelector(
    (state) => state.config.protocoloNombre
  );
  const usuario = useCustomSelector((state) => state.datos.usuarioPaciente);
  const sensores = confObj[0].emgs;
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
  const señales = {
    sensor0: '[]',
  };
  async function insertRegistro() {
    window.Bridge.insertRegistro(
      señales,
      '2022-01-20',
      usuario,
      nombreProtocolo
    );
  }
  window.Bridge.insertR((event: any, resp: any) => {
    if (resp[0] === 0) {
      console.log('Despacho error', resp[1]);
      appDispatch(setFailUpload(true));
      appDispatch(setIsLoading(false));
    } else {
      console.log('Correcto');
      appDispatch(setIsLoading(false));
      appDispatch(setIsUploaded(true));
      navigate('/verPaciente');
    }
  });
  const onClickNav = () => {
    insertRegistro();
  };
  return (
    <div>
      <Resultados
        onClickNav={onClickNav}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        probando={probando}
        sensores={sensores}
      />
    </div>
  );
};

export default ResultadosContainer;
