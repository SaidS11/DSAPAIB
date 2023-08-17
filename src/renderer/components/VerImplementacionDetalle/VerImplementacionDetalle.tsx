/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { styleButtonBiggerRed, styleAddIcon } from '../VerPaciente/ButtonStyle';
import BuildIcon from '@mui/icons-material/Build';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomDisabledTextField, CustomDisabledSelect } from '../Utilities/Constants';

interface VerModeloProps {
  resp: any;
  onClickBack: () => void;
}

const VerImplementacionDetalle = (props: VerModeloProps) => {
  const { resp, onClickBack } = props;
  const [tipo, setTipo] = useState(resp.algoritmo_ia);

  const defaultTheme = createTheme();

  return (
    <div>
      <div className="display-center">
        <h1>Implementación</h1>
      </div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <BuildIcon sx={styleAddIcon} style={{color: "white"}}/>
            </Avatar>
            <Typography component="h1" variant="h5" >
            Datos
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomDisabledTextField
                    fullWidth
                    label="Nombre"
                    value={resp.nombre}
                    autoFocus
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomDisabledTextField
                    fullWidth
                    label="Descripción"
                    value={resp.descripcion}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Algoritmo seleccionado:
                    </Typography>
                </Grid>
                <Grid item xs={12}  sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Algoritmo
                    </InputLabel>
                    <CustomDisabledSelect labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="algoritmo"
                        value={tipo}
                        label="Algoritmo"
                        required
                        disabled
                        >
                      <MenuItem value={tipo}>{tipo}</MenuItem>
                    </CustomDisabledSelect>
                  </FormControl>
                </Grid>
                {tipo === "Arbol de Decisión" &&
                <>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6">
                    Profundidad seleccionada:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDisabledTextField
                    fullWidth
                    label="Profundidad"
                    value={resp.parametros.profundidad}
                    disabled                      
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6">
                    Estado aleatorio seleccionado:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDisabledTextField
                    disabled                      
                    fullWidth
                    label="Estado"
                    value={resp.parametros.estado}
                    />
                  </Grid></>
                }
                {tipo === "K-Nearest Neighbor" &&
                <><Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Vecinos seleccionado:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      id="vecinos"
                      label="Vecinos"
                      disabled
                      value={resp.parametros.vecinos} />
                  </Grid></>
                }
                {tipo === "Maquina de Soporte Vectorial" &&
                <><Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Kernel seleccionado:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Kernel
                        </InputLabel>
                        <CustomDisabledSelect labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="kernel"
                          value={resp.parametros.kernel}
                          label="kernel"
                          disabled
                        >
                          <MenuItem value={resp.parametros.kernel}>{resp.parametros.kernel}</MenuItem>
                        </CustomDisabledSelect>
                      </FormControl>
                    </Grid></>
                }
              </Grid>
              <br/>
              <section className='display-center'>
                <Button sx={styleButtonBiggerRed} onClick={onClickBack}>Regresar</Button>
              </section>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <br />
    </div>
  );
};

export default VerImplementacionDetalle;
