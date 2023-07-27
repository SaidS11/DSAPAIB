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
  useGlobalFilter,
  HeaderGroup,
} from 'react-table';
import MaUTable from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// import Button from "@material-ui/core/Button";
import '../../../../assets/Iconos/style.css';
import './Table.css';
import GlobalFilter from '../ComenzarAnalisisEntrenamiento/GlobalFilter';

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
  data: any;
  columns: any;
}
const TableStyles = (theme: any) => ({
  head1: {
    zIndex: 3,
    position: 'sticky',
    top: '0px',
  },
  rotatedContent1: {
    transform: 'rotate(270deg)',
  },
});
const Pacientes = (props: PacientesContentProps) => {
  const {
    filterInput,
    setFilterInput,
    options,
    onClickRow,
    onClickNavigate,
    data,
    columns,
  } = props;
  // const classes = useClasses(TableStyles);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable({ data, columns }, useGlobalFilter, useSortBy);
  // const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value || '';
  //   setFilter('col1', value);
  //   setFilterInput(value);
  // };
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
        <section style={{ marginLeft: "3%" }}>
          <span
            className="icon-user-plus"
            onClick={onClickNavigate}
            onKeyDown={onClickNavigate}
            role="presentation"
            style={{ cursor: 'pointer', color: 'green' }}
          />
        </section>
      </div>
      <div style={{ display: 'flex' }}>
        <h3>Busqueda:</h3>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <br />
      <div
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '70vh',
        }}
      >
        <TableContainer>
          <MaUTable stickyHeader aria-label="sticky table" {...getTableProps()}>
            <TableHead className="head1">
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...(column.id === 'selection'
                        ? column.getHeaderProps()
                        : column.getHeaderProps(column.getSortByToggleProps()))}
                      className="shortHeader"
                      style={{
                        fontWeight: 'bold',
                        position: 'sticky',
                        top: '0px',
                      }}
                    >
                      {column.render('Header')}
                      {column.id !== 'selection' ? (
                        <TableSortLabel
                          active={column.isSorted}
                          // react-table has a unsorted state which is not treated here
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        />
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => onClickRow(row)}
                    className={
                      row.index % 2 === 0
                        ? 'tableElementOdd'
                        : 'tableElementEven'
                    }
                  >
                    {/* onClick={() => onClickRow(row)} */}
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </MaUTable>
        </TableContainer>
      </div>
    </div>
  );
};

export default Pacientes;
