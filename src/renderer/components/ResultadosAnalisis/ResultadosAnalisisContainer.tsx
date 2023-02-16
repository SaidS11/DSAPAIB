import { useNavigate } from 'react-router-dom';
import { DialogProps } from '@mui/material/Dialog';
import React, { useState } from 'react';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import ResultadosAnalisis from './ResultadosAnalisis';
import ModalVerMas from './ModalVerMas';

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

const ResultadosAnalisisContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const toggleModal = (scrollType: DialogProps['scroll']) => {
    setOpen(!open);
    setScroll(scrollType);
  };
  const onClickBack = () => {
    navigate('/crearAnalisis');
  };
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

  return (
    <div>
      <ResultadosAnalisis
        precision={precision}
        f1={f1}
        recall={recall}
        analisis={analisis}
        tipo={tipo}
        toggleModal={toggleModal}
        onClickBack={onClickBack}
      />
      {open && (
        <ModalVerMas
          toggleModal={toggleModal}
          open={open}
          tipo={tipo}
          scroll={scroll}
        />
      )}
    </div>
  );
};

export default ResultadosAnalisisContainer;
