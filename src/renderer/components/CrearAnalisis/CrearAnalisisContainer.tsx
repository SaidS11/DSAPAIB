/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import CrearAnalisis from './CrearAnalisis';
import ModalCrearAnalisis from './ModalCrearAnalisis';

const CrearAnalisisContainer = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const appDispatch = useCustomDispatch();
  async function loadData() {
    appDispatch(setIsLoading(true));
    window.Bridge.selectProtocolos();
  }
  window.Bridge.selectPrs((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp);
      setData(resp);
    } else {
      console.log('nada');
      setOpen(true);
    }
    appDispatch(setIsLoading(false));
  });
  useEffect(() => {
    console.log('updated');
    loadData();
  }, []);

  return (
    <div>
      <CrearAnalisis data={data} />
      {open && <ModalCrearAnalisis open={open} />}
    </div>
  );
};

export default CrearAnalisisContainer;
