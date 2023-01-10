/* eslint-disable prettier/prettier */
import './CrearAnalisis.css';
import Button from '@mui/material/Button';

export interface CrearAnalisisProps {
  onClickUpload: () => void;
}

const CrearAnalisis = (props: CrearAnalisisProps) => {
  const { onClickUpload } = props;
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
          <select className="third-input">
            {numOfPlots()}
          </select>
        </section>
        <section className="display-flex">
          <h4>Modelo:</h4>
          <select className="fourth-input">
            <option value="1">Modelo 1</option>
            <option value="2">Modelo 2</option>
            <option value="0">Añadir Modelo</option>
          </select>
        </section>
      </form>
      <br />
      <section className="display-center">
        <input type="file" id="file-upload"  />
      </section>
      <section className="display-center">
        <Button className="green-button" onClick={onClickUpload} >Ir a Inicio</Button>
      </section>
    </div>
  );
};

export default CrearAnalisis;
