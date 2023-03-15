import { useState } from 'react';
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { setCantidadSensores } from '../../../redux/slices/SeñalesSlice';
import ModalSensores from './ModalSensoresCaracterizar';
import Caracterizar from './Caracterizar';

const CaracterizarContainer = () => {
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const onClickAdd = () => {};
  const [open, setOpen] = useState(false);
  const arr: any = [];
  const [sensoresSelected, setSensoresSelected] = useState(2);
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
      <Caracterizar sensoresSelected={sensoresSelected} />;
      {open && (
        <ModalSensores
          toggleModal={toggleModal}
          open={open}
          setSensoresSelected={setSensoresSelected}
        />
      )}
    </div>
  );
};

export default CaracterizarContainer;
