/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import VerConfiguracionDetalle from './VerConfiguracionDetalle';

const VerConfiguracionDetalleContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const nameConf = useCustomSelector((state) => state.config.configName)
  const resp = useCustomSelector((state) => state.config.configDetalle);
  const multimedia = useCustomSelector((state) => state.config.configMultimedia);
  console.log('llego', nameConf);
  console.log('respCustom', resp);
  /* const [resp, setData] = useState({});
  const [multimedia, setMultimedia] = useState({});
  
  useEffect(() => {
    console.log('updated');
    loadData();
  }, []); */
  console.log('estoy rendereando detalle')
  const onClickNav = () => {
    navigate('/crearConfigMultimedia');
  };
  // return <div>Hola</div>
  return <VerConfiguracionDetalle onClickNav={onClickNav} resp={resp} multimedia={multimedia} />;
};

export default VerConfiguracionDetalleContainer;
