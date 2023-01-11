// eslint-disable-next-line import/no-named-as-default
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import EscogerConfiguracion from './EscogerConfiguracion';

const EscogerConfiguracionContainer = () => {
  const navigate = useNavigate();
  const onClickNav = () => {
    navigate('/colocacionMuestra');
  };
  return (
    <div>
      <EscogerConfiguracion onClickNav={onClickNav} />
    </div>
  );
};

export default EscogerConfiguracionContainer;
