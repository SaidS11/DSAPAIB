/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import './VerImplementacion.css';
import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';

interface VerImplementacionProps {
  options: TableOptions<{ col1: string }>;
}

const VerImplementacion = (props: VerImplementacionProps) => {
  const { options } = props;
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };
  const numofModels = () => {
    const models = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 3; i++) {
      models.push(<option value={`Modelo${i}`}>{`Modelo ${i}`}</option>);
    }
    return models;
  };
  const [tipo,setTipo] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    const word = event.target.value;
    setTipo(word);
    console.log(word);
  };

  return (
    <div>
      <div className="display-center">
        <h1>Implementación</h1>
      </div>
      <div className="display-center">
        <form className="analisis-form" action="" style={{ width: '70%' }}>
          <section className="display-flex">
            <h3>Nombre: </h3>{' '}
            <input
              className="first-input"
              type="text"
              name="nombrePrediccion"
              required
            />
          </section>
          <section className="display-flex">
            <h3>Descripción: </h3>{' '}
            <textarea className="second-input" name="descripcion" required />
          </section>
          <section className="display-flex">
            <h3>Modelo: </h3>{' '}
            <select className="fourth-input-modelo">{numofModels()}</select>
          </section>

          <section className="display-flex">
            <FormControl fullWidth style={{ marginRight: ' 30px' }}>
              <InputLabel id="demo-simple-select-label">
                Procesamiento
              </InputLabel>
              <Select onChange={handleChange}>
                <MenuItem value="arbolesDecision">Arboles de Decision</MenuItem>
                <MenuItem value="KNN">KNN</MenuItem>
                <MenuItem value="SVM">SVM</MenuItem>
              </Select>
            </FormControl>
          </section>
          {tipo === "arbolesDecision" && <><h1>Arbol</h1><section>
            <section className="display-flex">
              <h3>Profundidad: </h3>{' '}
              <input
                className="first-input"
                type="text"
                name="nombrePrediccion"
                required
                style={{ width: '40%' }} />
            </section>
            <section className="display-flex">
              <h3>Estado Aleatorio: </h3>{' '}
              <input
                className="first-input"
                type="text"
                name="nombrePrediccion"
                required
                style={{ width: '40%' }} />
            </section>
            <br />
          </section></>}
          
          {tipo === "KNN" && <><h1>KNN</h1><section className="display-flex">
            <h3>Vecinos: </h3>{' '}
            <input
              className="first-input"
              type="text"
              name="nombrePrediccion"
              required
              style={{ width: '30%' }} />
          </section></>}

            {tipo === "SVM" && <section>
              <h1>SVM</h1>
              <section className="display-flex">
                <h3>Kernel: </h3>{' '}
                <input
                  className="first-input"
                  type="text"
                  name="nombrePrediccion"
                  required
                  style={{ width: '30%' }} />
              </section>
              <br />
            </section>}

            <br />
          <div
            className="display-center"
            style={{ marginTop: '5px', marginBottom: '30px' }}
          >
              <Button sx={styleButtonBiggerGreen} style={{ fontSize: '30px' }}>
                Agregar
              </Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default VerImplementacion;
