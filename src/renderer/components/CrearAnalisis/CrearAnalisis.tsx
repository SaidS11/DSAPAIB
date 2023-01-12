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
  const numOfPlots = () => {
    const plots = [];
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < 5; i++) {
      plots.push(
        <option value={`${i}`}>{i}</option>
      )
    }
    return plots;
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
          <h4>Protocol Adquisición:</h4>
          <select className="third-input">
            {numOfPlots()}
          </select>
        </section>
        <section className="display-flex">
          <h4>Modelo:</h4>
          <select className="fourth-input-modelo">
            <option value="1">Modelo 1</option>
            <option value="2">Modelo 2</option>
            <option value="0">Añadir Modelo</option>
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
