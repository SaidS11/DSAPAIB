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
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';

interface PrediccionProps {
  options: TableOptions<{ col1: string }>;
}

const Prediccion = (
  props: PrediccionProps
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
        <h1>Análisis Predicción</h1>
      </div>
      <div className='display-center'>
        <form className="analisis-form" action="">
          <section className="display-flex">
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
          </section>
          <section className="display-flex">
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
          </section>
          <section className="display-flex">
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
          </section>
          <section className="display-flex">
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
          </section>
        
      <div className='display-center'>
          <h2>Pacientes:</h2>
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
      </form>
      </div>
    </div>
  );
};

export default Prediccion;
