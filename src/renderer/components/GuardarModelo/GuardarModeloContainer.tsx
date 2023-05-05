import React, { useCallback, useEffect, useState } from 'react';
import { Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setAnalisisParams,
  setConfigCompleta,
} from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import GuardarModelo from './GuardarModelo';
import { AnalisisParamsInterface } from '../Utilities/Constants';

interface Config {
  algoritmo: string;
}

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

const GuardarModeloContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const analisisParams = useCustomSelector(
    (state) => state.config.analisisParams
  ) as AnalisisParamsInterface;
  const selectedProtocol = analisisParams.protocolo;
  console.log('selected', selectedProtocol);
  const [algoritmo, setAlgoritmo] = useState('');
  const [algoritmoTipo, setAlgoritmoTipo] = useState('');
  const [modelosEncontrados, setMdelosEncontrados] = useState(false);

  const [dataAlgoritmo, setDataAlgoritmo] = useState<any>([]);
  const [data, setData] = useState<Cols[]>([]);
  const datarRetrieved: Cols[] = [];

  // appDispatch(setAnalisisParams(dataF));

  const columns: Array<Column<Cols>> = React.useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'col1',
      },
      {
        Header: 'Algoritmo',
        accessor: 'col2',
      },
      {
        Header: 'Protocolo',
        accessor: 'col3',
      },
      {
        Header: 'Entrenado',
        accessor: 'col4',
      },
      {
        Header: 'Resultados',
        accessor: 'col5',
      },
    ],
    []
  );

  const loadAlgos = useCallback(async () => {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));

    const resp = await window.electron.ipcRenderer.selectAlgos();
    console.log('Este es algo', resp);
    if (resp.length > 0) {
      setDataAlgoritmo([...resp]);
    }
    appDispatch(setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parametrosString = (obj: any) => {
    if (obj == null) {
      return 'null';
    }

    console.log('received', obj);
    const returnValue = Object.entries(obj)
      .map(([propiedad, valor]) => `${propiedad}: ${valor}`)
      .join(', ');
    return returnValue;
    // return "hola"
  };

  const loadModels = useCallback(async () => {
    console.log('Fui llamado Models', algoritmoTipo);
    appDispatch(setIsLoading(true));

    const respModelo =
      await window.electron.ipcRenderer.selectModIaPorAlgoritmo(algoritmoTipo);
    if (respModelo.length > 0) {
      for (let i = 0; i < respModelo.length; i += 1) {
        // const localString =  JSON.stringify(respModelo[i].resultados);
        const localString = parametrosString(respModelo[i].resultados);
        datarRetrieved.push({
          col1: respModelo[i].nombre,
          col2: respModelo[i].algoritmo_ia,
          col3: respModelo[i].protocolo,
          col4: respModelo[i].entrenado,
          col5: localString,
        });
      }
      setMdelosEncontrados(true);
      setData(datarRetrieved);
    } else {
      setMdelosEncontrados(false);
    }
    console.log('Este es modelod', respModelo);
    console.log('data', datarRetrieved);
    appDispatch(setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoritmoTipo]);

  useEffect(() => {
    loadAlgos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoritmoTipo]);

  const onClickContinue = () => {
    const analisisExpanded = { ...analisisParams };
    analisisExpanded.algoritmo = algoritmo;
    appDispatch(setAnalisisParams(analisisExpanded));
    navigate('/preAnalisis');
  };

  const onClickBack = () => {
    navigate('/entrenar');
  };
  return (
    <GuardarModelo
      dataAlgoritmo={dataAlgoritmo}
      algoritmo={algoritmo}
      setAlgoritmo={setAlgoritmo}
      setAlgoritmoTipo={setAlgoritmoTipo}
      modelosEncontrados={modelosEncontrados}
      data={data}
      columns={columns}
      selectedProtocol={selectedProtocol}
      setData={setData}
      onClickContinue={onClickContinue}
      onClickBack={onClickBack}
    />
  );
};

export default GuardarModeloContainer;
