// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import ResultadosAnalisis from './ResultadosAnalisis';

const ResultadosAnalisisContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const resp = useCustomSelector((state) => state.responses.pythonResponse);
  const analisis = useCustomSelector((state) => state.config.analisisParams);
  console.log('Recibi esto', resp);
  const parsedResp = resp.split('|');
  console.log('Parsed', parsedResp);
  const comprobacion = parsedResp[1].substring(0, 1);
  let precision = '0';
  if (comprobacion === '1') {
    precision = '100';
  } else {
    precision = parsedResp[1].substring(2, 4);
  }
  console.log('preci', precision);
  /* if (precision === '00') {
    precision = `${parsedResp[1].substring(1, 1)}00`;
  } */
  console.log('presicion', precision);
  const tipo = parsedResp[0];
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

  return (
    <div>
      <ResultadosAnalisis
        onClickNav={onClickNav}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        probando={probando}
        precision={precision}
        analisis={analisis}
        tipo={tipo}
      />
    </div>
  );
};

export default ResultadosAnalisisContainer;
