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
import './ResultadosAnalisis.css';

export interface ResultadosAnalisisProps {
  onClickNav: () => void;
  onClickProbar: () => void;
  onClickDetener: () => void;
  probando: boolean;
}

const ResultadosAnalisis = (props: ResultadosAnalisisProps) => {
  const { onClickNav, onClickProbar, onClickDetener, probando } = props;
  // const navigate = useNavigate();

  return (
    <div>
      <section className="display-center">
        <h1>Resultados</h1>
      </section>
      <section className="display-center">
        <h3>Analice o guarde los resultados</h3>
      </section>
      <section>
        <ProbarSensores sensoresSelected={8} />
      </section>
      <section className="display-center">
        <h3 style={{ fontWeight: 'bold' }}>Proceso de Clasificación</h3>
      </section>
      <div className="div-closingResultadosA">
        <section className="display-flexResultadosA">
          <h5>Resultado:</h5>
          <h5>En Riesgo</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Protocolo:</h5>
          <h5>Protocolo 1</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Modelo Usado:</h5>
          <h5>Modelo 1</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Precisión:</h5>
          <h5>99.9%</h5>
        </section>
        <section className="display-center">
          <Button sx={styleButtonBigger} onClick={onClickProbar}>
            Ver Más
          </Button>
        </section>
      </div>
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
          Almacenar Datos
        </Button>
        <Button sx={styleButtonBigger} onClick={onClickProbar}>
          Generar Reporte
        </Button>
        <Button sx={styleButtonBiggerRed}>Cancelar</Button>
      </section>
      <br />
    </div>
  );
};

export default ResultadosAnalisis;
