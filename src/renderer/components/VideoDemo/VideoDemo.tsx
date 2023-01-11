/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
  styleButtonBigger,
} from '../VerPaciente/ButtonStyle';
import ProbarSensores from '../ProbarSensores/ProbarSensores';
import './VideoDemo.css';

export interface ColocacionProps {
  onClickNav: () => void;
  url: string;
  onClickProbar: () => void;
  onClickDetener: () => void;
  probando: boolean;
}

const VideoDemo = (props: ColocacionProps) => {
  const { onClickNav, url, onClickProbar, onClickDetener, probando } = props;
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
        {probando && (
          <Button sx={styleButtonBigger} onClick={onClickDetener}>
            Detener
          </Button>
        )}
        {!probando && (
          <>
            <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
              Iniciar Adquisición
            </Button>
            <Button sx={styleButtonBigger} onClick={onClickProbar}>
              Captura de Sensores
            </Button>
            <Button sx={styleButtonBiggerRed}>Regresar</Button>
          </>
        )}
      </section>
      <section>
        <ProbarSensores sensoresSelected={8} />
      </section>
    </div>
  );
};

export default VideoDemo;
