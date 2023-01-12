// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import Resultados from './Resultados';

const ResultadosContainer = () => {
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
      <Resultados
        onClickNav={onClickNav}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        probando={probando}
      />
    </div>
  );
};

export default ResultadosContainer;
