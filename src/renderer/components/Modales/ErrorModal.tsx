/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { styleButtonBiggerRed } from '../VerPaciente/ButtonStyle';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#d0312d',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  color: 'white',
};
export interface ModalProps {
  open: boolean;
}
export default function ModalDatos(props: ModalProps) {
  const { open } = props;
  /*   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ha ocurrido un error en la carga
          </Typography>
            <Button sx={styleButtonBiggerRed}>Continuar</Button>
        </Box>
      </Modal>
    </div>
  );
}