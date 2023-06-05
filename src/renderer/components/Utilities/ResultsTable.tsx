/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
import { useTable, useSortBy } from 'react-table';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TableSortLabel from '@mui/material/TableSortLabel';
import React, { useState } from 'react';

interface Cols {
  nombre?: string;
  // EMG's
  colMediaABSEMG1?: string;
  colMedianaEMG1?: string;
  colRMSEMG1?: string;

  colMediaABSEMG2?: string;
  colMedianaEMG2?: string;
  colRMSEMG2?: string;

  colMediaABSEMG3?: string;
  colMedianaEMG3?: string;
  colRMSEMG3?: string;

  colMediaABSEMG4?: string;
  colMedianaEMG4?: string;
  colRMSEMG4?: string;
  // TEMP
  colMediaABSAcelerometro?: string;
  colMedianaAcelerometro?: string;
  colRMSAcelerometro?: string;
  // GSR
  colMediaABSGiroscopio?: string;
  colMedianaGiroscopio?: string;
  colRMSGiroscopio?: string;
  // SPO2
  colMediaABSFrecuencia?: string;
  colMedianaFrecuencia?: string;
  colRMSFrecuencia?: string;

  // Clase
  etiqueta?: string;
}

interface ResultsProps {
  options: any;
  dataInitial: any;
  columns: any;
}

const initialHidden = (cols: any) => {
  const helperArray: string[] = [];
  cols.map((column: any) => {
    if (column.show === false) {
      column.columns.map((col: any) => helperArray.push(col.accessor));
    }
  });
  return helperArray;
};
const ResultsTable = (props: ResultsProps) => {
  const { dataInitial, columns } = props;
  const [currentLabel, setCurrentLabel] = useState('Expandir');

  function prepareShortData() {
    if (currentLabel === 'Expandir') {
      const shortData: { nombre: any; etiqueta: any }[] = [];
      const tablaHash = new Map();
      dataInitial.map((registro: any) => {
        if (tablaHash.has(registro.nombre)) {
          const prev = tablaHash.get(registro.nombre);
          tablaHash.set(registro.nombre, [...prev, registro]);
        } else {
          tablaHash.set(registro.nombre, [registro]);
        }
      });
      const tablaHashEtiquetas = new Map();
      tablaHash.forEach((value, key) => {
        value.map((registro: any) => {
          if (tablaHashEtiquetas.has(registro.etiqueta)) {
            const prev = tablaHashEtiquetas.get(registro.etiqueta);
            tablaHashEtiquetas.set(registro.etiqueta, prev + 1);
          } else {
            tablaHashEtiquetas.set(registro.etiqueta, 1);
          }
        });
        let maxKey;
        let maxValue = -Infinity;

        for (const [key, value] of tablaHashEtiquetas) {
          if (value > maxValue) {
            maxKey = key;
            maxValue = value;
          }
        }
        shortData.push({ nombre: key, etiqueta: maxKey });
        tablaHashEtiquetas.clear();
      });
      const preparedData = shortData;
      return preparedData;
    }
    return dataInitial;
  }

  const dataParsed = prepareShortData();
  const data = React.useMemo(
    (): Cols[] => [...dataParsed],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLabel]
  );
  // const data: Cols[] = dataParsed;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: initialHidden(columns),
        // hiddenColumns: columns.map((column: any) => {
        //     if (column.show === false) return column.accessor;
        // }),
        // hiddenColumns: ["nombre"]
      },
    },
    useSortBy
  );

  const setStatus = () => {
    if (visibleColumns.length === 2) {
      allColumns.map((column) => {
        column.toggleHidden(false);
      });
      setCurrentLabel('Retraer');
    } else {
      allColumns.map((column) => {
        if (column.id !== 'nombre' && column.id !== 'etiqueta') {
          column.toggleHidden(true);
        }
      });
      setCurrentLabel('Expandir');
    }
  };
  const sortedColumn = (column: any) => {
    return (
      <TableSortLabel
        active={column.isSorted}
        // react-table has a unsorted state which is not treated here
        direction={column.isSortedDesc ? 'desc' : 'asc'}
      />
    );
    // if (column.isSortedDesc ?? false) {
    //   return <span className="icon-arrow-long-up" />;
    // }
    // return <span className="icon-arrow-long-down" />;
  };

  return (
    <div>
      <div>
        <div>
          {/* <Button sx={styleButtonBiggerGreen} style={{ marginTop: '10px', fontSize: '20px', width: "100px" }} onClick={setStatus}>
                  {currentLabel}
              </Button> */}
          <FormControlLabel
            control={<Switch />}
            onChange={setStatus}
            label={currentLabel}
          />
        </div>
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
                    style={{ textAlign: 'center' }}
                  >
                    {column.render('Header')}
                    <span>{column.isSorted ? sortedColumn(column) : null}</span>
                    {/* {column.id !== 'selection' ? (
                        <TableSortLabel
                          active={column.isSorted}
                          // react-table has a unsorted state which is not treated here
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        />
                      ) : null} */}
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
    </div>
  );
};

export default ResultsTable;
