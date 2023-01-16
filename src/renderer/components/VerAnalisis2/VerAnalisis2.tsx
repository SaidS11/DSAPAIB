/* eslint-disable prettier/prettier */
import './VerAnalisis2.css';
import Button from '@mui/material/Button';
import {
    styleButtonBiggerGreen,
  } from '../VerPaciente/ButtonStyle';

const VerAnalisis2 = () => {
    return (
        <div>
            <div className='display-center'>
                <h1>Análisis Seleccionado</h1>
            </div>
            <div style={{border: '1px solid black', marginLeft: '26%', width: '850px', paddingLeft: '40px', borderRadius: '5px', paddingBottom: '35px'}}>
                <div style={{display: 'flex', marginTop: '50px'}}>
                    <h3>Nombre: </h3> <h3 style={{marginLeft: '350px', border: '1px solid black', width: '300px', paddingLeft: '5px', borderRadius: '5px'}}>Analisis T</h3>
                </div>
                <div style={{display: 'flex', marginTop: '30px'}}>
                    <h3>Descripción: </h3> <textarea style={{marginLeft: '300px', width: '300px', maxHeight: '150px', minHeight: '150px'}} disabled/>
                </div>
                <div style={{display: 'flex', marginTop: '30px'}}>
                    <h3>Protocolo Adquisición: </h3> <h3 style={{marginLeft: '178px', border: '1px solid black', width: '300px', paddingLeft: '5px', borderRadius: '5px'}}>Protocolo T</h3>
                </div>
                <div style={{display: 'flex', marginTop: '30px'}}>
                    <h3>Modelo: </h3> <h3 style={{ marginLeft: '357px', border: '1px solid black', width: '300px', paddingLeft: '5px', borderRadius: '5px'}}>Modelo T</h3>
                </div>
                
            </div>
            <div style={{marginLeft: '32%', marginTop: '30px'}}>
                <Button sx={styleButtonBiggerGreen} style={{fontSize: '30px'}} >Entrenamiento</Button><Button sx={styleButtonBiggerGreen} style={{fontSize: '30px', marginLeft: '200px'}} >Predicción</Button>
            </div>
        </div>
    );
};

export default VerAnalisis2;