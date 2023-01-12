/* eslint-disable prettier/prettier */
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';

export interface CrearProtocoloProps {
  onClickNav: () => void;
}

const CrearProtocolo = (props: CrearProtocoloProps) => {
  const { onClickNav } = props;
  const variable = "EMG's"
    return (
        <div>
          <section className="display-center">
            <h1>Crear Protocolo</h1>
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
              <h4>Canales {variable}:</h4>
              <select className="third-input-canales">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </section>
          </form>
          </div>
          <section className='display-center'>
            <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} onClick={onClickNav} >Crear</Button>
          </section>
          
        </div>
      );
};

export default CrearProtocolo;
