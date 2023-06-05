/* eslint-disable prettier/prettier */
import Button from '@mui/material/Button';
import { InputLabel, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction } from 'react';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';

export interface CrearProtocoloProps {
  onClickCrear: (arg0: React.FormEvent<HTMLFormElement>) => void;
  data: any;
  configuration: string;
  setConfiguration: Dispatch<SetStateAction<string>>
}

const CrearProtocolo = (props: CrearProtocoloProps) => {
  const { onClickCrear, data, configuration, setConfiguration } = props;

  const handleChangeConfiguration = (event: SelectChangeEvent) => {
    setConfiguration(event.target.value as string);
  };
  const setConfig = () => {
    const plots = [];
    if (data.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        console.log('datos recibidios', data[i]);
        plots.push(
          // <option value={`${data[i].nombre}`}>{data[i].nombre}</option>
          <MenuItem key={i} value={`${data[i].nombre}`}>{data[i].nombre}</MenuItem>

        );
      }
      return plots;
    }
    return <option value={0} />;
  };
    return (
        <div>
          <section className="display-center">
            <h1>Crear Protocolo</h1>
          </section>
          <div className='display-center'>
            <form className="analisis-form" onSubmit={onClickCrear}>
              <section className="display-flex">
                <h4>Nombre:</h4>
                <input className="first-input" type="text" name="nombre" required/>
              </section>
              <section className="display-flex">
                <h4>Descripción:</h4>
                <textarea className="second-input" name="descripcion" required/>
              </section>
              <section className="display-flexAgregar">
                <h4>Configuración:</h4>
                {/* <select className="third-input-canales" name="config" required>
                  {setConfig()}
                </select> */}
                <section  className="list-box-sexo">
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Configuración</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="configuracion"
                    label="Configuración"
                    value={configuration}
                    onChange={handleChangeConfiguration}
                    required
                  >
                    {setConfig()}
                  </Select>
                </FormControl>
                </section>
              </section>
              <section className='display-center'>
                <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained"
            component="label">Crear <input hidden type="submit" /></Button>
              </section>
            </form>
          </div>
          
        </div>
      );
};

export default CrearProtocolo;
