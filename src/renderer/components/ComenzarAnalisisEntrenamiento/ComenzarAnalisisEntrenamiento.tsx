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
import { useMemo, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Algoritmo } from '../Utilities/Constants';
import EnhancedTable from './EnhancedTable';
import { styleButtonBiggerGreen, styleButtonBigger } from '../VerPaciente/ButtonStyle';
import GeneralTable from './AlgorithmTable';

interface ComenzarAnalisisEntrenamientoProps {
  tableData: any;
  columnsData: any;
  data: any;
  dataAlgoritmo: any;
  options: TableOptions<{ col1: string, col2: string }>;
  onClickNav: (arg0: any) => void;
  onClickStop: () => void;
  toggleModal: any;
  modelo: string;
  setModelo: any;
  setProtocolo: any;
  protocolo: string; 
  setFiltroSexo: any;
  filtroSexo: any;
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

  return (
    <div>
      <div className="display-center">
        <h1>Entrenamiento</h1>
      </div>
      <div className='display-center'>
        <form className="analisis-form" onSubmit={onClickNav} style={{ width: "70%" }}>
        <br />
          <section className="display-center" style={{ marginRight: "5%", marginLeft: "5%" }}>
            <h4>
              Seleccione el protocolo del que desea obtener los registros. A continuación personalice los parametros del modelo a entrenar.
            </h4>
          </section>
          {/* <section className="display-flexAgregar">
            <h3>Nombre: </h3>
            <input className="first-input" type="text"  name="nombre" required />
          </section>
          <section className="display-flexAgregar">
            <h3>Descripción: </h3>
            <textarea className="second-input" name="descripcion" required/>
          </section> */}
          <section className="display-flexAgregar">
            <h3>Protocolo Adquisición: </h3>
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
          {/* <section className="display-flexAgregar">
            <h3>Algoritmo: </h3>
            <section className="list-box-sexo">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Algoritmo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="algoritmo"
                  value={modelo}
                  label="Algoritmo"
                  onChange={handleChange}
                  required
                >
                  {numOfAlgos()}
                </Select>
              </FormControl>
            </section>
          
          </section> */}
          {modelo !== '' &&
          <section className="display-flexAgregar" style={{display: "block"}}>
            <h3>Datos del algoritmo: </h3>
            <br />
            {retrieveAlgoData}
          </section>
          }
          <section className="display-flexAgregar">
            <h3>Numero de K(Folds): </h3>
            <input type="number" name="iteraciones" required min="1" max="500" />
          </section>
          <section className="display-flexAgregar">
            <h3>Porcentaje de Datos de Prueba: </h3>
            <input type="number" name="porcentaje" required min="10" max="90" />
          </section>
          <section className="display-flexAgregar">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Ventaneo</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={valueVentaneo}
              onChange={handleChangeVentaneo}
            >
              <FormControlLabel value="automatico" control={<Radio />} label="Automatico" disabled />
              <FormControlLabel value="manual" control={<Radio />} label="Manual" />
            </RadioGroup>
          </FormControl>
          </section>
          <br />
        
      <div className='display-center'>
          <h2>Parámetros de la selección:</h2>
      </div>
      <section className="display-flexAgregar">
          <h4>Sexo: </h4>
          <section className="list-box-sexo">
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
          </section>
          {/* <h4>Edad (años): </h4>
          <select>
            <option>Cualquiera</option>
            <option>10 a 15</option>
            <option>15 a 20</option>
            <option>20 a 25</option>
            <option>25 a 30</option>
            <option>30 a 35</option>
            <option>35 a 40</option>
            <option>40 a 45</option>
            <option>45 a 50</option>
            <option>Más de 50</option>
          </select> */}
        </section>
        <br />
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
      {/* <div className="display-center" style={{ marginTop: '10px' }}>
        <Button sx={styleButtonBigger} onClick={() => toggleModal('body')} style={ modelo === '' ? {backgroundColor: "grey", pointerEvents: "none" } : {}}>
          {modelo === '' ? 'Seleccione registros antes de ver detalles' : 'Información acerca de los datos'}
        </Button>
      </div> */}
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

export default ComenzarAnalisisEntrenamiento;
