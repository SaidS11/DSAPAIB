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
import './ResultadoEntrenar.css';

export interface ResultadoEntrenarProps {
  onClickNav: () => void;
  onClickProbar: () => void;
  onClickDetener: () => void;
  probando: boolean;
  onClickBack: () => void;
  precision: string;
  f1: string;
  recall: string;
  crossParsed: string;
  analisis: any;
  tipo: string;
}

const ResultadoEntrenar = (props: ResultadoEntrenarProps) => {
  const {
    onClickNav,
    onClickProbar,
    onClickDetener,
    probando,
    onClickBack,
    precision,
    f1,
    recall,
    crossParsed,
    analisis,
    tipo,
  } = props;
  // const navigate = useNavigate();

  return (
    <div>
      <section className="display-center">
        <h1>Resultados</h1>
      </section>
      <section className="display-center">
        <h3>Tabla con resultados por sujeto</h3>
      </section>
      <section className="display-center">
        <h3>Analice o guarde los resultados</h3>
      </section>
      <section>
        <ProbarSensores
          sensoresSelected={8}
          onClickNav={undefined}
          onClickStop={undefined}
          dataXParam={undefined}
          dataYParam={undefined}
        />
      </section>
      <section className="display-center">
        <h3 style={{ fontWeight: 'bold' }}>Proceso de Clasificación</h3>
      </section>
      <div className="div-closingResultadosEntr">
        <section className="display-flexResultadosEntr">
          <h5>Resultado:</h5>
          <h5>En Riesgo</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Protocolo:</h5>
          <h5>{analisis.protocolo}</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Implementación Usada:</h5>
          <h5>{analisis.algoritmo}</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Nombre del modelo generado:</h5>
          <h5>NA</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Despues de las iteraciones seleccionadas:</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>{crossParsed}</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Precisión:</h5>
          <h5>{precision}%</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>F1:</h5>
          <h5>{f1}%</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Recall:</h5>
          <h5>{recall}%</h5>
        </section>
        <section className="display-center">
          <Button sx={styleButtonBigger} onClick={onClickProbar}>
            Ver Más
          </Button>
        </section>
      </div>
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
          Guardar Modelo
        </Button>
        <Button sx={styleButtonBiggerRed} onClick={onClickBack}>
          Regresar
        </Button>
      </section>
      <br />
    </div>
  );
};

export default ResultadoEntrenar;
