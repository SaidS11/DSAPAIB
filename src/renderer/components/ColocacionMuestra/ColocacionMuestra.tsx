import { Button, CardContent, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './ColocacionMuestra.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


export interface ColocacionProps {
  onClickNav: () => void;
  onClickBack: () => void;
  url: string;
}

const ColocacionMuestra = (props: ColocacionProps) => {
  const { onClickNav, onClickBack, url } = props;
  // const navigate = useNavigate();
  const [protocolo, setProtocolo] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const num = parseInt(event.target.value, 10);
    setProtocolo(event.target.value as string);
  };
  const defaultTheme = createTheme();
  console.log("URL", url);
  // Agregar carga de imagen setload
  return (
    <div>
      <section className="display-center">
        <h1>Demostración de colocación de Instrumentos</h1>
      </section>
      <section className="display-center">
        <h3>
          Siga las instrucciones y conecte el dispositivo de adquisición al
          equipo
        </h3>
      </section>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card >
                    <CardMedia
                      component="img"
                      image={url}
                      // image="http://localhost:8000/grafica1.png"
                      alt="Imagen Protocolo"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Imagen de muestra
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        No olvide conectar los dispositivos a utilizar para la captura
                      </Typography>
                    </CardContent>
                </ Card>
              </Grid>
            </Grid>
            </Box>
              
          </Box>
        </Container>
      </ThemeProvider>
      {/* <div
        className="display-center wrapper"
      >
        <img
          src={url}
          alt="Imagen Protocolo"
          className="img-style"
          // className="display-center image-wrapper"


        />
      </div> */}
      <section className="display-center space-divEscogerColocacionM">
        <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
          Confirmar
        </Button>
        <Button sx={styleButtonBiggerRed} onClick={onClickBack}>
          Regresar
        </Button>
      </section>
    </div>
  );
};

export default ColocacionMuestra;
