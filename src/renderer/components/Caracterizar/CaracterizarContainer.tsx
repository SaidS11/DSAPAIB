import { useState, useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { setCantidadSensores, setGiroscopioIsChecked, setFrecuenciaIsChecked, setAcelerometroIsChecked, setExtraSensorsChecked } from '../../../redux/slices/SeñalesSlice';
import ModalSensoresCaracterizar from './ModalSensoresCaracterizar';
import Caracterizar from './Caracterizar';
import { FormularioEntrenamiento } from '../Utilities/Constants';

const CaracterizarContainer = () => {
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const onClickAdd = () => {};
  const [open, setOpen] = useState(false);
  const arr: any = [];
  
  const selectedPatients = useCustomSelector(
    (state) => state.config.selectedPatients
  );
  const currentIteration = useCustomSelector(
    (state) => state.status.signalsIteration
  );
  const formParams = useCustomSelector(
    (state) => state.config.analisisParams
  ) as FormularioEntrenamiento;

  const [sensoresSelected, setSensoresSelected] = useState(0);
  const [emgs, setEmgs] = useState(0);
  const [giroscopioChecked, setGiroscopioChecked] = useState(false);
  const [frecuenciaChecked, setFrecuenciaChecked] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [acelerometroChecked, setAcelerometroChecked] = useState(false);
  
  console.log('Params', formParams);
  const selectedProtocol = formParams.protocolo;
  const appDispatch = useCustomDispatch();
  const toggleModal = () => {
    if (sensoresSelected !== 0) {
      setOpen(!open);
    } else {
      alert('Seleccione una cantidad');
    }
  };
  // return <ProbarSensores onClickAdd={onClickAdd} dataX={dataX} dataY={dataY} />;
  console.log('Seleccionados', sensoresSelected);
  appDispatch(setCantidadSensores(sensoresSelected));

  async function loadConfig () {
    appDispatch(setIsLoading(true));

    const respConf = await window.electron.ipcRenderer.selectCN(selectedProtocol);
    console.log("respconf", respConf[0].configuracion);
    const resp = await window.electron.ipcRenderer.selectCD(respConf[0].configuracion);
    console.log("this is config", resp)
    const cantidadEmgs = resp[0].emgs;
    setSensoresSelected(cantidadEmgs)
    const giroscopio = resp[0].giroscopio;
    setGiroscopioChecked(resp[0].giroscopio);
    const frecuencia_cardiaca = resp[0].frecuencia_cardiaca;
    setFrecuenciaChecked(resp[0].frecuencia_cardiaca)
    const acelerometro = resp[0].acelerometro;
    setAcelerometroChecked(resp[0].acelerometro);
    console.log(`This is config EMGS: ${cantidadEmgs}, giroscopio ${giroscopio}, frecuencia_cardiaca ${frecuencia_cardiaca}, acelerometro ${acelerometro}`)
    appDispatch(setGiroscopioIsChecked(giroscopio));
    appDispatch(setAcelerometroIsChecked(acelerometro));
    appDispatch(setFrecuenciaIsChecked(frecuencia_cardiaca));
    appDispatch(setExtraSensorsChecked([giroscopio, acelerometro, frecuencia_cardiaca]))
    setConfigLoaded(true);
    appDispatch(setIsLoading(false));
    
    return resp;
  }
  useEffect(() => {
    loadConfig()
  }, []);

  if (configLoaded) {
    return (
      <div>
        
        <Caracterizar
          sensoresSelected={sensoresSelected}
          selectedPatients={selectedPatients}
          selectedProtocol={selectedProtocol}
          currentIteration={currentIteration}
          giroscopioChecked={giroscopioChecked}
          frecuenciaChecked={frecuenciaChecked}
          acelerometroChecked={acelerometroChecked}
          
        />
        
        {/* {open && (
          <ModalSensoresCaracterizar
            toggleModal={toggleModal}
            open={open}
            setSensoresSelected={setSensoresSelected}
          />
        )} */}
      </div>
    );
  }
  else {
    return(<div></div>);
  }
};

export default CaracterizarContainer;
