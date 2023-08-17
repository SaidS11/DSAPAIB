import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Column } from 'react-table';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Algoritmo } from '../Utilities/Constants';
import GeneralTable from '../ComenzarAnalisisEntrenamiento/AlgorithmTable';
import {
  styleAddIcon,
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';
import EnhancedTable from './EnhancedTable';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

interface GuardarModeloProps {
  dataAlgoritmo: any;
  algoritmo: string;
  setAlgoritmo: any;
  setAlgoritmoTipo: any;
  modelosEncontrados: boolean;
  data: Cols[];
  columns: Array<Column<Cols>>;
  selectedProtocol: string;
  setData: any;
  onClickContinue: () => void;
  onClickBack: () => void;
  algoritmoTipo: string;
  // setFirstRender: Dispatch<SetStateAction<boolean>>;
}

const GuardarModelo = (props: GuardarModeloProps) => {
  const {
    dataAlgoritmo,
    algoritmo,
    setAlgoritmo,
    setAlgoritmoTipo,
    modelosEncontrados,
    data,
    columns,
    selectedProtocol,
    setData,
    onClickContinue,
    onClickBack,
    algoritmoTipo,
  } = props;
  const [nombre, setNombre] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const num = parseInt(event.target.value, 10);
    setAlgoritmo(event.target.value as string);
  };

  const handleChangeNombre = (event: { target: { value: string } }) => {
    setNombre(event.target.value as string);
  };

  const numOfAlgos = () => {
    const models = [];
    if (dataAlgoritmo.length >= 1) {
      for (let i = 0; i < dataAlgoritmo.length; i += 1) {
        // console.log('datos recibidios', data[i]);
        models.push(
          <MenuItem key={i} value={`${dataAlgoritmo[i].nombre}`}>
            {dataAlgoritmo[i].nombre}
          </MenuItem>
        );
      }
      return models;
    }
    return (
      <option key={1} value={1}>
        1
      </option>
    );
  };

  const retrieveAlgoData = useMemo(() => {
    if (algoritmo !== '') {
      const selected = dataAlgoritmo.find(
        (objeto: Algoritmo) => objeto.nombre === algoritmo
      );
      console.log('Retrieved', selected);
      const claves = Object.keys(selected);
      console.log('claves', claves);
      setAlgoritmoTipo(selected.algoritmo_ia);
      return <GeneralTable key={1} headers={claves} datos={selected} />;
    }
    return <div />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoritmo]);

  // const tableWrapper = useMemo(() => {
  //   return (
  //     <EnhancedTable
  //       columns={columns}
  //       data={data}
  //       selectedProtocol={selectedProtocol}
  //       setData={setData}
  //       algoritmo={algoritmo}
  //     />
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);
  const defaultTheme = createTheme();

  return (
    <div>
      <section className="display-center">
        <h2>Es momento de escoger el algoritmo a utilizar y el modelo. </h2>
      </section>
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
              <DeveloperBoardIcon sx={styleAddIcon} style={{color: "white"}}/>
            </Avatar>
            <Typography component="h1" variant="h5" >
            Si ya existen modelos podra seleccionar uno, de lo contrario podra
            asignar un nombre nuevo
            </Typography>
            <Typography component="h1" variant="h5" >
            Al final, puede cambiar el modelo y reiniciar el proceso.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Seleccione el algoritmo:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Algoritmo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="algoritmo"
                      value={algoritmo}
                      label="Algoritmo"
                      onChange={handleChange}
                      required
                    >
                      {numOfAlgos()}
                    </Select>
                  </FormControl>
                </Grid>
                {algoritmo !== '' && (
                  <><Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                      Datos del algoritmo:
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      {retrieveAlgoData}
                  </Grid></>
                )}
                {modelosEncontrados === false && algoritmo !== '' && (
                  <>
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                    No existen modelos asociados a este algoritmo:
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                    Asigne un nombre al nuevo modelo.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="outlined-basic"
                      label="Nombre"
                      variant="outlined"
                      onChange={handleChangeNombre}
                    />
                  </Grid>
                  </>
              )}
              {modelosEncontrados === true && algoritmo !== '' && (
                <>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h6">
                  Modelos asociados al algoritmo.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h6">
                  Tome en cuenta que solo puede seleccionar 1 modelo.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                <EnhancedTable
                    columns={columns}
                    data={data}
                    selectedProtocol={selectedProtocol}
                    setData={setData}
                    algoritmo={algoritmo}
                    algoritmoTipo={algoritmoTipo}
                  />
                </Grid>
                </>
                
              )}               
              </Grid>
              <br/>
              <div className="display-center">
                <section className="display-center">
                  <Button
                    sx={styleButtonBiggerGreen}
                    style={{ marginTop: '10px', fontSize: '20px' }}
                    onClick={onClickContinue}
                  >
                    Continuar
                  </Button>
                  <Button
                    sx={styleButtonBiggerRed}
                    style={{ marginTop: '10px', fontSize: '20px' }}
                    onClick={onClickBack}
                  >
                    Regresar
                  </Button>
                </section>
                <br />
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      
      <br />
    </div>
  );
};

export default GuardarModelo;
