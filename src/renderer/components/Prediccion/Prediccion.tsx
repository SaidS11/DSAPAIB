/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import './Prediccion.css';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';
import EnhancedTable from '../ComenzarAnalisisEntrenamiento/EnhancedTable';

interface PrediccionProps {
  options: TableOptions<{ col1: string, col2: string }>;
  tableData: any;
  columnsData: any;
  data: any;
  dataM: any;
  onClickNav: any
  onClickStop: any
  protocolo: string; 
  setProtocolo: any;
}

const Prediccion = (
  props: PrediccionProps
) => {
  const { options, tableData, columnsData, data, dataM, onClickNav, onClickStop, protocolo, setProtocolo } = props;

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
  
  const handleChangeProtocol = (event: SelectChangeEvent) => {
    setProtocolo(event.target.value as string);
  };

  const numOfAlgos = () => {
    const models = [];
    if (dataM.length >= 1) {
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < dataM.length; i++) {
        // console.log('datos recibidios', data[i]);
        models.push(
          <option  key={i} value={`${dataM[i].nombre}`}>{dataM[i].nombre}</option>
        )
      }
      return models;
    }
    return <option value={1}>1</option>;
  }
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };

  return (
    <div>
      <div className="display-center">
        <h1>Predicción</h1>
      </div>
      <div className='display-center'>
        <form className="analisis-form" onSubmit={onClickNav} style={{ width: "70%" }}>
          <br />
          <section className="display-center" style={{ marginRight: "5%", marginLeft: "5%" }}>
              <h4>
                Seleccione el protocolo del que desea obtener los registros.
              </h4>
          </section>
          {/* <section className="display-flex">
            <h3>Nombre: </h3>{' '}
            <input className="first-input" type="text"  name="nombrePrediccion" required />
          </section>
          <section className="display-flex">
            <h3>Descripción: </h3>{' '}
            <textarea className="second-input" name="descripcion" required/>
          </section> */}
          <section className="display-flexAgregar">
            <h3>Protocolo Adquisición: </h3>{' '}
            <section className="list-box-sexo">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Protocolo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="protocolo"
                  value={protocolo}
                  label="Protocolo"
                  onChange={handleChangeProtocol}
                  required
                >
                  {setProtocols()}
                </Select>
              </FormControl>
            </section>
          </section>
          <div
            style={{
              width: '90%',
              overflow: 'auto',
              maxHeight: '60vh',
              marginLeft: '80px',
            }}
          >
            <EnhancedTable
            columns={columnsData}
            data={tableData}
          />
          </div>
          <div className="display-center" style={{ marginTop: '10px' }}>
            <h5>Registros Recuperados: </h5>{' '}
            <h5 style={{ fontWeight: '600', marginLeft: '5px' }}>{tableData.length}</h5>
          </div>
          <div
            className="display-center"
            style={{ marginTop: '5px', marginBottom: '30px' }}
          >
            <Button sx={styleButtonBiggerGreen} style={{ marginTop: '10px', fontSize: '20px', width: "100px" }} variant="contained" component="label">Avanzar
              <input hidden type="submit" />
            </Button>
          </div>
      </form>
      </div>
    </div>
  );
};

export default Prediccion;
