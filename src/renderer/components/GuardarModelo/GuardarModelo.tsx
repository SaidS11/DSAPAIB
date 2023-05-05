import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Column } from 'react-table';
import { useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Algoritmo } from '../Utilities/Constants';
import GeneralTable from '../ComenzarAnalisisEntrenamiento/AlgorithmTable';
import {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';
import EnhancedTable from './EnhancedTable';

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

  const tableWrapper = useMemo(() => {
    return (
      <EnhancedTable
        columns={columns}
        data={data}
        selectedProtocol={selectedProtocol}
        setData={setData}
        algoritmo={algoritmo}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <section className="display-center">
        <h2>Es momento de escoger el algoritmo a utilizar y el modelo </h2>
      </section>
      <section className="display-center">
        <h2>
          Si ya existen modelos podra seleccionar uno, de lo contrario podra
          asignar un nombre nuevo
        </h2>
      </section>
      <section className="display-center">
        <h3>Al final, puede cambiar el modelo y reiniciar el proceso.</h3>
      </section>
      <section className="display-flexAgregar">
        <h3>Algoritmo: </h3>
        <section className="list-box-sexo">
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
        </section>
      </section>
      {algoritmo !== '' && (
        <section className="display-flexAgregar" style={{ display: 'block' }}>
          <h3>Datos del algoritmo: </h3>
          <br />
          {retrieveAlgoData}
        </section>
      )}

      {modelosEncontrados === false && algoritmo !== '' && (
        <section className="display-flexAgregar" style={{ display: 'block' }}>
          <h3>No existen modelos asociados a este algoritmo </h3>
          <h3>Asigne un nombre al nuevo modelo</h3>
          <TextField
            required
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            onChange={handleChangeNombre}
          />
          <br />
        </section>
      )}
      {modelosEncontrados === true && algoritmo !== '' && (
        <section className="display-flexAgregar" style={{ display: 'block' }}>
          <h3>Modelos asociados al algoritmo. </h3>
          {/* {tableWrapper} */}
          <EnhancedTable
            columns={columns}
            data={data}
            selectedProtocol={selectedProtocol}
            setData={setData}
            algoritmo={algoritmo}
          />
        </section>
      )}
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
    </div>
  );
};

export default GuardarModelo;
