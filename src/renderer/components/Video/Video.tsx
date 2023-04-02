/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import ReactPlayer from 'react-player';
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
        <Button sx={styleButtonBiggerRed} onClick={onClickNav}>
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
