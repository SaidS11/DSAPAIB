import { useState } from 'react';
import ModalSensores from './ModalSensores';

const ProbarSensoresBlank = () => {
  const [sensoresSelected, setSensoresSelected] = useState(0);
  const [baudSelected, setBaudSelected] = useState(9600);

  const [portSelected, setPortSelected] = useState('');

  const [open, setOpen] = useState(true);
  const toggleModal = () => {
    if (sensoresSelected !== 0 && portSelected !== '' && baudSelected !== 0) {
      setOpen(!open);
      window.Bridge.loadPort(portSelected, baudSelected);
      // window.Bridge.sensoresNewTest()
    } else {
      alert('Seleccione una cantidad');
    }
    console.log(
      'Amount and port, and baud',
      sensoresSelected,
      portSelected,
      baudSelected
    );
  };
  return (
    <div>
      {open && (
        <ModalSensores
          toggleModal={toggleModal}
          open={open}
          setSensoresSelected={setSensoresSelected}
          setPortSelected={setPortSelected}
          setBaudSelected={setBaudSelected}
        />
      )}
    </div>
  );
};

export default ProbarSensoresBlank;
