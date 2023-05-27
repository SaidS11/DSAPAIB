/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setIsLoading, setIsUploaded, setFailUpload, setErrorDetails } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import CrearProtocolo from './CrearProtocolo';
import CreadoExitosamente from '../Modales/CreadoExitosamente';

interface Config {
  nombre: string;
}


const CrearProtocoloContainer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [configuration, setConfiguration] = useState('');

  const doctor = useCustomSelector((state) => state.login.loggedUser);
  const appDispatch = useCustomDispatch();

  // Load Data for the rows
  async function loadData() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    const resp: Config[] =
      (await window.electron.ipcRenderer.selectC()) as Array<Config>;
    console.log('Esta es', resp);
    if (resp.length > 0) {
      console.log('si es', resp);
      setData(resp);
    } else {
      console.log('nada');
    }
    appDispatch(setIsLoading(false));
  };
  async function insertData(dataP: any) {
    window.Bridge.insertProtocolo(dataP.nombreProtocolo, doctor, dataP.config, dataP.descripcion);
  }
  window.Bridge.insertPro((event: any, resp: any) => {
    console.log('Esta es mi resp', resp)
    if (resp[0] === 0) {
      console.log('Despacho error', resp[1]);
      appDispatch(setFailUpload(true));
      appDispatch(setIsLoading(false));
      appDispatch(setErrorDetails(resp[1]))
    } else {
      console.log('No despacho error');
      if (resp.length > 0) {
        console.log('si es', resp);
        setData(resp);
      } else {
        console.log('nada');
      }
      appDispatch(setIsLoading(false));
      appDispatch(setIsUploaded(true));
    }
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

  return (
    <div>
      <CrearProtocolo onClickCrear={onClickCrear} data={data} configuration={configuration} setConfiguration={setConfiguration}/>
    </div>
  );
};

export default CrearProtocoloContainer;