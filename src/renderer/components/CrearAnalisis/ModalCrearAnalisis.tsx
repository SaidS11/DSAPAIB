/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#d90429',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  color: 'white',
};
export interface ModalProps {
  toggleModal: () => void;
  open: boolean;
}
export default function ModalDatos(props: ModalProps) {
  const { toggleModal, open } = props;
  /*   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */

  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Añada por lo menos un modelo
          </Typography>
            <Button>Añadir Modelo</Button>
        </Box>
      </Modal>
    </div>
  );
}
