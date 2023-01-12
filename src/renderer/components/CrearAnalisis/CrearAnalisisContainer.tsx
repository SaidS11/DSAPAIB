import { useState } from 'react';
import CrearAnalisis from './CrearAnalisis';
import ModalCrearAnalisis from './ModalCrearAnalisis';

const CrearAnalisisContainer = () => {
  const [open, setOpen] = useState(true);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <CrearAnalisis />;
      {open && <ModalCrearAnalisis toggleModal={toggleModal} open={open} />}
    </div>
  );
};

export default CrearAnalisisContainer;
