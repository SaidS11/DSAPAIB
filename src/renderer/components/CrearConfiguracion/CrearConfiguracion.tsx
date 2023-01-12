/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import './CrearConfiguracion.css';
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';

export interface CraerConfigProps {
  onClickNav: () => void;
}

const CrearAnalisis = (props: CraerConfigProps) => {
  const { onClickNav } = props;
  const variable = "EMG's"
  
  const numofEmgs = () => {
    const emgs = [];

    for(let i=1; i<=8; i++) {
      emgs.push(
        <option value={`${i}`}>{`${i}`}</option>
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
                {numofEmgs()}
              </select>
            </section>
            <section className='display-flex'> 
                <h4 id='labelsi'>Si</h4> <h4 id='labelno'>No</h4>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>Ritmo Cardiaco:</h4>
              <form>
              <input className='first-radio' type="radio" name="ritmo" value="si"/> 
              <input className='second-radio' type="radio" name="ritmo" value="no"/>
              </form>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>SPO2:</h4>
              <form>
              <input id='more-margin-left-spo2' className='first-radio' type="radio" name="spo2" value="si"/> 
              <input className='second-radio' type="radio" name="spo2" value="no"/>
              </form>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>GSR:</h4>
              <form>
              <input id='more-margin-left-gsr' className='first-radio' type="radio" name="gsr" value="si"/> 
              <input className='second-radio' type="radio" name="gsr" value="no"/>
              </form>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>Temperatura:</h4>
              <form>
              <input id='more-margin-right-temperature' className='first-radio' type="radio" name="temperatura" value="si"/> 
              <input className='second-radio' type="radio" name="temperatura" value="no"/>
              </form>
            </section>

          </form>
          </div>
          <section className='display-center'>
            <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} onClick={onClickNav} >Continuar</Button>
          </section>
          
        </div>
      );
};

export default CrearAnalisis;
