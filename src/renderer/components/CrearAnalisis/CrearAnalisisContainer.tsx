/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import CrearAnalisis from './CrearAnalisis';
import ModalCrearAnalisis from './ModalCrearAnalisis';

const CrearAnalisisContainer = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  async function loadMessage() {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.funPython('Tree');
  }
  window.electron.ipcRenderer.funP((event: any, resp: any) => {
    console.log('Esta es', resp);
    appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    navigate('/resultadosAnalisis');
  });
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    // appDispatch(setIsLoading(true));
    e.preventDefault();
    /* navigate('/escogerConfiguracion'); */
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    // console.log('el form', form);
    const dataF = Object.fromEntries(new FormData(form).entries());
    console.log('la data', dataF);
    appDispatch(setAnalisisParams(dataF));
    loadMessage();
  };

  async function loadData() {
    appDispatch(setIsLoading(true));
    window.Bridge.selectProtocolos();
  }
  window.Bridge.selectPrs((event: any, resp: any) => {
    if (resp.length > 0) {
      // console.log('si es', resp);
      setData(resp);
    } else {
      // console.log('nada');
      setOpen(true);
    }
    appDispatch(setIsLoading(false));
    // appDispatch(setIsLoading(false));
  });
  useEffect(() => {
    console.log('updated');
    loadData();
  }, []);

  return (
    <div>
      <CrearAnalisis data={data} onClickNav={onClickNav} />
      {open && <ModalCrearAnalisis open={open} />}
    </div>
  );
};

export default CrearAnalisisContainer;
