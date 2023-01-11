/* eslint-disable prettier/prettier */
import './CrearAnalisis.css';
import Button from '@mui/material/Button';

const CrearAnalisis = () => {
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
          <select className="third-input-protocolo">
            <option value="1">Protocolo 1</option>
            <option value="2">Protocolo 2</option>
            <option value="0">Añadir Protocolo</option>
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
        <Button className='green-button' style={{marginTop: '10px', fontSize: '20px'}} >Crear</Button>
      </section>
      
    </div>
  );
};

export default CrearAnalisis;
