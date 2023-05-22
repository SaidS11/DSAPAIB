// eslint-disable-next-line import/no-named-as-default
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogProps } from '@mui/material/Dialog';
import { setIsLoading, setIsUploaded } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import ResultadoEntrenar from './ResultadoEntrenar';
import { AnalisisParamsInterface } from '../Utilities/Constants';
import ModalVerMas from '../Utilities/ModalVerMas';
import SaveModelModal from '../Utilities/SaveModelModal';

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
  const predictMode = useCustomSelector((state) => state.señales.predictMode);
  const analisis = useCustomSelector(
    (state) => state.config.analisisParams
  ) as AnalisisParamsInterface;
  const selectedModels = useCustomSelector(
    (state) => state.config.selectedModels
  );
  const algoritmoUsado = analisis.algoritmo;
  const protocoloUsado = analisis.protocolo;
  const nombreSeleccionado = selectedModels[0].col1;
  const algoritmoSeleccionado = selectedModels[0].col2;

  const appDispatch = useCustomDispatch();
  console.log('Recibi esto', resp);
  const parsedResp = resp.split('|');
  console.log('Parsed', parsedResp);

  const precision = obtenerPorcentaje(parsedResp[1]);
  const f1 = obtenerPorcentaje(parsedResp[2]);
  const recall = obtenerPorcentaje(parsedResp[3]);
  const precisionPromedio = parsedResp[4];
  const desviacion = parsedResp[5];
  const respAnalisis = parsedResp[6];
  console.log('This is resp', respAnalisis);
  const banderaExistente = parsedResp[7];
  console.log('this is flag', banderaExistente);
  const precisionPromedioParsed = parseInt(precisionPromedio, 10) * 100;
  const precisionPromParsString = precisionPromedioParsed.toString();
  console.log('Crosses', precisionPromedio, desviacion);
  const crossParsed = `Precision promedio de ${precisionPromedio} con una desviacion estandar de ${desviacion}`;
  // "Precision promedio de %0.2f con una desviacion estandar de %0.2f"
  /* if (precision === '00') {
    precision = `${parsedResp[1].substring(1, 1)}00`;
  } */
  console.log('precision', precision);
  const [open, setOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const toggleModalVerMas = (scrollType: DialogProps['scroll']) => {
    setOpen(!open);
    setScroll(scrollType);
  };

  const [open2, setOpen2] = useState(false);
  const toggleModalGuardar = () => {
    setOpen2(!open2);
  };
  const tipo = parsedResp[0];
  async function updateData() {
    appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.updateImplementacion(
      precisionPromParsString,
      desviacion,
      '1',
      'nombre asignado'
    );
  }
  window.electron.ipcRenderer.updateIm((event: any, respLocal: any) => {
    console.log('Esta es', respLocal);
    appDispatch(setIsLoading(false));
    appDispatch(setIsUploaded(true));
  });

  const onClickSave = useCallback(() => {
    // toggleModalGuardar()
    // setOpen2(!open2);

    appDispatch(setIsLoading(true));

    const customResults = {
      Precisión: precision,
      F1: f1,
      Recall: recall,
    };
    const customStrResults = JSON.stringify(customResults);
    appDispatch(setIsLoading(true));
    if (banderaExistente === 'true') {
      window.electron.ipcRenderer.updateModelo(
        customStrResults,
        '1',
        nombreSeleccionado
      );
    } else {
      window.electron.ipcRenderer.insertModeloIA(
        nombreSeleccionado,
        algoritmoSeleccionado,
        true,
        protocoloUsado || 'undefined',
        customStrResults
      );
    }
    setIsSaved(true);

    // navigate('/video');
    // updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  window.electron.ipcRenderer.updateMod((event: any, respLocal: any) => {
    console.log('Esta es', respLocal);
    appDispatch(setIsLoading(false));
    appDispatch(setIsUploaded(true));
  });
  window.electron.ipcRenderer.insertModIA((event: any, respInsert: any) => {
    if (respInsert > 0) {
      console.log('insert', respInsert[0]);
      if (respInsert[0] === 0) {
        console.log('Failed', respInsert[1]);
      }
    } else {
      console.log(respInsert);
    }
    appDispatch(setIsLoading(false));
    appDispatch(setIsUploaded(true));
  });

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
    // navigate('/entrenar');
  };
  const onClickCambiar = () => {
    if (isSaved !== true) {
      toggleModalGuardar();
    } else {
      navigate('/guardarModelo');
    }
  };

  return (
    <div>
      <ResultadoEntrenar
        onClickSave={onClickSave}
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
        respAnalisis={respAnalisis}
        toggleModalVerMas={toggleModalVerMas}
        onClickCambiar={onClickCambiar}
        predictMode={predictMode}
      />
      {open && (
        <ModalVerMas
          toggleModalVerMas={toggleModalVerMas}
          open={open}
          tipo={tipo}
          scroll={scroll}
        />
      )}
      {open2 && (
        <SaveModelModal toggleModalGuardar={toggleModalGuardar} open={open2} />
      )}
    </div>
  );
};

export default ResultadoEntrenarContainer;
