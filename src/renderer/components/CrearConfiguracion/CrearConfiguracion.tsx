/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import './CrearConfiguracion.css';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { InputLabel, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  styleButtonBiggerGreen, checkBoxConfig,
} from '../VerPaciente/ButtonStyle';
import { Dispatch, SetStateAction } from 'react';

export interface CrearConfigProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
  canales: string;
  setCanales: Dispatch<SetStateAction<string>>
}

const CrearConfiguracion = (props: CrearConfigProps) => {
  const { onClickNav, canales, setCanales } = props;
  const variable = "EMG's"
  
  const handleChangeCanales = (event: SelectChangeEvent) => {
    setCanales(event.target.value as string);
  };

  const numofEmgs = () => {
    const emgs = [];
    for(let i=1; i<=8; i++) {
      emgs.push(
        // <option value={`${i}`} key={i}>{`${i}`}</option>
        <MenuItem key={i} value={i}>{`${i}`}</MenuItem>

      )
    }
    return emgs;
  }

    return (
        <div>
          <section className="display-center">
            <h1>Crear Configuración</h1>
          </section>
          <div className='display-center'>
          <form className="analisis-form" onSubmit={onClickNav}>
            <section className="display-flex">
              <h4>Nombre:</h4>
              <input className="first-input" type="text" name="nombreConfig" required/>
            </section>
            <section className="display-flex">
              <h4>Descripción:</h4>
              <textarea className="second-input" name="descripcion" required/>
            </section>
            <section className="display-flexAgregar">
              <h4>Canales {variable}:</h4>
              {/* <select className="third-input-canales" name="canales" required>
                {numofEmgs()}
              </select> */}
              <section  className="list-box-sexo">
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Canales</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="canales"
                  label="Canales"
                  value={canales}
                  onChange={handleChangeCanales}
                  required
                >
                  {numofEmgs()}
                </Select>
                </FormControl>
              </section>
            </section>
            <section className='display-flex'>
                <h4>Sensores Adicionales</h4>
            </section>
            <div className='display-margin'>
              <div >
                <h4>Ritmo Cardiaco:</h4>
                <h4>Frecuencia Cardiaca:</h4>
                <h4>Giroscopio:</h4>
                <h4>Acelerometro:</h4>
              </div>
              <div>
                <Checkbox  sx={checkBoxConfig} name="ritmo" value="1"  />
                <Checkbox   sx={checkBoxConfig} name="frecuencia" value="1"  />
                <Checkbox  sx={checkBoxConfig} name="giroscopio" value="1"  />
                <Checkbox   sx={checkBoxConfig} name="acelerometro" value="1"  />
              </div>
            </div>

            <section className='display-center'>
              <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained"
            component="label" >Continuar
              <input hidden type="submit" />
              </Button>
            </section>
          </form>
          </div>
          <br />
        </div>
      );
};

export default CrearConfiguracion;
