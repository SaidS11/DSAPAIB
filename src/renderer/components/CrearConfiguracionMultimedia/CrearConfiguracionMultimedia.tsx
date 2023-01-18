/* eslint-disable prettier/prettier */
import './CrearConfiguracion.css';
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen, styleButtonBiggerRed
} from '../VerPaciente/ButtonStyle';

export interface CraerConfigMultiProps {
  onClickBack: () => void;
  onClickUpload: () => void;
}

const CrearConfiguracionMultimedia = (props: CraerConfigMultiProps) => {
  const { onClickBack, onClickUpload } = props;
  const variable = "EMG's"
    return (
        <div>
          <section className="display-center">
            <h1>Seleccione su multimedia</h1>
          </section>
          <section className="display-center">
            <h2>Al presionar Crear sus archivos seran subidos a la nube</h2>
          </section>
          <section className="display-center">
            <h3>Video:</h3>
          </section>
          <section className="display-center">
            <input type="file" id="video-upload" accept='.mp4, .mov, .avi, .mkv, .webm, .wmv' />
          </section>
          <section className="display-center">
            <h3>Imagen:</h3>
          </section>
          <section className="display-center">
            <input type="file" id="file-upload" accept='.jpg, .png, .jpeg' />
          </section>
          <br />
          <section className='display-center'>
            <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} onClick={onClickUpload}>Crear</Button>
          </section>
          <section className='display-center'>
            <Button sx={styleButtonBiggerRed} style={{marginTop: '10px', fontSize: '20px'}} onClick={onClickBack}>Cancelar</Button>
          </section>
          
        </div>
      );
};

export default CrearConfiguracionMultimedia;
