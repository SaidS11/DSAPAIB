/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { Routes, Route } from 'react-router-dom';
// import Navegacion from "../Navegacion/Navegacion";
import React from 'react';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
// import Button from "@material-ui/core/Button";
import '../../../../assets/Iconos/style.css';
import './Table.css';

interface PacientesContentProps {
  filterInput: string;
  setFilterInput: (arg0: string) => void;
  options: TableOptions<{
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }>;
  onClickRow: (arg0: any) => void;
  onClickNavigate: () => void;
}

const Pacientes = (props: PacientesContentProps) => {
  const { filterInput, setFilterInput, options, onClickRow, onClickNavigate } =
    props;

  // const classes = useClasses(TableStyles);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(options, useFilters, useSortBy);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setFilter('col1', value);
    setFilterInput(value);
  };
  const sortedColumn = (
    column: HeaderGroup<{
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    }>
  ) => {
    if (column.isSortedDesc) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <section>
          <h2> Seleccione un paciente de la lista o agregue uno</h2>
        </section>
        <section style={{ marginLeft: 'auto' }}>
          <span
            className="icon-user-plus"
            onClick={onClickNavigate}
            onKeyDown={onClickNavigate}
            role="presentation"
            style={{ cursor: 'pointer' }}
          />
        </section>
      </div>
      <div style={{ display: 'flex' }}>
        <h3 style={{ paddingRight: '10px' }}>Busqueda:</h3>
        <input
          type="text"
          placeholder="Nombres, Nombres"
          className="input"
          value={filterInput}
          onChange={handleFilterChange}
        />
      </div>
      <div
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '70vh',
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
                  onClick={() => onClickRow(row)}
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
    </div>
  );
};

export default Pacientes;
