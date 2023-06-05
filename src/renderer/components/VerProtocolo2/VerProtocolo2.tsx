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
import Select from '@mui/material/Select';
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';

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

  return (
    <div>
      <div className="display-center">
        <h1>Protocolo</h1>
      </div>
      <div className='display-center'>
        <form className="analisis-form" action="" style={{ width: "70%" }}>
          <section className="display-flex">
            <h3>Nombre: </h3>
            <input className="first-input" type="text"  name="nombrePrediccion" value={resp[0].nombre} required disabled />
          </section>
          <section className="display-flex">
            <h3>Descripción: </h3>
            <textarea className="second-input" name="descripcion" value={resp[0].descripcion === null ? "..." : resp[0].descripcion} required disabled />
          </section>
          <section className="display-flexAgregar" style = {{ marginRight: "20%" }}>
            <h3>Configuracion: </h3>
            <section  className="list-box-sexo">
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Configuración</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="config"
                label="Configuración"
              >
                <MenuItem key={resp[0].configuracion} value={`${resp[0].configuracion}`}>{resp[0].configuracion}</MenuItem>
              </Select>
            </FormControl>
            </section>
          </section>
        <br />
      <div className='display-center'>
          <h2>Registros asociados al protocolo:</h2>
      </div>
      <div
        style={{
          width: '90%',
          overflow: 'auto',
          maxHeight: '60vh',
          marginLeft: '55px',
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
      <div className="display-center" style={{ marginTop: '10px' }}>
        <h5>Total: </h5>{' '}
        <h5 style={{ fontWeight: '600', marginLeft: '5px' }}>{largo}</h5>
      </div>
      <div
        className="display-center"
        style={{ marginTop: '5px', marginBottom: '30px' }}
      >
        <Button sx={styleButtonBiggerGreen} style={{ fontSize: '30px' }} onClick={onClickIrRegresar}>
          Regresar
        </Button>
      </div>
      </form>
      </div>
    </div>
  );
};

export default VerProtocolo2;
