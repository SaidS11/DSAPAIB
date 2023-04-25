/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  useTable,
  Column,
  TableOptions,
  useSortBy,
  useFilters,
  useGlobalFilter,
  HeaderGroup,
} from 'react-table';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Algoritmo } from '../Utilities/Constants';

interface GeneralTableProps {
  headers: Array<string>;
  datos: Algoritmo;
}

const GeneralTable = (props: GeneralTableProps) => {
  const { headers, datos } = props;

  const columns: Array<
    Column<{
      col1: string;
      col2: string;
      col3: string;
      col4: string;
    }>
  > = React.useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'col1',
      },
      {
        Header: 'Tipo',
        accessor: 'col2',
      },
      {
        Header: 'Descripción',
        accessor: 'col3',
      },
      {
        Header: 'Parametros',
        accessor: 'col4',
      },
    ],
    []
  );
  interface Cols {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
  }

  const parametrosString = Object.entries(datos.parametros)
    .map(([propiedad, valor]) => `${propiedad}: ${valor}`)
    .join(', ');
  const data: Cols[] = [
    {
      col1: datos.nombre,
      col2: datos.algoritmo_ia,
      col3: datos.descripcion,
      col4: parametrosString,
    },
  ];
  //   setData(mappedJSON);
  const options: TableOptions<{
    col1: string;
    col2: string;
    col3: string;
    col4: string;
  }> = {
    data,
    columns,
  };

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
  } = useTable({ data, columns }, useSortBy);
  return (
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
                    className="shortHeader"
                    style={{
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: '0px',
                    }}
                  >
                    {column.render('Header')}
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
                  className={
                    row.index % 2 === 0 ? 'tableElementOdd' : 'tableElementEven'
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
  );
};

export default GeneralTable;
