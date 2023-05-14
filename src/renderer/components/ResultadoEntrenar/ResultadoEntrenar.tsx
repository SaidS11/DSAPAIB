/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
  styleButtonBigger,
} from '../VerPaciente/ButtonStyle';
import ResultsTableContainer from '../Utilities/ResultsTableContainer';
import './ResultadoEntrenar.css';

export interface ResultadoEntrenarProps {
  onClickSave: () => void;
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
  respAnalisis: string;
  toggleModalVerMas: any;
  onClickCambiar: () => void;
}

const ResultadoEntrenar = (props: ResultadoEntrenarProps) => {
  const {
    onClickSave,
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
    respAnalisis,
    toggleModalVerMas,
    onClickCambiar,
  } = props;
  const navigate = useNavigate();
  
  return (
    <div>
      <section className="display-center">
        <h3>Analice o guarde los resultados</h3>
      </section>
      <section className="display-center">
        <h3 style={{ fontWeight: 'bold' }}>Proceso de Clasificación</h3>
      </section>

      <section className="display-center">
        <h3>Tabla con resultados por sujeto</h3>
      </section>
      <section className="display-center">
        <ResultsTableContainer stringObjData={respAnalisis} />
      </section>
      <section className="display-center">
        <h1>Métricas:</h1>
      </section>
      <div className="div-closingResultadosEntr">
        <section className="display-flexResultadosA">
          <h5>Protocolo: </h5>
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
          <Button
            sx={styleButtonBigger}
            onClick={() => toggleModalVerMas('body')}
          >
            Ver Más
          </Button>
        </section>
      </div>
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={onClickSave}>
          Guardar Modelo
        </Button>
        <Button sx={styleButtonBigger} onClick={onClickCambiar}>
          Cambiar Algoritmo
        </Button>
        <Button sx={styleButtonBiggerRed} onClick={onClickBack}>
          Cancelar
        </Button>
      </section>
      <br />
    </div>
  );
};

export default ResultadoEntrenar;
