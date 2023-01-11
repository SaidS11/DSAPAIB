// eslint-disable-next-line import/no-named-as-default
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import ColocacionMuestra from './ColocacionMuestra';

const ColocacionMuestraContainer = () => {
  const navigate = useNavigate();
  const onClickNav = () => {
    navigate('/videoDemo');
  };
  const url =
    'https://piediabe-modular.s3.us-west-1.amazonaws.com/Imagenes/isrroman/emgfoto1.jpg';

  return (
    <div>
      <ColocacionMuestra onClickNav={onClickNav} url={url} />
    </div>
  );
};

export default ColocacionMuestraContainer;
