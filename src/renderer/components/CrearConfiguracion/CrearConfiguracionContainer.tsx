/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import CrearConfiguracion from './CrearConfiguracion';

const CrearConfiguracionContainer = () => {
  const navigate = useNavigate();
  const onClickNav = () => {
    navigate('/crearConfigMultimedia');
  };
  return <CrearConfiguracion onClickNav={onClickNav}/>;
};

export default CrearConfiguracionContainer;