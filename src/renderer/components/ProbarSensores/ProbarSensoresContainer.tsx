import { useState } from 'react';
import ModalSensores from './ModalSensores';
import ProbarSensores from './ProbarSensores';

const ProbarSensoresContainer = () => {
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const onClickAdd = () => {};
  const [open, setOpen] = useState(true);
  const [sensoresSelected, setSensoresSelected] = useState(0);
  const toggleModal = () => {
    if (sensoresSelected !== 0) {
      setOpen(!open);
    } else {
      alert('Seleccione una cantidad');
    }
  };
  // return <ProbarSensores onClickAdd={onClickAdd} dataX={dataX} dataY={dataY} />;
  console.log('Seleccionados', sensoresSelected);
  return (
    <div>
      <ProbarSensores sensoresSelected={sensoresSelected} />;
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

export default ProbarSensoresContainer;
