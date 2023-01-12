/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import CrearProtocolo from './CrearProtocolo';

const CrearProtocoloContainer = () => {
  const navigate = useNavigate();
  const onClickNav = () => {
    navigate('/crearConfigMultimedia');
  };
  return <CrearProtocolo onClickNav={onClickNav}/>;
};

export default CrearProtocoloContainer;