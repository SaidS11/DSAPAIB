/* eslint-disable jsx-a11y/media-has-caption */
import { Button, CardActionArea } from '@mui/material';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './VideoDemo.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


export interface VideoDemoProps {
  onClickNav: () => void;
  url: string;
  onClickBack: () => void;
  probando: boolean;
  bloqueoDeBoton: boolean;
}

const VideoDemo = (props: VideoDemoProps) => {
  const { onClickNav, url, onClickBack, probando, bloqueoDeBoton } = props;
  // const navigate = useNavigate();

  const defaultTheme = createTheme();

  
  return (
    <div>
      <section className="display-center">
        <h1>Demostración de Protocolo</h1>
      </section>
      <section className="display-center">
        <h3>Puede probar los sensores o continuar</h3>
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
                  <CardActionArea>
                    <CardMedia
                      component='video'
                      id="myVideo"
                      image={url}
                      controls
                    />
                  </CardActionArea>
                </ Card>
              </Grid>
            </Grid>
            </Box>
              
          </Box>
        </Container>
      </ThemeProvider>
      {/* <div className="display-center wrapper">
        <video id="myVideo" controls className='videoInsert'>
          <source id="video_src" src={url} type="video/mp4" />
          Lo siento
        </video>
      </div> */}
      <br></br>
      <section className="display-center">
        {!probando && (
          <>
            <Button sx={styleButtonBiggerGreen} onClick={onClickNav} disabled={bloqueoDeBoton}>
              Proceder a Adquisición
            </Button>
            <Button sx={styleButtonBiggerRed} onClick={onClickBack}  disabled={bloqueoDeBoton}>
              Regresar
            </Button>
          </>
        )}
      </section>
      {/* <section>
        <ProbarSensores
          sensoresSelected={sensores}
          onClickNav={undefined}
          onClickStop={undefined}
          dataXParam={undefined}
          dataYParam={undefined}
        />
      </section> */}
    </div>
  );
};

export default VideoDemo;
