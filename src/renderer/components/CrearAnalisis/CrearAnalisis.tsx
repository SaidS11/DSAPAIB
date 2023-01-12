/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import './CrearAnalisis.css';
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';


export interface CrearAnalisisProps {
  onClickUpload: () => void;
}

const CrearAnalisis = () => {
  const numOfSensors = () => {
    const plots = [];
    // eslint-disable-next-line no-plusplus
    for(let i = 1; i <= 8; i++) {
      plots.push(
        <option value={`${i}`}>{i}</option>
      )
    }
    return plots;
  }

  const numofModels = () => {
    const models = [];

    for(let i=1; i<=3; i++) {
      models.push(
        <option value={`Modelo${i}`}>{`Modelo ${i}`}</option>
      )
    }
    return models;
  }
  return (
    <div>
      <section className="display-center">
        <h1>Crear Análisis</h1>
      </section>
      <div className='display-center'>
      <form className="analisis-form" action="">
        <section className="display-flex">
          <h4>Nombre:</h4>
          <input className="first-input" type="text" />
        </section>
        <section className="display-flex">
          <h4>Descripción:</h4>
          <textarea className="second-input" />
        </section>
        <section className="display-flex">
          <h4>Protocolo Adquisición:</h4>
          <select className='sensores-crear-analisis'>
            {numOfSensors()}
          </select>
        </section>
        <section className="display-flex">
          <h4>Modelo:</h4>
          <select className="fourth-input-modelo">
            {numofModels()}
          </select>
        </section>
      </form>
      </div>
      <section className='display-center'>
        <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} >Crear</Button>
      </section>
      <br />
    </div>
  );
};

export default CrearAnalisis;
