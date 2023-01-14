// eslint-disable-next-line import/no-named-as-default
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';
import Video from './Video';

const VideoContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const onClickNav = () => {
    navigate('/resultados');
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
  if (video === null) {
    console.log('Es nulo');
  } else {
    console.log('Es', video);
  }
  video?.addEventListener('play', (event) => {
    console.log(
      'The Boolean paused property is now false. Either the ' +
        'play() method was called or the autoplay attribute was toggled.'
    );
  });
  const url =
    'https://piediabe-modular.s3.us-west-1.amazonaws.com/Videos/isrroman/video.mp4';
  useEffect(() => {
    console.log('updated');
  }, [video]);
  return (
    <div>
      <Video
        onClickNav={onClickNav}
        url={url}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        probando={probando}
      />
    </div>
  );
};

export default VideoContainer;