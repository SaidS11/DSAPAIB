/* eslint-disable jsx-a11y/media-has-caption */
import { Button, CardActionArea } from '@mui/material';
import ReactPlayer from 'react-player';
import { styleButtonBiggerRed } from '../VerPaciente/ButtonStyle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import './Video.css';

export interface VideoProps {
  onClickNav: () => void;
  url: string;
  onClickCancel: () => void;
  isPlaying: boolean;
}

const Video = (props: VideoProps) => {
  const { onClickNav, url, onClickCancel, isPlaying } = props;
  const defaultTheme = createTheme();

  return (
    <div>
      <section className="display-center">
        <h1>Captura de Datos</h1>
      </section>
      <section className="display-center">
        <h3>La captura comenzara automaticamente</h3>
      </section>
      {/* <ThemeProvider theme={defaultTheme}>
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
      </ThemeProvider> */}
      <section className="display-center">
        {/* <Button
          sx={styleButtonBiggerGreen}
          onClick={() => console.log('mostrarvideo')}
        >
          Comenzar
        </Button> */}
        <ReactPlayer
          // controls
          url={url}
          width="auto"
          onEnded={() => onClickNav()}
          playing={isPlaying}
          // onPlay={() => }
          // onEnded={() => onClickNav()}
        />
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerRed} onClick={onClickCancel}>
          Cancelar
        </Button>
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

// <div className="countdown"></div>
export default Video;
