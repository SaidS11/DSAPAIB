// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import ResultadoVerMas from './ResultadoVerMas';

const ResultadoVerMasContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const onClickNav = () => {
    navigate('/video');
  };
  const onClickProbar = () => {
    if (probando === false) {
      setProbando(true);
    }
  };
  const onClickDetener = () => {
    if (probando === true) {
      setProbando(false);
    }
  };

  return (
    <div>
      <ResultadoVerMas
        onClickNav={onClickNav}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        probando={probando}
      />
    </div>
  );
};

export default ResultadoVerMasContainer;
