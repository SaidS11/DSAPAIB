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
  onClickCrear: (arg0: React.FormEvent<HTMLFormElement>) => void;
}

const Resultados = (props: ResultadosProps) => {
  const {
    onClickGuardar,
    onClickProbar,
    onClickBack,
    probando,
    sensores,
    dataArr,
    gridLayout,
    onClickCrear,
  } = props;
  // const navigate = useNavigate();
  console.log("DATAARR", dataArr);
  return (
    <div>
      <section className="display-center">
        <h1>Resultados</h1>
      </section>
      <section className="display-center">
        <h3>Analice o guarde los resultados</h3>
      </section>
      <GraficaDeSensores dataArr={dataArr} gridLayout={gridLayout} />
      <form onSubmit={onClickCrear}>
        <section className="display-flex">
          <h5>Etiqueta del registro: </h5>
          <input
            type="text"
            name="etiqueta"
            style={{ marginLeft: '10px' }}
          />
        </section>
        <br />
        {/* <section>
          <ProbarSensores sensoresSelected={sensores} />
        </section> */}
        
        <section className="display-center">
        <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained"
            component="label">Guardar Registro <input hidden type="submit" /></Button>
          <Button sx={styleButtonBiggerRed} style={{marginTop: '10px', fontSize: '20px'}} onClick={onClickBack}>
            Cancelar
          </Button>
        </section>
      </form>
      <br />
    </div>
  );
};

export default Resultados;
