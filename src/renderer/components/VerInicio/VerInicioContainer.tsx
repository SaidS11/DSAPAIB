/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import VerInicio from './VerInicio';


const InicioContainer = () =>{
  const navigate = useNavigate();
  const onClickPacientes = () => {
    navigate('/buscarPaciente');
  };
  const onClickProtocolo = () => {
    navigate('/verProtocolo');
  };
  const onClickAnalisis = () => {
    navigate('/verAnalisis');
  };
  return (
    <div>
      <VerInicio onClickPacientes={onClickPacientes} onClickProtocolo={onClickProtocolo} onClickAnalisis={onClickAnalisis} />
    </div>
  );
};

export default InicioContainer;