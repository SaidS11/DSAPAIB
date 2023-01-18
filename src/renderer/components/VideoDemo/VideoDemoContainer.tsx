// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomSelector } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import VideoDemo from './VideoDemo';

const VideoDemoContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );
  const confObj = useCustomSelector((state) => state.config.configCompleta);
  const sensores = confObj[0].emgs;
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
  const onClickBack = () => {
    navigate('/colocacionMuestra');
  };
  const url = `${multimediaObj[0].link_video}`;

  return (
    <div>
      <VideoDemo
        onClickNav={onClickNav}
        url={url}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        onClickBack={onClickBack}
        probando={probando}
        sensores={sensores}
      />
    </div>
  );
};

export default VideoDemoContainer;
