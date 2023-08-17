/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import './VerPaciente.css';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
// import TableStylesList from "./TableStylesList";

import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled  } from '@mui/material/styles';
import Button from '@mui/material/Button';
import styleButton, {styleAddIcon} from './ButtonStyle';
import Typography from '@mui/material/Typography';
import './VerPaciente.css';
import { CustomDisabledTextField } from '../Utilities/Constants';

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}
interface VerPacienteProps {
  options: TableOptions<{ col1: string }>;
  datosArray: Cols[];
  onClickCaptura: () => void;
  onClickIrInicio: () => void;
}

const VerPaciente = (props: VerPacienteProps) => {
  const { options, datosArray, onClickCaptura, onClickIrInicio } = props;
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };

  const disabledStyle = (theme: any) => ({
    backgroundColor: "dimgrey",
    "& .MuiInputBase-input.Mui-disabled": {
      color: "white",
    },
    "& input.Mui-disabled": {
      color: "green"
    },
    input: {
      "& input.Mui-disabled": {
        color: "green"
      }
    }
    // opacity: "1",
  })


  

  const defaultTheme = createTheme();
  console.log("THIS IS DATA", datosArray);
  return (
    <div>
      <div style={{}}>
        <section className="display-center">
          <h1>Paciente</h1>
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
                <PersonIcon sx={styleAddIcon} style={{color: "white"}}/>
              </Avatar>
              <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h4>
                      Nombres:
                    </h4>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      disabled
                      // InputProps={{
                      //   readOnly: true,
                      //   disableUnderline: true
                      // }}
                      label={datosArray[0].col1}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      disabled

                      label={datosArray[0].col2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      disabled

                      label={datosArray[0].col3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6" >
                    Sexo:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                        fullWidth
                        disabled

                        label='Masculino'
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6" >
                    Contacto:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      disabled

                      label={datosArray[0].col5}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6" >
                    Fecha de Nacimiento:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField                  
                      fullWidth
                      disabled
                      label={datosArray[0].col4}
                      />

                  </Grid>
                  <Grid item xs={12}>
                    <h4>
                      Registros:
                    </h4>
                  </Grid>

                  <Grid item xs={12}>
                    <div
                      style={{
                        width: '100%',
                        overflow: 'auto',
                        maxHeight: '20vh',
                      }}
                    >
                      <table {...getTableProps()} className="tableCustom" style={{border: "1px solid rgba(224, 224, 224, 1)"}}>
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(column.getSortByToggleProps())}
                                  className="tableHeader"
                                >
                                  {column.render('Header')}
                                  <span>{column.isSorted ? sortedColumn(column) : ''}</span>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {rows.map((row) => {
                            prepareRow(row);
                            return (
                              <tr
                                {...row.getRowProps()}
                                className={
                                  row.index % 2 === 0 ? 'tableElementOdd' : 'tableElementEven'
                                }
                              >
                                {row.cells.map((cell) => (
                                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Grid>
                </Grid>
                <br/>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        {/* <section className="display-flex">
          <h5>Nombres(s):</h5>
          <h5 className="second-item">{datosArray[0].col1}</h5>
        </section>
        <section className="display-flex">
          <h5>Apellido Paterno:</h5>
          <h5 className="second-item">{datosArray[0].col2}</h5>
        </section>
        <section className="display-flex">
          <h5>Apellido Materno:</h5>
          <h5 className="second-item">{datosArray[0].col3}</h5>
        </section>
        <section className="display-flex">
          <h5>Sexo:</h5>
          <h5 className="second-item">Masculino</h5>
        </section>
        <section className="display-flex">
          <h5>Fecha de Nacimiento:</h5>
          <h5 className="second-item">{datosArray[0].col4}</h5>
        </section>
        <section className="display-flex">
          <h5>Peso:</h5>
          <h5 className="second-item">40 kg</h5>
          <h5 style={{ paddingLeft: '10px' }}>Estatura:</h5>
          <h5 className="second-item">1.50 metros</h5>
        </section> */}
        {/* <section className="display-flex">
          <h5>Estado del paciente: </h5>
          <input
            type="text"
            name="nombre"
            required
            style={{ marginLeft: '10px' }}
          />
          <Button sx={styleButton} style={{ marginLeft: '20px' }}>
            Actualizar Estado
          </Button>
        </section> */}
      </div>
      <br />
      
      <br />
      <section className="display-center">
        <Button sx={styleButton} onClick={onClickIrInicio}>
          Ir a Inicio
        </Button>
        <Button sx={styleButton} onClick={onClickCaptura}>
          Captura
        </Button>
        {/* <Button sx={styleButton}>Analisis</Button> */}
      </section>
      <br />
    </div>
  );
};

export default VerPaciente;
