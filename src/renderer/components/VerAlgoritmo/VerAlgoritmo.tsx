/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import './VerAlgoritmo.css';
import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import { styleButtonBiggerGreen, styleButtonBiggerRed } from '../VerPaciente/ButtonStyle';

interface VerModeloProps {
  nombre: string;
  options: TableOptions<{ col1: string }>;
}

const VerAlgoritmo = (
  props: VerModeloProps
) => {
  const { nombre, options } = props;
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
    <section className="display-center">
      <h1>Algoritmo</h1>
    </section>
    <div className='display-center'>
    <form className="analisis-form" action="">
      <section className="display-flex">
        <h4>Nombre:</h4>
        <input className="first-input" type="text" value={nombre} disabled />
      </section>
      <section className="display-flex">
        <h4>Descripción:</h4>
        <textarea className="second-input" disabled/>
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
    </form>
    </div>
    <section className='display-center'>
      <Button sx={styleButtonBiggerRed} style={{marginTop: '10px', fontSize: '20px'}} >Regresar</Button>
    </section>
    
  </div>
  );
};

export default VerAlgoritmo;
