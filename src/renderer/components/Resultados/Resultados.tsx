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
import './Resultados.css';

export interface ResultadosProps {
  onClickNav: () => void;
  onClickProbar: () => void;
  onClickDetener: () => void;
  probando: boolean;
  sensores: any;
}

const Resultados = (props: ResultadosProps) => {
  const { onClickNav, onClickProbar, onClickDetener, probando, sensores } =
    props;
  // const navigate = useNavigate();

  return (
    <div>
      <section className="display-center">
        <h1>Resultados</h1>
      </section>
      <section className="display-center">
        <h3>Analice o guarde los resultados</h3>
      </section>
      {/* <section>
        <ProbarSensores sensoresSelected={sensores} />
      </section> */}
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
          Guardar Registro
        </Button>
        <Button sx={styleButtonBiggerRed}>Cancelar</Button>
      </section>
      <br />
    </div>
  );
};

export default Resultados;
