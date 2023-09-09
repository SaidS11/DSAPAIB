/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import './ComenzarAnalisisEntrenamiento.css';
import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Algoritmo } from '../Utilities/Constants';
import EnhancedTable from './EnhancedTable';
import { styleButtonBiggerGreen, styleButtonBigger,styleAddIcon } from '../VerPaciente/ButtonStyle';
import GeneralTable from './AlgorithmTable';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

interface ComenzarAnalisisEntrenamientoProps {
  tableData: any;
  columnsData: any;
  data: any;
  dataAlgoritmo: any;
  options: TableOptions<{ col1: string, col2: string }>;
  onClickNav: (arg0: FormEvent<HTMLFormElement>) => void;
  onClickStop: () => void;
  toggleModal: any;
  modelo: string;
  setModelo: Dispatch<SetStateAction<string>>;
  setProtocolo: Dispatch<SetStateAction<string>>;
  protocolo: string; 
  setFiltroSexo: Dispatch<SetStateAction<string>>;
  filtroSexo: string;
  // setSelectedPatientsLocal: any;
}

const ComenzarAnalisisEntrenamiento = (
  props: ComenzarAnalisisEntrenamientoProps
) => {
  const { 
    tableData, 
    columnsData, 
    data, 
    dataAlgoritmo, 
    options, 
    onClickNav, 
    onClickStop, 
    toggleModal, 
    modelo, 
    setModelo, 
    setProtocolo, 
    protocolo,
    setFiltroSexo,
    filtroSexo,
    // setSelectedPatientsLocal,
   } = props;
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  // const [modelo, setModelo] = useState('');

  const [valueVentaneo, setValueVentaneo] = useState('manual');

  const handleChangeVentaneo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueVentaneo((event.target as HTMLInputElement).value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const num = parseInt(event.target.value, 10);
    setModelo(event.target.value as string);
  };

  const handleChangeProtocol = (event: SelectChangeEvent) => {
    setProtocolo(event.target.value as string);
  };
  const handleChangeFiltroSexo = (event: SelectChangeEvent) => {
    setFiltroSexo(event.target.value as string);
  };
  const sortedColumn = (column: HeaderGroup<{ col1: string, col2: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };
  
  const setProtocols = () => {
    const plots = [];
    if (data.length > 0) {
      for(let i = 0; i < data.length; i+=1) {
        console.log('datos recibidos', data[i]);
        plots.push(
          <MenuItem key={i} value={`${data[i].nombre}`}>{data[i].nombre}</MenuItem>
        )
      }
      return plots;
    }
    return <option key={1} value={1} />;
  }

  const retrieveAlgoData = useMemo(() => {
    if (modelo !== '') {
      const selected = dataAlgoritmo.find((objeto: Algoritmo) => objeto.nombre === modelo);
      console.log("Retrieved", selected);
      const claves = Object.keys(selected);
      console.log("claves", claves);
      return <GeneralTable headers={claves} datos={selected}/>
    } 
      return <div />
    

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelo]);
  const defaultTheme = createTheme();

  return (
    <div>
      <div className="display-center">
        <h1>Entrenamiento</h1>
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
              <PrecisionManufacturingIcon sx={styleAddIcon} style={{color: "white"}}/>
            </Avatar>
            <Typography component="h1" variant="h5" >
            Seleccione el protocolo del que desea obtener los registros. A continuación personalice los parametros del modelo a entrenar.
            </Typography>
            <Box component="form" onSubmit={onClickNav} sx={{ mt: 3 }}>
              <Grid container spacing={2}>                
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Protocolo de Adquisición:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Protocolo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="protocolo"
                    value={protocolo}
                    label="protocolo"
                    onChange={handleChangeProtocol}
                    required
                  >
                    {setProtocols()}
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Numero de K(Folds):
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="iteraciones"
                    label="Iteraciones"
                    name="iteraciones"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Porcentaje de Datos de Prueba:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="porcentaje"
                    label="Porcentaje"
                    name="porcentaje"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Ventaneo</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="ventaneo"
                      value={valueVentaneo}
                      onChange={handleChangeVentaneo}
                    >
                      <FormControlLabel value="automatico" control={<Radio />} label="Automatico" disabled />
                      <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h6" >
                  Parametros de Selección
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Sexo:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="sexo"
                      value={filtroSexo}
                      label="Sexo"
                      onChange={handleChangeFiltroSexo}
                    >
                      <MenuItem key='Cualquiera' value='Cualquiera'>Cualquiera</MenuItem>
                      <MenuItem key='Hombre' value='Hombre'>Hombre</MenuItem>
                      <MenuItem key='Mujer' value='Mujer'>Mujer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <br/>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>

                    <EnhancedTable
                    columns={columnsData}
                    data={tableData}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                    Registros Recuperados:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  
                    {tableData.length}
                  </Typography>
                </Grid>
              </Grid>
              <br/>
              <section className='display-center'>
              <Button sx={styleButtonBiggerGreen} style={{ marginTop: '10px', fontSize: '20px', width: "100px" }} variant="contained" component="label">Avanzar
                <input hidden type="submit" />
              </Button>
              </section>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <br/>
    </div>
  );
};

export default ComenzarAnalisisEntrenamiento;
