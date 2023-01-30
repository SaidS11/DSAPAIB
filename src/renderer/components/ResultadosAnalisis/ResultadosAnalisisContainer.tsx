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
  const precision = parsedResp[0].substring(2, 4);
  console.log('presicion', precision);
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
      />
    </div>
  );
};

export default ResultadosAnalisisContainer;
