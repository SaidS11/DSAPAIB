// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import AgregarPaciente from './AgregarPaciente';

const AgregarPacienteContainer = () => {
  const navigate = useNavigate();
  const onClickNav = () => {
    navigate('/escogerConfiguracion');
  };
  return (
    <div>
      <AgregarPaciente onClickNav={onClickNav} />
    </div>
  );
};

export default AgregarPacienteContainer;
