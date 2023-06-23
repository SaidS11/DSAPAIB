/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './VideoDemo.css';

export interface VideoDemoProps {
  onClickNav: () => void;
  url: string;
  onClickBack: () => void;
  probando: boolean;
}

const VideoDemo = (props: VideoDemoProps) => {
  const { onClickNav, url, onClickBack, probando } = props;
  // const navigate = useNavigate();

  
  return (
    <div>
      <section className="display-center">
        <h1>Demostracion de Protocolo</h1>
      </section>
      <section className="display-center">
        <h3>Puede probar los sensores o continuar</h3>
      </section>
      <section className="display-center">
        <video id="myVideo" controls width="50%">
          <source id="video_src" src={url} type="video/mp4" />
          Lo siento
        </video>
      </section>
      <section className="display-center">
        {!probando && (
          <>
            <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
              Iniciar Adquisición
            </Button>
            <Button sx={styleButtonBiggerRed} onClick={onClickBack}>
              Regresar
            </Button>
          </>
        )}
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

export default VideoDemo;
