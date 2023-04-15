import { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { setCantidadSensores } from '../../../redux/slices/SeñalesSlice';
import ModalSensoresCaracterizar from './ModalSensoresCaracterizar';
import Caracterizar from './Caracterizar';
import { FormularioEntrenamiento } from '../Utilities/Constants';

const CaracterizarContainer = () => {
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const onClickAdd = () => {};
  const [open, setOpen] = useState(false);
  const arr: any = [];
  const [sensoresSelected, setSensoresSelected] = useState(2);
  const selectedPatients = useCustomSelector(
    (state) => state.config.selectedPatients
  );
  const currentIteration = useCustomSelector(
    (state) => state.status.signalsIteration
  );
  const formParams = useCustomSelector(
    (state) => state.config.analisisParams
  ) as FormularioEntrenamiento;

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
  return (
    <div>
      <Caracterizar
        sensoresSelected={sensoresSelected}
        selectedPatients={selectedPatients}
        selectedProtocol={selectedProtocol}
        currentIteration={currentIteration}
      />
      ;
      {open && (
        <ModalSensoresCaracterizar
          toggleModal={toggleModal}
          open={open}
          setSensoresSelected={setSensoresSelected}
        />
      )}
    </div>
  );
};

export default CaracterizarContainer;
