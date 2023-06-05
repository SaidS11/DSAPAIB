/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { styleButtonBiggerRed } from '../VerPaciente/ButtonStyle';

interface VerModeloProps {
  resp: any;
}

const VerModelo = (props: VerModeloProps) => {
  const { resp } = props;
  const [tipo, setTipo] = useState(resp.algoritmo_ia);
  const handleChange = (event: SelectChangeEvent) => {
    const word = event.target.value;
    setTipo(word);
  };

  return (
    <div>
      <div className="display-center">
        <h1>Implementación</h1>
      </div>
      <div className="display-center">
        <form className="analisis-form" style={{ width: '70%' }}>
          <section className="display-flex">
            <h3>Nombre: </h3>{' '}
            <input
              className="first-input"
              type="text"
              name="nombreModelo"
              value={resp.nombre}
              required
              disabled
            />
          </section>
          <section className="display-flex">
            <h3>Descripción: </h3>{' '}
            <textarea className="second-input" name="descripcion" required disabled value={resp.descripcion}/>
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
                    disabled
                    >
                  <MenuItem value="Arbol de Decisión">Arbol de Decisión</MenuItem>
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
                style={{ width: '40%' }}
                disabled 
                value={resp.parametros.profundidad}
                />
            </section>
            <section className="display-flex">
              <h3>Estado Aleatorio: </h3>{' '}
              <input
                className="first-input"
                type="number"
                name="estado"
                required
                style={{ width: '40%' }} 
                disabled
                value={resp.parametros.estado}
                />
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
              style={{ width: '30%' }} 
              disabled
              value={resp.parametros.vecinos}
              />
          </section></>}

            {tipo === "Maquina de Soporte Vectorial" && <section>
              <section className="display-flex">
                <h3>Kernel: </h3>{' '}
                <input
                  className="first-input"
                  type="text"
                  name="kernel"
                  required
                  style={{ width: '30%' }} 
                  disabled
                  value={resp.parametros.kernel}
                  />
              </section>
              <br />
            </section>}

            <br />
            <section className='display-center'>
              <Button sx={styleButtonBiggerRed} style={{marginTop: '10px', fontSize: '20px'}} variant="contained" component="label">Regresar
              <input hidden type="submit" />
              </Button>
            </section>
        </form>
      </div>
      <br />
    </div>
  );
};

export default VerModelo;
