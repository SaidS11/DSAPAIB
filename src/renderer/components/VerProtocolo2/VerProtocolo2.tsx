/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import './VerProtocolo2.css';
import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import { InputLabel, FormControl, MenuItem } from '@mui/material';
import { styleButtonBiggerGreen, styleAddIcon } from '../VerPaciente/ButtonStyle';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { CustomDisabledSelect, CustomDisabledTextField } from '../Utilities/Constants';

interface VerProtocolo2Props {
  options: TableOptions<{ col1: string }>;
  resp: any;
  onClickIrRegresar: () => void;
  largo: any;
}

const VerProtocolo2 = (
  props: VerProtocolo2Props
) => {
  const { options, resp, onClickIrRegresar, largo } = props;
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };
  const defaultTheme = createTheme();

  return (
    <div>
      <div className="display-center">
        <h1>Protocolo</h1>
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
                  {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AddIcon sx={styleAddIcon} style={{color: "white"}}/>
                  </Avatar> */}
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CustomDisabledTextField
                          disabled
                          fullWidth
                          value={resp[0].nombre}
                          label="Nombre"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomDisabledTextField
                          disabled
                          fullWidth
                          label="Descripción"
                          value={resp[0].descripcion === null ? "..." : resp[0].descripcion}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography component="h1" variant="h6" >
                        Configuración seleccionada:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Configuración</InputLabel>
                          <CustomDisabledSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="configuracion"
                            label="Configuración"
                            value={resp[0].configuracion}
                            required
                            disabled
                          >
                            <MenuItem key={resp[0].configuracion} value={`${resp[0].configuracion}`}>{resp[0].configuracion}</MenuItem>
                          </CustomDisabledSelect>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h1" variant="h5" >
                        Registros asociados al protocolo:
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                      <div
                        style={{
                          width: '100%',
                          overflow: 'auto',
                          maxHeight: '60vh',
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
                      <Grid item xs={12}>
                        <Typography component="h1" variant="h5" >
                        <h5>Total de registros: </h5>{' '}
                        <h5 style={{ fontWeight: '600', marginLeft: '5px' }}>{largo}</h5>
                        </Typography>
                      </Grid>
                    </Grid>
                    <br/>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
    </div>
  );
};

export default VerProtocolo2;
