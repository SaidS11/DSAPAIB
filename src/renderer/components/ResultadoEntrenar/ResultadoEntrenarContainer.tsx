// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading, setIsUploaded } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
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
  const appDispatch = useCustomDispatch();
  console.log('Recibi esto', resp);
  const parsedResp = resp.split('|');
  console.log('Parsed', parsedResp);
  const precision = obtenerPorcentaje(parsedResp[1]);
  const f1 = obtenerPorcentaje(parsedResp[2]);
  const recall = obtenerPorcentaje(parsedResp[3]);
  const precisionPromedio = parsedResp[4];
  const desviacion = parsedResp[5];
  const precisionPromedioParsed = parseInt(precisionPromedio, 10) * 100;
  const precisionPromParsString = precisionPromedioParsed.toString();
  console.log('Crosses', precisionPromedio, desviacion);
  const crossParsed = `Precision promedio de ${precisionPromedio} con una desviacion estandar de ${desviacion}`;
  // "Precision promedio de %0.2f con una desviacion estandar de %0.2f"
  /* if (precision === '00') {
    precision = `${parsedResp[1].substring(1, 1)}00`;
  } */
  console.log('presicion', precision);
  const tipo = parsedResp[0];
  async function updateData() {
    appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.updateImplementacion(
      precisionPromParsString,
      desviacion,
      '1',
      analisis.modelo
    );
  }
  window.electron.ipcRenderer.updateIm((event: any, respLocal: any) => {
    console.log('Esta es', respLocal);
    appDispatch(setIsLoading(false));
    appDispatch(setIsUploaded(true));
  });
  const onClickNav = () => {
    // navigate('/video');
    updateData();
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
        crossParsed={crossParsed}
        analisis={analisis}
        tipo={tipo}
      />
    </div>
  );
};

export default ResultadoEntrenarContainer;
