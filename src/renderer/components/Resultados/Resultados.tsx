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
import GraficaDeSensores from './GraficaDeSensores';

export interface ResultadosProps {
  onClickGuardar: () => void;
  onClickProbar: () => void;
  onClickBack: () => void;
  probando: boolean;
  sensores: any;
  dataArr: any;
  gridLayout: any;
}

const Resultados = (props: ResultadosProps) => {
  const { onClickGuardar, onClickProbar, onClickBack, probando, sensores, dataArr, gridLayout } =
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
      <GraficaDeSensores dataArr={dataArr} gridLayout={gridLayout} />
      <section className="display-flex">
        <h5>Etiqueta del paciente: </h5>
        <input
          type="text"
          name="estado"
          required
          style={{ marginLeft: '10px' }}
        />
      </section>
      {/* <section>
        <ProbarSensores sensoresSelected={sensores} />
      </section> */}
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={onClickGuardar}>
          Guardar Registro
        </Button>
        <Button sx={styleButtonBiggerRed} onClick={onClickBack}>Cancelar</Button>
      </section>
      <br />
    </div>
  );
};

export default Resultados;
