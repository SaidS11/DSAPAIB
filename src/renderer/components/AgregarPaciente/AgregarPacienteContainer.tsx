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
  const appDispatch = useCustomDispatch();

  async function insertData(data: any) {
    const user =
      data.nombrePaciente +
      data.apellidoPaterno.slice(0, 2).toString() +
      data.apellidoMaterno.slice(0, 2).toString() +
      data.fechaNacimiento.slice(0, 4).toString();
    window.Bridge.insertPaciente(
      user.toLowerCase(),
      data.email,
      data.telefono,
      data.fechaNacimiento,
      data.nombrePaciente,
      data.apellidoPaterno,
      data.apellidoMaterno
    );
  }
  window.Bridge.insertP((event: any, resp: any) => {
    appDispatch(setIsLoading(false));
  });

  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    appDispatch(setIsLoading(true));
    e.preventDefault();
    // navigate('/escogerConfiguracion');
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    // console.log('el form', form);
    const data = Object.fromEntries(new FormData(form).entries());
    // console.log('la data', data);
    insertData(data);
  };
  return (
    <div>
      <AgregarPaciente onClickNav={onClickNav} />
    </div>
  );
};

export default AgregarPacienteContainer;
