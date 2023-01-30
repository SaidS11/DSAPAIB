/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import './CrearConfiguracion.css';
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';

export interface CrearConfigProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
}

const CrearAnalisis = (props: CrearConfigProps) => {
  const { onClickNav } = props;
  const variable = "EMG's"
  
  const numofEmgs = () => {
    const emgs = [];

    for(let i=1; i<=8; i++) {
      emgs.push(
        <option value={`${i}`} key={i}>{`${i}`}</option>
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
            <section className="display-flex">
              <h4>Canales {variable}:</h4>
              <select className="third-input-canales" name="canales" required>
                {numofEmgs()}
              </select>
            </section>
            <section className='display-flex'> 
                <h4 id='labelsi'>Si</h4> <h4 id='labelno'>No</h4>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>Ritmo Cardiaco:</h4>
              <input className='first-radio' type="radio" name="ritmo" value="1" required/> 
              <input className='second-radio' type="radio" name="ritmo" value="0"/>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>SPO2:</h4>
              <input id='more-margin-left-spo2' className='first-radio' type="radio" name="spo2" value="1" required/> 
              <input className='second-radio' type="radio" name="spo2" value="0"/>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>GSR:</h4>
              <input id='more-margin-left-gsr' className='first-radio' type="radio" name="gsr" value="1" required/> 
              <input className='second-radio' type="radio" name="gsr" value="0"/>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>Temperatura:</h4>
              <input id='more-margin-right-temperature' className='first-radio' type="radio" name="temperatura" value="1" required/> 
              <input className='second-radio' type="radio" name="temperatura" value="0"/>
            </section>
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

export default CrearAnalisis;
