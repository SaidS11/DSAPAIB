/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line import/no-named-as-default
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  setConfigMultimedia,
  setConfigCompleta,
  setProtocoloNombre,
} from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
// eslint-disable-next-line import/no-named-as-default
import EscogerConfiguracion from './EscogerConfiguracion';

const EscogerConfiguracionContainer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [protocolo, setProtocolo] = React.useState('');
  let nameConfig = '';
  console.log('protocolo', protocolo);
  const appDispatch = useCustomDispatch();
  appDispatch(setProtocoloNombre(protocolo));
  // Get All the data from the config
  async function loadConfCompleta(name: string) {
    // appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.selectConfiguracionDetalle(name);
  }
  window.electron.ipcRenderer.selectCD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Esta es la config completa', resp);
      appDispatch(setConfigCompleta(resp));
      navigate('/colocacionMuestra');
    } else {
      console.log('nada en CD');
    }
    appDispatch(setIsLoading(false));
  });

  // Get Multimedia to Display
  async function loadMulti(dataP: any) {
    // console.log('load multi', data);
    // appDispatch(setIsLoading(true));
    nameConfig = dataP[0].configuracion;
    window.electron.ipcRenderer.selectMultimediaConfig(nameConfig);
    /* loadConfCompleta(data[0].configuracion); */
  }
  window.electron.ipcRenderer.selectMC((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Esta es la multimedia', resp);
    } else {
      console.log('nada en MC');
    }
    // appDispatch(setIsLoading(false));
    appDispatch(setConfigMultimedia(resp));
    loadConfCompleta(nameConfig);
  });

  // Get data from selected Protocol
  async function loadConf() {
    appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.selectConfiguracionNombre(protocolo);
  }
  window.electron.ipcRenderer.selectCN((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Esta es la config', resp);
      setData(resp);
    } else {
      console.log('nada en CN');
    }
    appDispatch(setIsLoading(false));

    // appDispatch(setIsLoading(false));
    // loadMulti(resp);
  });

  const onClickNav = () => {
    if (protocolo === '') {
      alert('Seleccione uno primero');
    } else {
      loadConf();
      // navigate('/colocacionMuestra');
    }
  };
  const onClickBack = () => {
    navigate('/verPaciente');
  };
  const onClickAdd = () => {
    navigate('/crearProtocolo');
  };
  const onClickVer = () => {
    navigate('/verProtocolo');
  };

  // Load Protocols
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
    }
    appDispatch(setIsLoading(false));
  });
  useEffect(() => {
    console.log('updated');
    loadData();
  }, []);

  return (
    <div>
      <EscogerConfiguracion
        onClickNav={onClickNav}
        onClickBack={onClickBack}
        onClickAdd={onClickAdd}
        onClickVer={onClickVer}
        data={data}
        protocolo={protocolo}
        setProtocolo={setProtocolo}
      />
    </div>
  );
};

export default EscogerConfiguracionContainer;
