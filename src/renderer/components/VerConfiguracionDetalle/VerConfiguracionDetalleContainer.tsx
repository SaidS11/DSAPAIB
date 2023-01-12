/* eslint-disable prettier/prettier */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import VerConfiguracionDetalle from './VerConfiguracionDetalle';

const VerConfiguracionDetalleContainer = () => {
  const navigate = useNavigate();
  const onClickNav = () => {
    navigate('/crearConfigMultimedia');
  };
  return <VerConfiguracionDetalle onClickNav={onClickNav}/>;
};

export default VerConfiguracionDetalleContainer;
