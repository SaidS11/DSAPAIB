import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import {
  styleButtonBigger,
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './EscogerConfiguracion.css';

export interface LoginProps {
  onClickNav: () => void;
}

const EscogerConfiguracion = (props: LoginProps) => {
  const { onClickNav } = props;
  // const navigate = useNavigate();
  const [protocolo, setProtocolo] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const num = parseInt(event.target.value, 10);
    setProtocolo(event.target.value as string);
  };

  return (
    <div>
      <section className="display-center">
        <h1>Elija su Protocolo</h1>
      </section>
      <section className="display-center">
        <h3>Escoger Protocolo Guardado</h3>
      </section>
      <section className="display-flexEscogerC">
        <h4 className="select-EscogerC ">Sexo:</h4>
        <section className="list-box-protocolo">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Protocolo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={protocolo}
              label="Protocolo"
              onChange={handleChange}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
            </Select>
          </FormControl>
        </section>
        <Button sx={styleButtonBigger}>Ver</Button>
      </section>
      <br />
      <section className="display-center space-divEscoger">
        <Button sx={styleButtonBigger}>Agregar Protocolo</Button>
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
          Confirmar
        </Button>
        <Button sx={styleButtonBiggerRed}>Regresar</Button>
      </section>
    </div>
  );
};

export default EscogerConfiguracion;
