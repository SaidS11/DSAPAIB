import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {
  styleButtonBigger,
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './EscogerConfiguracion.css';

export interface LoginProps {
  onClickNav: () => void;
  onClickBack: () => void;
  onClickAdd: () => void;
  onClickVer: () => void;
  data: any;
  protocolo: any;
  setProtocolo: any;
}

const EscogerConfiguracion = (props: LoginProps) => {
  const {
    onClickNav,
    onClickBack,
    onClickVer,
    data,
    onClickAdd,
    protocolo,
    setProtocolo,
  } = props;
  // const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setProtocolo(event.target.value as string);
  };
  const setProtocols = () => {
    const plots = [];
    if (data.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        console.log('datos recibidios', data[i]);
        plots.push(
          <MenuItem key={i} value={`${data[i].nombre}`}>
            {data[i].nombre}
          </MenuItem>
        );
      }
      return plots;
    }
    return <option value={1}>1</option>;
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
        <h4 className="select-EscogerC ">Protocolo:</h4>
        <section className="list-box-protocolo">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Protocolo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={protocolo}
              label="Protocolo"
              onChange={handleChange}
              required
            >
              {setProtocols()}
            </Select>
          </FormControl>
        </section>
        <Button sx={styleButtonBigger} onClick={onClickVer}>
          Ver
        </Button>
      </section>
      <section className="display-center space-divEscoger">
        <Button sx={styleButtonBigger} onClick={onClickAdd}>
          Agregar Protocolo
        </Button>
      </section>
      <section className="display-center">
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

export default EscogerConfiguracion;
