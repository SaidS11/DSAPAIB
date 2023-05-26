import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './ColocacionMuestra.css';

export interface ColocacionProps {
  onClickNav: () => void;
  onClickBack: () => void;
  url: string;
}

const ColocacionMuestra = (props: ColocacionProps) => {
  const { onClickNav, onClickBack, url } = props;
  // const navigate = useNavigate();
  const [protocolo, setProtocolo] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const num = parseInt(event.target.value, 10);
    setProtocolo(event.target.value as string);
  };
  // Agregar carga de imagen setload
  return (
    <div>
      <section className="display-center">
        <h1>Demostración de colocación de Instrumentos</h1>
      </section>
      <section className="display-center">
        <h3>Siga las instrucciones y conecte el dispositivo de adquisición al equipo</h3>
      </section>
      <section className="display-center">
        <img src={url} alt="imagen-protocolo" />
      </section>
      <section className="display-center space-divEscogerColocacionM">
        <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
          Confirmar
        </Button>
        <Button sx={styleButtonBiggerRed} onClick={onClickBack}>
          Regresar
        </Button>
      </section>
    </div>
  );
};

export default ColocacionMuestra;
