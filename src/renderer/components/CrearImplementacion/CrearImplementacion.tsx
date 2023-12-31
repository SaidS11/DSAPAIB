/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import Button from '@mui/material/Button';
import { useMemo, useState } from 'react';
import { styleButtonBiggerGreen, styleAddIcon } from '../VerPaciente/ButtonStyle';
import BuildIcon from '@mui/icons-material/Build';
import { InputLabel, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface CrearImplementacionProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
}

const CrearImplementacion = (
  props: CrearImplementacionProps
) => {
  const { onClickNav } = props;
  const numofModels = () => {
    const models = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 3; i++) {
      models.push(<option value={`Modelo${i}`}>{`Modelo ${i}`}</option>);
    }
    return models;
  };
  const [tipo, setTipo] = useState("");
  const [kernel, setKernel] = useState("");
  const [funcion, setFuncion] = useState("");
  const [capas, setCapas] = useState(0);



  const handleChange = (event: SelectChangeEvent) => {
    const word = event.target.value;
    setTipo(word);
    console.log(word);
  };

  const handleChangeKernel = (event: SelectChangeEvent) => {
    const word = event.target.value;
    setKernel(word);
  };

  const handleChangeFuncion = (event: SelectChangeEvent) => {
    const word = event.target.value;
    setFuncion(word);
  };


  const handleChangeCapas = (event: any) => {
    const word = event.target.value;
    console.log("Capas", word)
    setCapas(parseInt(word));
  };
  
  const neuronasComponente = useMemo(() => {
    const listaDeInputs = [];
    for(let i = 0; i< capas; i+=1) {
      listaDeInputs.push(
        <>
        <Grid item xs={12} sm={6}>
          <Typography component="h1" variant="h6" key={i} >
            Capa N. {i + 1}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id={`neurona ${i}`}
              label={`Neuronas en la capa N. ${i+1}`}
              name={`neurona ${i}`}
              type="number"
              inputProps={{ min: 1, max: 10 }}
              key={i}
              />
          </Grid>
      </>
      )
    }
    return listaDeInputs;
    
  }, [capas])

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
            Llene los datos de la Implementación
            </Typography>
            <Box component="form" onSubmit={onClickNav} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="nombreModelo"
                    name="nombreModelo"
                    label="Nombre"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="descripcion"
                    label="Descripción"
                    name="descripcion"

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Seleccione el Algoritmo:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Algoritmo
                    </InputLabel>
                    <Select labelId="demo-simple-select-label"
                        id="demo-simple-select" onChange={handleChange}
                        name="algoritmo"
                        value={tipo}
                        label="Algoritmo"
                        required
                        >
                      <MenuItem value="Arbol de Decisión">Arbol de Decisión</MenuItem>
                      <MenuItem value="K-Nearest Neighbor">K-Nearest Neighbor</MenuItem>
                      <MenuItem value="Red Neuronal">Red Neuronal</MenuItem>
                      <MenuItem value="Maquina de Soporte Vectorial">Maquina de Soporte Vectorial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {tipo === "Arbol de Decisión" &&
                <>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Seleccione la profundidad:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="profundidad"
                      label="Profundidad"
                      name="profundidad" 
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6" >
                    Seleccione el estado Aleatorio:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="estado"
                        label="Estado"
                        name="estado" 
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        
                        />
                  </Grid></>
                }
                {tipo === "K-Nearest Neighbor" &&
                <><Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Seleccione el número de vecinos:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="vecinos"
                        label="Vecinos"
                        name="vecinos"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    </Grid></>
                }
                {tipo === "Maquina de Soporte Vectorial" &&
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Seleccione el Kernel:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Kernel
                        </InputLabel>
                        <Select labelId="demo-simple-select-label"
                          id="demo-simple-select" onChange={handleChangeKernel}
                          name="kernel"
                          value={kernel}
                          label="kernel"
                          required
                        >
                          <MenuItem value="linear">Linear</MenuItem>
                          <MenuItem value="poly">Poly</MenuItem>
                          <MenuItem value="rbf">Rbf</MenuItem>
                          <MenuItem value="sigmoid">Sigmoid</MenuItem>
                          <MenuItem value="precomputed">Precomputed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid></>
                }

                {tipo === "Red Neuronal" &&
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Número de capas
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="capas"
                        label="Capas"
                        name="capas"
                        type="number"
                        inputProps={{ min: 1, max: 10 }}
                        onChange={handleChangeCapas}
                        />
                  </Grid>
                  {neuronasComponente}
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Seleccione la función de activación:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Función
                      </InputLabel>
                      <Select labelId="demo-simple-select-label"
                        id="demo-simple-select" onChange={handleChangeFuncion}
                        name="funcion"
                        value={funcion}
                        label="funcion"
                        required
                      >
                        <MenuItem value="linear">Logistic</MenuItem>
                        <MenuItem value="poly">Tanh</MenuItem>
                        <MenuItem value="rbf">Identity</MenuItem>
                        <MenuItem value="sigmoid">relu</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Tasa de aprendizaje inicial
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="tasa"
                        label="Tasa"
                        name="tasa"
                        type="number"
                        inputProps={{ min: 0.1, max: 1, step: 0.01 }}
                        />
                  </Grid>
                    
                    
                    </>
                }
              </Grid>
              <br/>
              <section className='display-center'>
                <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained"
            component="label">Crear <input hidden type="submit" /></Button>
              </section>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <br />
    </div>
  );
};

export default CrearImplementacion;
