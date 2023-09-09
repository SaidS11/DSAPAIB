/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import VerInicio from './VerInicio';
import { useCustomDispatch } from 'redux/hooks';
import { setPythonResponse } from 'redux/slices/ResponsesSlice';
import { setAcelerometroIsChecked, setCantidadSensores, setFrecuenciaIsChecked, setGsrIsChecked, setMongoInsertObject, setTemperaturaIsChecked, setTotalSensores } from 'redux/slices/SeñalesSlice';
import { adqWithTimeAndSignals } from '../Utilities/Constants';
import io from 'socket.io-client';

const socket = io("http://localhost:4000");
const socket2 = io("http://localhost:4000")



const InicioContainer = () =>{
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  const onClickPacientes = () => {
    // navigate('/buscarPaciente');
    appDispatch(setGsrIsChecked(true));
    appDispatch(setTemperaturaIsChecked(true));
    appDispatch(setFrecuenciaIsChecked(true));
    appDispatch(setAcelerometroIsChecked(true));
    appDispatch(setCantidadSensores(4));

    appDispatch(setPythonResponse('Tree|0.500|0.500|0.500|0.50|0.00|{"colMediaABSEMG1":{"0":107.98,"1":497.81,"2":146.58,"3":411.87,"4":122.65,"5":514.34,"6":113.73,"7":538.6},"colMedianaEMG1":{"0":106.0,"1":499.0,"2":147.0,"3":410.0,"4":120.5,"5":513.0,"6":113.5,"7":537.0},"colRMSEMG1":{"0":110.34,"1":498.09,"2":147.43,"3":412.14,"4":125.55,"5":514.95,"6":115.85,"7":538.74},"colMediaABSEMG2":{"0":109.49,"1":582.72,"2":104.8,"3":536.02,"4":135.59,"5":581.19,"6":157.56,"7":586.9},"colMedianaEMG2":{"0":108,"1":584,"2":100,"3":536,"4":134,"5":580,"6":157,"7":588},"colRMSEMG2":{"0":111.44,"1":583.45,"2":108.16,"3":536.37,"4":136.71,"5":581.33,"6":158.09,"7":587.07},"colMediaABSEMG3":{"0":183.13,"1":651.27,"2":209.6,"3":855.18,"4":139.07,"5":623.42,"6":144.64,"7":488.48},"colMedianaEMG3":{"0":184.0,"1":652.0,"2":210.5,"3":855.0,"4":141.0,"5":626.0,"6":144.0,"7":488.0},"colRMSEMG3":{"0":184.82,"1":651.45,"2":210.1,"3":855.38,"4":139.94,"5":623.56,"6":145.28,"7":488.75},"colMediaABSEMG4":{"0":127.56,"1":560.81,"2":216.34,"3":637.0,"4":89.32,"5":440.69,"6":222.78,"7":530.5},"colMedianaEMG4":{"0":126.5,"1":560.0,"2":216.0,"3":637.0,"4":91.0,"5":441.0,"6":221.5,"7":529.5},"colRMSEMG4":{"0":127.98,"1":561.1,"2":217.08,"3":637.24,"4":90.02,"5":440.95,"6":223.35,"7":530.69},"colMediaABSGsr":{"0":10.0,"1":15.0,"2":10.0,"3":12.5,"4":10.0,"5":15.0,"6":10.0,"7":15.0},"colMedianaGsr":{"0":10.0,"1":15.0,"2":10.0,"3":12.5,"4":10.0,"5":15.0,"6":10.0,"7":15.0},"colRMSGsr":{"0":10.03,"1":15.02,"2":10.03,"3":12.51,"4":10.03,"5":15.02,"6":10.03,"7":15.02},"colMediaABSAcelerometroX":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colMedianaAcelerometroX":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colRMSAcelerometroX":{"0":40.12,"1":63.08,"2":40.12,"3":51.62,"4":40.12,"5":63.08,"6":40.12,"7":63.08},"colMediaABSAcelerometroY":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colMedianaAcelerometroY":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colRMSAcelerometroY":{"0":40.12,"1":63.08,"2":40.12,"3":51.62,"4":40.12,"5":63.08,"6":40.12,"7":63.08},"colMediaABSAcelerometroZ":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colMedianaAcelerometroZ":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colRMSAcelerometroZ":{"0":40.12,"1":63.08,"2":40.12,"3":51.62,"4":40.12,"5":63.08,"6":40.12,"7":63.08},"colMediaABSFrecuencia":{"0":92,"1":142,"2":92,"3":117,"4":92,"5":142,"6":92,"7":142},"colMedianaFrecuencia":{"0":92,"1":142,"2":92,"3":117,"4":92,"5":142,"6":92,"7":142},"colRMSFrecuencia":{"0":92.28,"1":142.18,"2":92.28,"3":117.22,"4":92.28,"5":142.18,"6":92.28,"7":142.18},"colMediaABSTemperatura":{"0":92,"1":142,"2":92,"3":117,"4":92,"5":142,"6":92,"7":142},"colMedianaTemperatura":{"0":92,"1":142,"2":92,"3":117,"4":92,"5":142,"6":92,"7":142},"colRMSTemperatura":{"0":92.28,"1":142.18,"2":92.28,"3":117.22,"4":92.28,"5":142.18,"6":92.28,"7":142.18},"etiqueta":{"0":"Diabetico","1":"Diabetico","2":"Diabetico","3":"Diabetico","4":"Diabetico","5":"Diabetico","6":"Diabetico","7":"Sano"},"nombre":{"0":"Martha Garcia Lopez","1":"Martha Garcia Lopez","2":"Isaac Rayas Chacon","3":"Isaac Rayas Chacon","4":"Probando pr pr","5":"Probando pr pr","6":"Sujeto Prueba 1","7":"Sujeto Prueba 1"}}|true'));
    navigate('/resultadoEntrenar');
  };
  const onClickProtocolo = () => {
    // appDispatch(setGsrIsChecked(true));
    // appDispatch(setTemperaturaIsChecked(true));
    // appDispatch(setFrecuenciaIsChecked(true));
    // appDispatch(setAcelerometroIsChecked(true));
    // appDispatch(setCantidadSensores(4));
    // appDispatch(setTotalSensores(10));

    // appDispatch(setMongoInsertObject(adqWithTimeAndSignals));
    
    // navigate('/resultados');

    navigate('/verProtocolo');
    
    // socket.emit('end');
    // socket.on('last', (message: any)=>{
    //   console.log('last')
    //   console.log(message)
    // })

    // socket2.emit('end2');
    // socket2.on('last2', (message)=>{
    //   console.log('last2')
    //   console.log(message)
    // })

  };
  const onClickAnalisis = () => {
    navigate('/prediccion');

    // socket.emit('message', 'socket1')
    // socket.on('message', (message: any)=>{
    //     console.log(message)
    //     socket.emit('message', 'socket1')
    // })

    

    // socket2.emit('message2', 'socket2')
    // // When the server pongs we receive the message and get in a kind of
    // // 'while' that keep sending and receiving information
    // socket2.on('message2', (message)=>{
    //     console.log(message)
    //     socket2.emit('message2', 'socket2')
    // })

    
  };
  console.log("TIME", `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);

  return (
    <div>
      <VerInicio onClickPacientes={onClickPacientes} onClickProtocolo={onClickProtocolo} onClickAnalisis={onClickAnalisis} />
    </div>
  );
};

export default InicioContainer;