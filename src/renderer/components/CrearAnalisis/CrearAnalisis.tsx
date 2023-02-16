/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import './CrearAnalisis.css';
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';


export interface CrearAnalisisProps {
  data: any;
  dataM: any;
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
}

const CrearAnalisis = (props: CrearAnalisisProps) => {
  const { data, dataM, onClickNav } = props;
  const setProtocols = () => {
    const protocols = [];
    if (data.length > 1) {
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < data.length; i++) {
        // console.log('datos recibidios', data[i]);
        protocols.push(
          <option  key={i} value={`${data[i].nombre}`}>{data[i].nombre}</option>
        )
      }
      return protocols;
    }
    return <option value={1}>1</option>;
  }

  const numofModels = () => {
    const models = [];
    if (dataM.length >= 1) {
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < dataM.length; i++) {
        // console.log('datos recibidios', data[i]);
        models.push(
          <option  key={i} value={`${dataM[i].modelo}`}>{dataM[i].modelo}</option>
        )
      }
      return models;
    }
    return <option value={1}>1</option>;
  }
  return (
    <div>
      <section className="display-center">
        <h1>Crear Análisis</h1>
      </section>
      <div className='display-center'>
      <form className="analisis-form" onSubmit={onClickNav}>
        <section className="display-flex">
          <h4>Nombre:</h4>
          <input className="first-input" type="text" name="nombre" required/>
        </section>
        <section className="display-flex">
          <h4>Descripción:</h4>
          <textarea className="second-input" name="descripcion" required/>
        </section>
        <section className="display-flex">
          <h4>Protocolo Adquisición:</h4>
          <select className='sensores-crear-analisis' name="protocolo" required>
            {setProtocols()}
          </select>
        </section>
        <section className="display-flex">
          <h4>Modelo:</h4>
          <select className="fourth-input-modelo" name="modelo" required>
            {numofModels()}
          </select>
        </section>
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

export default CrearAnalisis;
