/* eslint-disable prettier/prettier */
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';

export interface CrearProtocoloProps {
  onClickCrear: (arg0: React.FormEvent<HTMLFormElement>) => void;
  data: any;
}

const CrearProtocolo = (props: CrearProtocoloProps) => {
  const { onClickCrear, data } = props;
  const setConfig = () => {
    const plots = [];
    if (data.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        console.log('datos recibidios', data[i]);
        plots.push(
          <option value={`${data[i].nombre}`}>{data[i].nombre}</option>
        );
      }
      return plots;
    }
    return <option value={1}>1</option>;
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
                <input className="first-input" type="text" name="nombreProtocolo" required/>
              </section>
              <section className="display-flex">
                <h4>Descripción:</h4>
                <textarea className="second-input" name="descripcion" required/>
              </section>
              <section className="display-flex">
                <h4>Configuración:</h4>
                <select className="third-input-canales" name="config" required>
                  {setConfig()}
                </select>
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
