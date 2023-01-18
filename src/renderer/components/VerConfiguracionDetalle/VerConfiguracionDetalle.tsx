/* eslint-disable prettier/prettier */
import Button from '@mui/material/Button';
import styleButton, {
  styleButtonBiggerRed
} from '../VerPaciente/ButtonStyle';
import './VerConfiguracionDetalle.css';

export interface VerConfiguracionDetalleProps {
  onClickNav: () => void;
  resp: any;
  multimedia: any;
}

const VerConfiguracionDetalle = (props: VerConfiguracionDetalleProps) => {
  const { onClickNav, resp, multimedia } = props;
  console.log('esta es la resp', resp);
  const variable = "EMG's"
    return (
        <div>
          <section className="display-center">
            <h1>Configuración</h1>
          </section>
          <div className='display-center'>
          <form className="analisis-form" action="">
            <section className="display-flex">
              <h4>Nombre:</h4>
              <input className="first-input" type="text" value={resp[0].nombre} disabled />
            </section>
            <section className="display-flex">
              <h4>Descripción:</h4>
              <textarea className="second-input" value={resp[0].descripcion === null ? "..." : resp[0].descripcion} disabled/>
            </section>
            <section className="display-flex">
              <h4>Canales {variable}:</h4>
              <select className="third-input-canales">
                <option value={`${resp[0].emgs}`}>{resp[0].emgs}</option>
              </select>
            </section>
            <section className='display-flex'> 
                <h4 id='labelsi'>Si</h4> <h4 id='labelno'>No</h4>
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>Ritmo Cardiaco:</h4>
                {
                  resp[0].rimto_cardiaco === true ?
                  <><input className='first-radio' type="radio" name="ritmo" value="si" checked  />
                  <input className='second-radio' type="radio" name="ritmo" value="no" disabled /></>
                  :
                  <><input className='first-radio' type="radio" name="ritmo" value="si" disabled />
                  <input className='second-radio' type="radio" name="ritmo" value="no" checked  /></>
                }
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>SPO2:</h4>
              {
                resp[0].spo2 === true ?
                <><input id='more-margin-left-spo2' className='first-radio' type="radio" name="spo2" value="si" checked/> 
                <input className='second-radio' type="radio" name="spo2" value="no" disabled/></>
                :
                <><input id='more-margin-left-spo2' className='first-radio' type="radio" name="spo2" value="si" disabled/> 
                <input className='second-radio' type="radio" name="spo2" value="no" checked/></>
              }
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>GSR:</h4>
              {
                resp[0].gsr === true ?
                <><input id='more-margin-left-gsr' className='first-radio' type="radio" name="gsr" value="si" checked /> 
                <input className='second-radio' type="radio" name="gsr" value="no" disabled/></>
                :
                <><input id='more-margin-left-gsr' className='first-radio' type="radio" name="gsr" value="si" disabled/> 
                <input className='second-radio' type="radio" name="gsr" value="no" checked/></>
              }
              
            </section>

            <section className="display-flex" id='less-margin-top'>
              <h4>Temperatura:</h4>
              {
                resp[0].temperatura === true ?
                <><input id='more-margin-right-temperature' className='first-radio' type="radio" name="temperatura" value="si" checked/> 
                <input className='second-radio' type="radio" name="temperatura" value="no" disabled/></>
                :
                <><input id='more-margin-right-temperature' className='first-radio' type="radio" name="temperatura" value="si" disabled/> 
                <input className='second-radio' type="radio" name="temperatura" value="no" checked/></>
              }
            </section>
            <section className="display-flexVerDetalle" id='less-margin-top'>
              <h4>Video:</h4>
              <h6>{multimedia[0].link_video}</h6>
              <Button sx={styleButton} >Ver</Button>
            </section>
            <section className="display-flexVerDetalle" id='less-margin-top'>
              <h4>Imagen:</h4>
              <h6>{multimedia[0].link_imagen}</h6>
              <Button sx={styleButton} >Ver</Button>
            </section>
          </form>
          </div>
          <section className='display-center'>
            <Button sx={styleButtonBiggerRed} style={{marginTop: '10px', fontSize: '20px'}} onClick={onClickNav} >Regresar</Button>
          </section>
          
        </div>
      );
};

export default VerConfiguracionDetalle;
