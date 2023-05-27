import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import {
  styleButtonBigger,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  color: 'black',
};
export interface ModalProps {
  toggleModalGuardar: () => void;
  open: boolean;
}

export default function SaveModelModal(props: ModalProps) {
  const { toggleModalGuardar, open } = props;

  /*   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */
  const navigate = useNavigate();

  const navigateToModels = () => {
    navigate('/guardarModelo');
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModalGuardar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} noValidate autoComplete="off" component="form">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Esta seguro que quiere continuar sin guardar?
          </Typography>
          <Button sx={styleButtonBiggerRed} onClick={toggleModalGuardar}>
            Cancelar
          </Button>
          <Button sx={styleButtonBigger} onClick={navigateToModels}>
            Confirmar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}