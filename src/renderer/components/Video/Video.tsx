/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import ReactPlayer from 'react-player';
import { styleButtonBiggerRed } from '../VerPaciente/ButtonStyle';

import './Video.css';

export interface VideoProps {
  onClickNav: () => void;
  url: string;
  onClickCancel: () => void;
}

const Video = (props: VideoProps) => {
  const { onClickNav, url, onClickCancel } = props;
  return (
    <div>
      <section className="display-center">
        <h1>Captura de Datos</h1>
      </section>
      <section className="display-center">
        <h3>La captura comenzara cuando se de clic en el boton</h3>
      </section>
      <section className="display-center">
        {/* <Button
          sx={styleButtonBiggerGreen}
          onClick={() => console.log('mostrarvideo')}
        >
          Comenzar
        </Button> */}
        <ReactPlayer
          // controls
          url={url}
          width="auto"
          onEnded={() => onClickNav()}
          playing
          // onPlay={() => }
          // onEnded={() => onClickNav()}
        />
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerRed} onClick={onClickCancel}>
          Cancelar
        </Button>
      </section>
      {/* <section>
        <ProbarSensores
          sensoresSelected={sensores}
          onClickNav={undefined}
          onClickStop={undefined}
          dataXParam={undefined}
          dataYParam={undefined}
        />
      </section> */}
    </div>
  );
};

// <div className="countdown"></div>
export default Video;
