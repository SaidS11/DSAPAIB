import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { DialogProps } from '@mui/material/Dialog';
import {
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
  setVentanasArray,
  setVentanasArray2,
  setVentanasArrayGsr,
  setVentanasArrayTemp,
} from 'redux/slices/SeñalesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import ComenzarAnalisisEntrenamiento from './ComenzarAnalisisEntrenamiento';
import ModalVerMas from '../ResultadosAnalisis/ModalVerMas';

// Crear vermas datos y el vermas dejarlo como vermas final, en el datos no se podran ver la confusion o en el tree, regresar await a como estaba
interface Config {
  modelo: string;
  algoritmo: string;
}

const ComenzarAnalisisEntrenamientoContainer = () => {
  const [dataParam, setDataParam] = useState([]);
  const [dataM, setDataM] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState('');
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  async function preAn() {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.preAnalisisPython();
  }
  window.electron.ipcRenderer.preAnalisisP((event: unknown, resp: string) => {
    console.log('Esta es', resp);
    // appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    // navigate('/preAnalisis');
  });
  const toggleModal = (scrollType: DialogProps['scroll']) => {
    console.log('Seleccionado', modelo);
    const found = dataM.find((el: Config) => el.modelo === modelo);
    console.log('Founded', found);
    preAn();
    setTipo(found.algoritmo_ia);
    setOpen(!open);
    setScroll(scrollType);
  };
  interface Cols {
    col1: string;
  }
  const data = React.useMemo(
    (): Cols[] => [
      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },
      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },
      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },
      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },
      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },

      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },
      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },
      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },

      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },
      {
        col1: 'Analisis 1',
      },
      {
        col1: 'Analisis 2',
      },
    ],
    []
  );
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Registros',
        accessor: 'col1',
      },
    ],
    []
  );
  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };
  appDispatch(setVentanasArray([]));
  appDispatch(setVentanasArray2([]));
  appDispatch(setVentanasArrayGsr([]));
  appDispatch(setVentanasArrayTemp([]));
  appDispatch(setCantidadSujetos(2));
  appDispatch(setCantidadSujetosRespaldo(2));
  const onClickStop = () => {
    // stopSensores()
  };
  async function loadData() {
    appDispatch(setIsLoading(true));
    window.Bridge.selectProtocolos();
  }
  window.Bridge.selectPrs((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp);
      setDataParam(resp);
    } else {
      console.log('nada');
      // setOpen(true);
    }
    appDispatch(setIsLoading(false));
  });
  async function loadModels() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    // const resp: Config[] = (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    const resp =
      (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    console.log('Esta es', resp);
    if (resp.length > 0) {
      // console.log('si es', resp);
      setDataM([...resp]);
    } else {
      // console.log('nada');
      // setOpen(true);
    }
    appDispatch(setIsLoading(false));
  }
  useEffect(() => {
    console.log('updated');
    loadData();
    loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    console.log('la data', dataF);
    appDispatch(setAnalisisParams(dataF));
    navigate('/caracterizar');
    // navigate('/preAnalisis');
    // preAn()
  };
  return (
    <div>
      <ComenzarAnalisisEntrenamiento
        data={dataParam}
        dataM={dataM}
        options={options}
        onClickNav={onClickNav}
        onClickStop={onClickStop}
        toggleModal={toggleModal}
        modelo={modelo}
        setModelo={setModelo}
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

export default ComenzarAnalisisEntrenamientoContainer;
