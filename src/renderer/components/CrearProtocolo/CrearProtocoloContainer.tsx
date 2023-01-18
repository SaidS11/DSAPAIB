/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import CrearProtocolo from './CrearProtocolo';

const CrearProtocoloContainer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const doctor = useCustomSelector((state) => state.login.loggedUser);
  const appDispatch = useCustomDispatch();

  async function loadData() {
    appDispatch(setIsLoading(true));
    window.Bridge.selectConfiguracion();
  }
  window.Bridge.selectC((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp);
      setData(resp);
    } else {
      console.log('nada');
    }
    appDispatch(setIsLoading(false));
  });

  async function insertData(dataP: any) {
    window.Bridge.insertProtocolo(dataP.nombreProtocolo, doctor, dataP.config, dataP.descripcion);
  }
  window.Bridge.insertPro((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp);
      setData(resp);
    } else {
      console.log('nada');
    }
    appDispatch(setIsLoading(false));
  });

  const onClickCrear = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('llamado', doctor)
    appDispatch(setIsLoading(true));
    e.preventDefault();
    // navigate('/escogerConfiguracion');
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    // console.log('el form', form);
    const dataR = Object.fromEntries(new FormData(form).entries());
    // console.log('la data', data);
    insertData(dataR);
  };

  useEffect(() => {
    console.log('updated');
    loadData();
  }, []);

  return <CrearProtocolo onClickCrear={onClickCrear} data={data}/>;
};

export default CrearProtocoloContainer;