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
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';

interface ComenzarAnalisisEntrenamientoProps {
  options: TableOptions<{ col1: string }>;
}

const ComenzarAnalisisEntrenamiento = (
  props: ComenzarAnalisisEntrenamientoProps
) => {
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

  return (
    <div>
      <div className="display-center">
        <h1>Análisis</h1>
      </div>
      <div
        id="comenzarAnalisisEntrenamiento"
        style={{
          marginLeft: '26%',
          width: '850px',
          paddingLeft: '40px',
          borderRadius: '5px',
          paddingBottom: '35px',
        }}
      >
        <div style={{ display: 'flex', marginTop: '50px' }}>
          <h3>Nombre: </h3>{' '}
          <h3
            style={{
              marginLeft: '350px',
              border: '1px solid black',
              width: '300px',
              paddingLeft: '5px',
              borderRadius: '5px',
            }}
          >
            Analisis T
          </h3>
        </div>
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <h3>Descripción: </h3>{' '}
          <textarea
            style={{
              marginLeft: '300px',
              width: '300px',
              maxHeight: '100px',
              minHeight: '100px',
            }}
            disabled
          />
        </div>
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <h3>Protocolo Adquisición: </h3>{' '}
          <h3
            style={{
              marginLeft: '178px',
              border: '1px solid black',
              width: '300px',
              paddingLeft: '5px',
              borderRadius: '5px',
            }}
          >
            Protocolo T
          </h3>
        </div>
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <h3>Modelo: </h3>{' '}
          <h3
            style={{
              marginLeft: '357px',
              border: '1px solid black',
              width: '300px',
              paddingLeft: '5px',
              borderRadius: '5px',
            }}
          >
            Modelo T
          </h3>
        </div>
      </div>
      <div className="display-center">
        <h4 style={{ fontWeight: '600' }}>Parametros de Selección: </h4>
      </div>
      <br />
      <div style={{ marginLeft: '28%', display: 'flex' }}>
        <h4>Sexo: </h4>
        <select style={{ marginLeft: '1%' }}>
          <option>Hombre</option>
          <option>Mujer</option>
        </select>
        <h4 style={{ marginLeft: '30%' }}>Edad: </h4>
        <select style={{ marginLeft: '1%' }}>
          <option>10 a 15</option>
          <option>15 a 20</option>
          <option>20 a 25</option>
          <option>25 a 30</option>
          <option>30 a 35</option>
          <option>35 a 40</option>
          <option>40 a 45</option>
          <option>45 a 50</option>
          <option>Más de 50</option>
        </select>
        <h5 style={{ marginTop: '5px', marginLeft: '5px' }}>años</h5>
      </div>
      <br />
      <div className='display-center'>
        <h3>Pacientes:</h3>
      </div>
      <div
        style={{
          width: '90%',
          overflow: 'auto',
          maxHeight: '60vh',
          marginLeft: '80px',
        }}
      >
        <table {...getTableProps()} className="tableCustom" id="table">
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
        <h5 style={{ fontWeight: '600', marginLeft: '5px' }}>5</h5>
      </div>
      <div
        className="display-center"
        style={{ marginTop: '5px', marginBottom: '30px' }}
      >
        <Button sx={styleButtonBiggerGreen} style={{ fontSize: '30px' }}>
          Comenzar
        </Button>
      </div>
    </div>
  );
};

export default ComenzarAnalisisEntrenamiento;
