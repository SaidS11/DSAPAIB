/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import { pink } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import React from 'react';
import styleButton, {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';
import './CaracterizarParte2.css';

export interface CaracterizarParte2Props {
  componentArray: any;
  OnClickNav: () => void;
  OnClickBack: () => void;
}

const CaracterizarParte2 = (props: CaracterizarParte2Props) => {
  const { componentArray, OnClickNav, OnClickBack } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    console.log('Checked', event.target.value);
  };

  return (
    <div>
      <section className="display-center">
        <h1>Resultados</h1>
      </section>
      <section className="display-center">
        <h3>Tabla con la selección de ventanas</h3>
      </section>
      {...componentArray}
      <section className="display-center" style={{ marginTop: '5%' }}>
        Datos obtenidos tras calcular con las ventanas seleccionadas por cada
        sensor.
      </section>
      <section className="display-center" style={{ fontWeight: 'bold' }}>
        Si la extracción de características fue exitosa continue el proceso. Al
        presionar continuar se almacenara lo siguiente:
      </section>
      <section className="display-center">
        <FormGroup>
          <FormControlLabel
            disabled
            control={<Checkbox defaultChecked />}
            label="Ventanas"
          />
          {/* <FormControlLabel control={<Checkbox />} label="Selecciones por señal" /> */}
          <FormControlLabel
            disabled
            control={<Checkbox defaultChecked />}
            // onChange={handleChange}
            // control={<Checkbox />}
            label="Características"
          />
        </FormGroup>
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={OnClickNav}>
          Continuar
        </Button>
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerRed} onClick={OnClickBack}>
          Cancelar
        </Button>
      </section>
    </div>
  );
};

export default CaracterizarParte2;
