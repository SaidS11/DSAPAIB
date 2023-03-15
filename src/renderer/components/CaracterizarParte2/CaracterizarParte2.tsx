/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import { pink } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import React from 'react';
import styleButton, {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './CaracterizarParte2.css';

export interface CaracterizarParte2Props {
  options: any;
}

const CaracterizarParte2 = (props: CaracterizarParte2Props) => {
  const { options } = props;
  // const navigate = useNavigate();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  const sortedColumn = (column: any) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    console.log('Checked', event.target.value);
  };

  return (
    <div>
      <section className="display-center">
        <h1>Caracterizar Parte 2</h1>
      </section>
      <section className="display-center">
        <h3>Resultados de la selección de ventanas</h3>
      </section>
      <div
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '60vh',
        }}
      >
        <table {...getTableProps()} className="tableCustom">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="tableHeader"
                    style={{ textAlign: 'center' }}
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
                  style={{ textAlign: 'center', width: '300px' }}
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
      <section className="display-center" style={{ marginTop: '5%' }}>
        Datos obtenidos tras calcular con las ventanas seleccionadas por cada
        sensor.
      </section>
      <section className="display-center" style={{ fontWeight: 'bold' }}>
        Si la extracción de características es correcta seleccione que es lo que
        quiere guardar.
      </section>
      <section className="display-center">
        <FormGroup>
          <FormControlLabel
            disabled
            control={<Checkbox defaultChecked />}
            label="Ventanas"
          />
          {/* <FormControlLabel control={<Checkbox />} label="Selecciones por señal" /> */}
          <FormControlLabel
            onChange={handleChange}
            control={<Checkbox />}
            label="Características"
          />
        </FormGroup>
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen}>Guardar</Button>
      </section>
    </div>
  );
};

export default CaracterizarParte2;
