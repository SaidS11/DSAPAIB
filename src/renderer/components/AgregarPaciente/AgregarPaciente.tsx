import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';
import './AgregarPaciente.css';

export interface AgregarPacienteProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
}

const AgregarPaciente = (props: AgregarPacienteProps) => {
  const { onClickNav } = props;
  // const navigate = useNavigate();
  const [sexo, setSexo] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const num = parseInt(event.target.value, 10);
    setSexo(event.target.value as string);
  };

  return (
    <div>
      <section className="display-center">
        <h1>Añadir Paciente</h1>
      </section>
      <section className="display-center">
        <h3>Rellene los datos del paciente</h3>
      </section>
      <div className="display-center">
        <form className="analisis-form" onSubmit={onClickNav}>
          <section className="display-flexAgregar">
            <h4>Nombre:</h4>
            <input
              className="first-inputAgregar"
              type="text"
              id="nombrePaciente"
              name="nombrePaciente"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Apellido Paterno:</h4>
            <input
              className="first-inputAgregar"
              type="text"
              name="apellidoPaterno"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Apellido Materno:</h4>
            <input
              className="first-inputAgregar"
              type="text"
              name="apellidoMaterno"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Sexo:</h4>
            <section className="list-box-sexo">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="sexo"
                  value={sexo}
                  label="Sexo"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                </Select>
              </FormControl>
            </section>
          </section>
          <section className="display-flexAgregar">
            <h4>Telefono:</h4>
            <input
              className="first-inputAgregar"
              type="tel"
              name="telefono"
              pattern="[0-9]{10}"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Fecha de Nacimiento:</h4>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              min="1900-01-01"
              max="2022-12-31"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Correo:</h4>
            <input type="email" id="email" name="email" size={47} required />
          </section>
          <section className="display-flexAgregar">
            <h4>Peso: (kg)</h4>
            <input type="number" id="peso" name="peso" min="10" max="500" />
            <h4>Estatura: (cm)</h4>
            <input
              type="number"
              id="estatura"
              name="estatura"
              min="10"
              max="300"
              required
            />
          </section>
          <br />
          <section className="display-center">
            <Button
              sx={styleButtonBiggerGreen}
              variant="contained"
              component="label"
            >
              Confirmar
              <input hidden type="submit" />
            </Button>
            <Button sx={styleButtonBiggerRed}>Regresar</Button>
          </section>
        </form>
      </div>
      <br />
    </div>
  );
};

export default AgregarPaciente;
