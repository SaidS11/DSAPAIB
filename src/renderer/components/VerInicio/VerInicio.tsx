/* eslint-disable prettier/prettier */
import './VerInicio.css';
import Button from '@mui/material/Button';

interface InicioProps {
  onClickPacientes: () => void;
  onClickProtocolo: () => void;
  onClickAnalisis: () => void;
}

export const Inicio = (props: InicioProps) => {
    const { onClickPacientes, onClickProtocolo, onClickAnalisis } = props;
    return (
      <div style={{marginTop: '3%'}}>
      <div className='display-center'>
        <h1 style={{fontWeight: '700'}}>Bienvenido al Sistema</h1>
      </div>

      <br />
      <div className='display-center'>
        <h3>Este sistema es utilizado para monitorear el pie diabetico</h3>
      </div>
      <div className='display-center'>
        <h3>usando una variedad de sensores.</h3>
      </div>
      <br />
      <div className='display-center'>
        <h2 style={{fontWeight: '600'}}>Seleccione una opción para continuar: </h2>
      </div>
      <br />
      <div className='display-center'>
        <Button onClick={onClickPacientes} style={{fontSize: '25px', border: '1px solid black', backgroundColor: 'rgb(18,10,143)', color: 'white', width: '400px', borderRadius: '20px'}}>Pacientes</Button>
      </div>
      <br />
      <div className='display-center'>
        <Button onClick={onClickProtocolo} style={{fontSize: '25px', border: '1px solid black', backgroundColor: 'rgb(18,10,143)', color: 'white', width: '400px', borderRadius: '20px'}}>Protocolo</Button>
      </div>
      <br />
      <div className='display-center'>
        <Button onClick={onClickAnalisis} style={{fontSize: '25px', border: '1px solid black', backgroundColor: 'rgb(18,10,143)', color: 'white', width: '400px', borderRadius: '20px'}}>Análisis</Button>
      </div>
      <div className='display-center'>
        <h5 style={{marginTop: '3%'}}>Universidad de Guadalajara 2023</h5>
      </div>
      </div>
    );
};

export default Inicio;