import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import styleButton, {
  checkBoxConfig,
  styleButtonBiggerRed,
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
  const variable = "EMG's";
  return (
    <div>
      <section className="display-center">
        <h1>Configuración</h1>
      </section>
      <div className="display-center">
        <form className="analisis-form" action="">
          <section className="display-flex">
            <h4>Nombre:</h4>
            <input
              className="first-input"
              type="text"
              value={resp[0].nombre}
              disabled
            />
          </section>
          <section className="display-flex">
            <h4>Descripción:</h4>
            <textarea
              className="second-input"
              value={resp[0].descripcion === null ? '...' : resp[0].descripcion}
              disabled
            />
          </section>
          <section className="display-flex">
            <h4>Canales {variable}:</h4>
            <select className="third-input-canales">
              <option value={`${resp[0].emgs}`}>{resp[0].emgs}</option>
            </select>
          </section>
          <section className="display-flex">
            <h4>Sensores Adicionales</h4>
          </section>
          <div className="display-margin">
            <div>
              <h4>Ritmo Cardiaco:</h4>
              <h4>Frecuencia Cardiaca:</h4>
              <h4>Giroscopio:</h4>
              <h4>Acelerometro:</h4>
            </div>
            <div>
              {resp[0].rimto_cardiaco === true ? (
                <Checkbox
                  disabled
                  checked
                  sx={checkBoxConfig}
                  name="ritmo"
                  value="1"
                />
              ) : (
                <Checkbox disabled sx={checkBoxConfig} name="ritmo" value="0" />
              )}
              {resp[0].frecuencia_cardiaca === true ? (
                <Checkbox
                  checked
                  disabled
                  sx={checkBoxConfig}
                  name="frecuencia"
                  value="1"
                />
              ) : (
                <Checkbox
                  disabled
                  sx={checkBoxConfig}
                  name="frecuencia"
                  value="0"
                />
              )}
              {resp[0].giroscopio === true ? (
                <Checkbox
                  checked
                  disabled
                  sx={checkBoxConfig}
                  name="giroscopio"
                  value="1"
                />
              ) : (
                <Checkbox
                  disabled
                  sx={checkBoxConfig}
                  name="giroscopio"
                  value="0"
                />
              )}
              {resp[0].acelerometro === true ? (
                <Checkbox
                  checked
                  disabled
                  sx={checkBoxConfig}
                  name="acelerometro"
                  value="1"
                />
              ) : (
                <Checkbox
                  disabled
                  sx={checkBoxConfig}
                  name="acelerometro"
                  value="0"
                />
              )}
            </div>
          </div>
          <section className="display-flexVerDetalle" id="less-margin-top">
            <h4>Video:</h4>
            <h6>{multimedia[0].link_video}</h6>
            <Button sx={styleButton}>Ver</Button>
          </section>
          <section className="display-flexVerDetalle" id="less-margin-top">
            <h4>Imagen:</h4>
            <h6>{multimedia[0].link_imagen}</h6>
            <Button sx={styleButton}>Ver</Button>
          </section>
        </form>
      </div>
      <section className="display-center">
        <Button
          sx={styleButtonBiggerRed}
          style={{ marginTop: '10px', fontSize: '20px' }}
          onClick={onClickNav}
        >
          Regresar
        </Button>
      </section>
    </div>
  );
};

export default VerConfiguracionDetalle;
