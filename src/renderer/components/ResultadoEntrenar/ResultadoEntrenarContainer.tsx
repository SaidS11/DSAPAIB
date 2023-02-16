// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomSelector } from '../../../redux/hooks';
import ResultadoEntrenar from './ResultadoEntrenar';

const obtenerPorcentaje = (valor: string) => {
  const comprobacion = valor.substring(0, 1);
  let precision = '0';
  if (comprobacion === '1') {
    precision = '100';
  } else {
    precision = valor.substring(2, 4);
  }
  return precision;
};

const ResultadoEntrenarContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const resp = useCustomSelector((state) => state.responses.pythonResponse);
  const analisis = useCustomSelector((state) => state.config.analisisParams);
  console.log('Recibi esto', resp);
  const parsedResp = resp.split('|');
  console.log('Parsed', parsedResp);
  const precision = obtenerPorcentaje(parsedResp[1]);
  const f1 = obtenerPorcentaje(parsedResp[2]);
  const recall = obtenerPorcentaje(parsedResp[3]);
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
  const onClickBack = () => {
    navigate('/entrenar');
  };
  return (
    <div>
      <ResultadoEntrenar
        onClickNav={onClickNav}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        probando={probando}
        onClickBack={onClickBack}
        precision={precision}
        f1={f1}
        recall={recall}
        analisis={analisis}
        tipo={tipo}
      />
    </div>
  );
};

export default ResultadoEntrenarContainer;
