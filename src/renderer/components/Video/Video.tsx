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
import './Video.css';

export interface VideoProps {
  onClickNav: () => void;
  url: string;
  onClickProbar: () => void;
  onClickDetener: () => void;
  probando: boolean;
  sensores: number;
}

const Video = (props: VideoProps) => {
  const { onClickNav, url, onClickProbar, onClickDetener, probando, sensores } =
    props;
  return (
    <div>
      <section className="display-center">
        <h1>Captura de Datos</h1>
      </section>
      <section className="display-center">
        <h3>La captura comenzara cuando comience el video</h3>
      </section>
      <section className="display-center">
        <video id="myVideo" controls width="50%">
          <source id="video_src" src={url} type="video/mp4" />
          Lo siento
        </video>
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerRed} onClick={onClickNav}>
          Cancelar
        </Button>
      </section>
      <section>
        <ProbarSensores sensoresSelected={sensores} />
      </section>
    </div>
  );
};

// <div className="countdown"></div>
export default Video;
