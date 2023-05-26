/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';

interface CrearImplementacionProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
}

const CrearAlgoritmo = (
  props: CrearImplementacionProps
) => {
  const { onClickNav } = props;
  const numofModels = () => {
    const models = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 3; i++) {
      models.push(<option value={`Modelo${i}`}>{`Modelo ${i}`}</option>);
    }
    return models;
  };
  const [tipo, setTipo] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    const word = event.target.value;
    setTipo(word);
    console.log(word);
  };

  return (
    <div>
      <div className="display-center">
        <h1>Implementación</h1>
      </div>
      <div className="display-center">
        <form className="analisis-form" style={{ width: '70%' }}  onSubmit={onClickNav}>
          <section className="display-flex">
            <h3>Nombre: </h3>{' '}
            <input
              className="first-input"
              type="text"
              name="nombreModelo"
              required
            />
          </section>
          <section className="display-flex">
            <h3>Descripción: </h3>{' '}
            <textarea className="second-input" name="descripcion" required />
          </section>
          <section className="display-flexAgregar">
            <h3>Algoritmo: </h3>{' '}
            <section className="list-box-sexo" style={{ width: "200px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Algoritmo
                </InputLabel>
                <Select labelId="demo-simple-select-label"
                    id="demo-simple-select" onChange={handleChange}
                    name="algoritmo"
                    value={tipo}
                    label="Algoritmo"
                    required
                    >
                  <MenuItem value="Arbol de Decisión">Arbol de Decisión</MenuItem>
                  <MenuItem value=" K-Nearest Neighbor"> K-Nearest Neighbor</MenuItem>
                  <MenuItem value="Red Neuronal">Red Neuronal</MenuItem>
                  <MenuItem value="Maquina de Soporte Vectorial">Maquina de Soporte Vectorial</MenuItem>
                </Select>
              </FormControl>
            </section>
          </section>
          {tipo === "Arbol de Decisión" && <><section>
            <section className="display-flex">
              <h3>Profundidad: </h3>{' '}
              <input
                className="first-input"
                type="number"
                name="profundidad"
                required
                style={{ width: '40%' }} />
            </section>
            <section className="display-flex">
              <h3>Estado Aleatorio: </h3>{' '}
              <input
                className="first-input"
                type="number"
                name="estado"
                required
                style={{ width: '40%' }} />
            </section>
            <br />
          </section></>}
          
          {tipo === "Red Neuronal" && <><section className="display-flex">
            <h3>Vecinos: </h3>{' '}
            <input
              className="first-input"
              type="number"
              name="vecinos"
              required
              style={{ width: '30%' }} />
          </section></>}

            {tipo === "Maquina de Soporte Vectorial" && <section>
              <section className="display-flex">
                <h3>Kernel: </h3>{' '}
                <input
                  className="first-input"
                  type="text"
                  name="kernel"
                  required
                  style={{ width: '30%' }} />
              </section>
              <br />
            </section>}

            <br />
            <section className='display-center'>
              <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained" component="label">Crear
              <input hidden type="submit" />
              </Button>
            </section>
        </form>
      </div>
      <br />
    </div>
  );
};

export default CrearAlgoritmo;
