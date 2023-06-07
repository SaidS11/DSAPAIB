import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';

import Video from './Video';
import SensoresAdquisicionContainer from '../SensoresAdquisicion/SensoresAdquisicionContainer';
import { apiEndpoint } from '../Utilities/Constants';

interface ConfLocal {
  emgs: number;
}

const VideoContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const appDispatch = useCustomDispatch();

  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );

  const confObj = useCustomSelector(
    (state) => state.config.configCompleta
  ) as Array<ConfLocal>;
  const sensores = confObj[0].emgs;

  const onClickNav = async () => {
    setShouldStop(true);
    const resp = await window.electron.ipcRenderer.sensoStop();
    navigate('/procesamientoPrevio');
  };

  const onClickCancel = () => {
    navigate('/videoDemo');
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
  const video = document.getElementById('myVideo') as HTMLMediaElement | null;

  video?.addEventListener('play', (event) => {
    console.log(
      'The Boolean paused property is now false. Either the ' +
        'play() method was called or the autoplay attribute was toggled.'
    );
  });
  const urlRetrieved = `${multimediaObj[0].link_video}`;
  const url = urlRetrieved.includes('http')
    ? urlRetrieved
    : `${apiEndpoint}/${multimediaObj[0].link_video}`;

  useEffect(() => {}, [video]);
  return (
    <div>
      <Video onClickNav={onClickNav} url={url} onClickCancel={onClickCancel} />
      <SensoresAdquisicionContainer mode="LIVE" shouldStop={shouldStop} />
    </div>
  );
};

export default VideoContainer;
